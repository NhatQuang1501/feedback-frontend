import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Typography, Box, Chip, InputAdornment, Collapse, IconButton, Paper } from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Clear as ClearIcon,
  Sort as SortIcon,
} from "@mui/icons-material";
import {
  FEEDBACK_TYPES,
  PRIORITY_LEVELS,
  FEEDBACK_STATUS,
  SORT_OPTIONS,
  getTypeInfo,
  getPriorityInfo,
  getStatusInfo,
} from "@/utils/constants";
import { useDebounce } from "@/hooks/useDebounce";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import TextField from "@/components/common/TextField";
import CheckboxGroup from "@/components/common/CheckboxGroup";
import CustomSelect from "@/components/common/CustomSelect";
import Button from "@/components/common/Button";

const FeedbackFilters = ({ filters, onFilterChange, sortBy, onSortChange, totalResults }) => {
  const [advancedFilters, setAdvancedFilters] = useState({
    type: Array.isArray(filters.type) ? filters.type : [],
    priority: Array.isArray(filters.priority) ? filters.priority : [],
    status: Array.isArray(filters.status) ? filters.status : [],
    sort: sortBy || "newest",
  });

  // State for search input with immediate update in UI
  const [searchInput, setSearchInput] = useState(filters.q || "");

  // Debounce search input to prevent too many API calls
  const debouncedSearchTerm = useDebounce(searchInput, 500);

  // State for showing/hiding advanced filters
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Effect to update search filter when debounced term changes
  useEffect(() => {
    if (debouncedSearchTerm !== filters.q) {
      onFilterChange("q", debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onFilterChange, filters.q]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Handle checkbox filter change
  const handleCheckboxChange = (field, value) => {
    setAdvancedFilters((prev) => {
      const currentValues = [...prev[field]];
      const index = currentValues.indexOf(value);

      if (index === -1) {
        // Add the value if not present
        return { ...prev, [field]: [...currentValues, value] };
      } else {
        // Remove the value if already present
        currentValues.splice(index, 1);
        return { ...prev, [field]: currentValues };
      }
    });
  };

  // Apply advanced filters
  const applyAdvancedFilters = () => {
    onFilterChange("type", advancedFilters.type);
    onFilterChange("priority", advancedFilters.priority);
    onFilterChange("status", advancedFilters.status);
  };

  // Clear search
  const clearSearch = () => {
    setSearchInput("");
    onFilterChange("q", "");
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchInput("");
    setAdvancedFilters({
      type: [],
      priority: [],
      status: [],
      sort: "newest",
    });
    onFilterChange("q", "");
    onFilterChange("type", []);
    onFilterChange("priority", []);
    onFilterChange("status", []);
    onSortChange("newest");
  };

  // Count active filters
  const activeFiltersCount =
    (filters.type && filters.type.length ? 1 : 0) +
    (filters.priority && filters.priority.length ? 1 : 0) +
    (filters.status && filters.status.length ? 1 : 0) +
    (filters.q ? 1 : 0);

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FilterIcon className="text-gray-600" />
          <Typography className="text text-2xl font-semibold text-gray-900">
            Bộ lọc và tìm kiếm
          </Typography>
        </div>
        <div>
          <Typography variant="body2" className="text-gray-600">
            Tìm thấy <span className="font-semibold text-gray-900">{totalResults}</span> kết quả
          </Typography>
          {activeFiltersCount > 0 && (
            <Button
              variant="text"
              size="small"
              startIcon={<ClearIcon />}
              onClick={clearAllFilters}
              className="ml-2 text-blue-600 hover:text-blue-800"
            >
              Xóa bộ lọc
            </Button>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <TextField
        fullWidth
        placeholder="Tìm kiếm theo tiêu đề, nội dung, người gửi..."
        value={searchInput}
        onChange={handleSearchChange}
        className="w-full rounded-lg [&_.MuiOutlinedInput-root]:h-12 [&_.MuiOutlinedInput-root]:text-base"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className="text-gray-500" />
            </InputAdornment>
          ),
          endAdornment: searchInput && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={clearSearch} edge="end">
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Advanced Filters Toggle and Sort */}
      <div className="flex items-center justify-between">
        <Button
          variant="outlined"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          startIcon={<FilterAltIcon />}
          endIcon={showAdvancedFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          className="border-2 border-gray-300 bg-white text-gray-700 hover:border-amber-500 hover:bg-amber-50 hover:text-amber-600"
          size="medium"
        >
          Bộ lọc nâng cao
        </Button>

        {/* Sort options - đã chuyển xuống ngang hàng với bộ lọc nâng cao, căn phải */}
        <div className="flex items-center gap-2">
          <SortIcon className="text-gray-500" />
          <CustomSelect
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            options={SORT_OPTIONS}
            label="Sắp xếp"
            size="small"
            className="min-w-[180px]"
          />
        </div>
      </div>

      {/* Advanced Filters */}
      <Collapse in={showAdvancedFilters} timeout="auto">
        <Paper elevation={0} className="border border-gray-200 p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Type Filter */}
            <CheckboxGroup
              title="Loại phản hồi"
              options={FEEDBACK_TYPES}
              selectedValues={advancedFilters.type}
              onChange={handleCheckboxChange}
              field="type"
              color="blue"
            />

            {/* Priority Filter */}
            <CheckboxGroup
              title="Mức độ ưu tiên"
              options={PRIORITY_LEVELS}
              selectedValues={advancedFilters.priority}
              onChange={handleCheckboxChange}
              field="priority"
              color="yellow"
            />

            {/* Status Filter */}
            <CheckboxGroup
              title="Trạng thái"
              options={FEEDBACK_STATUS}
              selectedValues={advancedFilters.status}
              onChange={handleCheckboxChange}
              field="status"
              color="purple"
            />
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <Button
              variant="outlined"
              size="large"
              onClick={clearAllFilters}
              className="min-w-[120px]"
            >
              Đặt lại
            </Button>
            <Button
              variant="primary"
              size="large"
              onClick={applyAdvancedFilters}
              className="min-w-[150px]"
            >
              Áp dụng bộ lọc
            </Button>
          </div>
        </Paper>
      </Collapse>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <Box className="flex flex-wrap gap-2 border-t border-gray-200 pt-4">
          <Typography variant="body2" className="mr-2 text-gray-600">
            Bộ lọc đang áp dụng:
          </Typography>
          {filters.q && (
            <Chip
              label={`Tìm kiếm: "${filters.q}"`}
              size="small"
              onDelete={clearSearch}
              className="bg-blue-50 text-blue-800"
            />
          )}

          {filters.type &&
            filters.type.length > 0 &&
            filters.type.map((typeValue) => {
              const typeInfo = getTypeInfo(typeValue);
              return (
                <Chip
                  key={`type-${typeValue}`}
                  label={`Loại: ${typeInfo.label}`}
                  size="small"
                  onDelete={() => {
                    const updatedTypes = advancedFilters.type.filter((t) => t !== typeValue);
                    setAdvancedFilters({ ...advancedFilters, type: updatedTypes });
                    onFilterChange("type", updatedTypes);
                  }}
                  className="bg-green-50 text-green-800"
                />
              );
            })}

          {filters.priority &&
            filters.priority.length > 0 &&
            filters.priority.map((priorityValue) => {
              const priorityInfo = getPriorityInfo(priorityValue);
              return (
                <Chip
                  key={`priority-${priorityValue}`}
                  label={`Ưu tiên: ${priorityInfo.label}`}
                  size="small"
                  onDelete={() => {
                    const updatedPriorities = advancedFilters.priority.filter(
                      (p) => p !== priorityValue,
                    );
                    setAdvancedFilters({ ...advancedFilters, priority: updatedPriorities });
                    onFilterChange("priority", updatedPriorities);
                  }}
                  className="bg-yellow-50 text-yellow-800"
                />
              );
            })}

          {filters.status &&
            filters.status.length > 0 &&
            filters.status.map((statusValue) => {
              const statusInfo = getStatusInfo(statusValue);
              return (
                <Chip
                  key={`status-${statusValue}`}
                  label={`Trạng thái: ${statusInfo.label}`}
                  size="small"
                  onDelete={() => {
                    const updatedStatuses = advancedFilters.status.filter((s) => s !== statusValue);
                    setAdvancedFilters({ ...advancedFilters, status: updatedStatuses });
                    onFilterChange("status", updatedStatuses);
                  }}
                  className="bg-purple-50 text-purple-800"
                />
              );
            })}

          {sortBy && sortBy !== "newest" && (
            <Chip
              label={`Sắp xếp: ${SORT_OPTIONS.find((opt) => opt.value === sortBy)?.label || sortBy}`}
              size="small"
              onDelete={() => {
                setAdvancedFilters({ ...advancedFilters, sort: "newest" });
                onSortChange("newest");
              }}
              className="bg-indigo-50 text-indigo-800"
            />
          )}
        </Box>
      )}
    </div>
  );
};

FeedbackFilters.propTypes = {
  filters: PropTypes.shape({
    q: PropTypes.string,
    type: PropTypes.array,
    priority: PropTypes.array,
    status: PropTypes.array,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  totalResults: PropTypes.number.isRequired,
};

export default FeedbackFilters;
