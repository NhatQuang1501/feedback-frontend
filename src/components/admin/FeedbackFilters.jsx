import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  Box,
  Chip,
  InputAdornment,
  Button,
  Collapse,
  IconButton,
  Paper,
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import { FEEDBACK_TYPES, PRIORITY_LEVELS, FEEDBACK_STATUS, SORT_OPTIONS } from "@/utils/constants";
import { useDebounce } from "@/hooks/useDebounce";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import TextField from "@/components/common/TextField";
import CheckboxGroup from "@/components/common/CheckboxGroup";
import CustomSelect from "@/components/common/CustomSelect";

const FeedbackFilters = ({ filters, onFilterChange, sortBy, onSortChange, totalResults }) => {
  // Local state for advanced filters
  const [advancedFilters, setAdvancedFilters] = useState({
    type: filters.type ? filters.type.split(",") : [],
    priority: filters.priority ? filters.priority.split(",") : [],
    status: filters.status ? filters.status.split(",") : [],
    sort: sortBy || "submitted_at_desc",
  });

  // State for search input with immediate update in UI
  const [searchInput, setSearchInput] = useState(filters.search || "");

  // Debounce search input to prevent too many API calls
  const debouncedSearchTerm = useDebounce(searchInput, 500);

  // State for showing/hiding advanced filters
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Effect to update search filter when debounced term changes
  useEffect(() => {
    onFilterChange({
      ...filters,
      search: debouncedSearchTerm,
    });
  }, [debouncedSearchTerm]);

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

  // Handle sort option change
  const handleSortChange = (value) => {
    setAdvancedFilters((prev) => ({
      ...prev,
      sort: value,
    }));
    onSortChange(value);
  };

  // Apply advanced filters
  const applyAdvancedFilters = () => {
    onFilterChange({
      ...filters,
      type: advancedFilters.type.length > 0 ? advancedFilters.type.join(",") : "all",
      priority: advancedFilters.priority.length > 0 ? advancedFilters.priority.join(",") : "all",
      status: advancedFilters.status.length > 0 ? advancedFilters.status.join(",") : "all",
    });
  };

  // Clear search
  const clearSearch = () => {
    setSearchInput("");
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchInput("");
    setAdvancedFilters({
      type: [],
      priority: [],
      status: [],
      sort: "submitted_at_desc",
    });
    onFilterChange({
      search: "",
      type: "all",
      priority: "all",
      status: "all",
    });
    onSortChange("submitted_at_desc");
  };

  // Count active filters
  const activeFiltersCount =
    Object.entries(filters).filter(
      ([key, value]) => value && value !== "all" && value !== "" && key !== "search",
    ).length + (filters.search ? 1 : 0);

  // Get filter labels for display
  const getTypeLabels = (values) => {
    if (!values || values === "all") return [];
    const valueArray = typeof values === "string" ? values.split(",") : values;
    return valueArray
      .map((value) => {
        const type = FEEDBACK_TYPES.find((t) => t.value === value);
        return type ? type.label : "";
      })
      .filter(Boolean);
  };

  const getPriorityLabels = (values) => {
    if (!values || values === "all") return [];
    const valueArray = typeof values === "string" ? values.split(",") : values;
    return valueArray
      .map((value) => {
        const priority = PRIORITY_LEVELS.find((p) => p.value === value);
        return priority ? priority.label : "";
      })
      .filter(Boolean);
  };

  const getStatusLabels = (values) => {
    if (!values || values === "all") return [];
    const valueArray = typeof values === "string" ? values.split(",") : values;
    return valueArray
      .map((value) => {
        const status = FEEDBACK_STATUS.find((s) => s.value === value);
        return status ? status.label : "";
      })
      .filter(Boolean);
  };

  const getSortLabel = (value) => {
    const option = SORT_OPTIONS.find((opt) => opt.value === value);
    return option ? option.label : "";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FilterIcon className="text-gray-600" />
          <Typography variant="h6" className="font-semibold text-gray-900">
            Bộ lọc và tìm kiếm
          </Typography>
          {activeFiltersCount > 0 && (
            <Chip
              label={`${activeFiltersCount} bộ lọc`}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
        </div>
        <div className="flex items-center gap-3">
          <Typography variant="body2" className="text-gray-600">
            Tìm thấy <span className="font-semibold text-gray-900">{totalResults}</span> kết quả
          </Typography>
          {activeFiltersCount > 0 && (
            <Button
              onClick={clearAllFilters}
              size="small"
              startIcon={<ClearIcon />}
              className="text-blue-600 hover:text-blue-800"
            >
              Xóa bộ lọc
            </Button>
          )}
        </div>
      </div>

      {/* Search Bar - Always visible */}
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

      {/* Advanced Filters Toggle */}
      <div className="flex items-center justify-between">
        <Button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          startIcon={<FilterAltIcon />}
          endIcon={showAdvancedFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          className="text-gray-700 hover:bg-gray-100"
          size="medium"
        >
          Bộ lọc nâng cao
        </Button>
      </div>

      {/* Advanced Filters */}
      <Collapse in={showAdvancedFilters} timeout="auto">
        <Paper elevation={0} className="border border-gray-200 p-4">
          <Grid container spacing={3}>
            {/* Type Filter */}
            <Grid item xs={12} md={4}>
              <CheckboxGroup
                title="Loại phản hồi"
                options={FEEDBACK_TYPES}
                selectedValues={advancedFilters.type}
                onChange={handleCheckboxChange}
                field="type"
                color="blue"
              />
            </Grid>

            {/* Priority Filter */}
            <Grid item xs={12} md={4}>
              <CheckboxGroup
                title="Mức độ ưu tiên"
                options={PRIORITY_LEVELS}
                selectedValues={advancedFilters.priority}
                onChange={handleCheckboxChange}
                field="priority"
                color="yellow"
              />
            </Grid>

            {/* Status Filter */}
            <Grid item xs={12} md={4}>
              <CheckboxGroup
                title="Trạng thái"
                options={FEEDBACK_STATUS}
                selectedValues={advancedFilters.status}
                onChange={handleCheckboxChange}
                field="status"
                color="purple"
                className="mb-4"
              />
            </Grid>

            {/* Sort Dropdown - Improved styling */}
            <Grid item xs={12} md={4}>
              <CustomSelect
                label="Sắp xếp theo"
                value={advancedFilters.sort}
                onChange={(e) => handleSortChange(e.target.value)}
                options={SORT_OPTIONS}
                placeholder="Chọn cách sắp xếp"
                size="small"
                className="w-full space-y-1 md:w-[120px]"
              />
            </Grid>
          </Grid>

          <Box className="mt-4 flex justify-end gap-3 sm:gap-6">
            <Button
              variant="outlined"
              size="large"
              onClick={clearAllFilters}
              className={`h-[48px] min-w-[120px] rounded-xl border-amber-600 bg-white text-base font-semibold text-amber-400 normal-case shadow-md transition-all duration-200 ease-in-out hover:border-amber-700 hover:bg-amber-50 hover:shadow-md active:-translate-y-0.5`}
            >
              Đặt lại
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={applyAdvancedFilters}
              className={`h-[48px] min-w-[150px] rounded-xl bg-amber-400 text-base font-semibold text-white normal-case shadow-md transition-all duration-200 ease-in-out hover:bg-amber-500 hover:shadow-md active:-translate-y-0.5`}
            >
              Áp dụng bộ lọc
            </Button>
          </Box>
        </Paper>
      </Collapse>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <Box className="flex flex-wrap gap-2 border-t border-gray-200 pt-4">
          <Typography variant="body2" className="mr-2 text-gray-600">
            Bộ lọc đang áp dụng:
          </Typography>
          {filters.search && (
            <Chip
              label={`Tìm kiếm: "${filters.search}"`}
              size="small"
              onDelete={() => {
                setSearchInput("");
                onFilterChange({ ...filters, search: "" });
              }}
              className="bg-blue-50 text-blue-800"
            />
          )}

          {filters.type !== "all" &&
            getTypeLabels(filters.type).map((label) => (
              <Chip
                key={`type-${label}`}
                label={`Loại: ${label}`}
                size="small"
                onDelete={() => {
                  const updatedTypes = advancedFilters.type.filter(
                    (t) => FEEDBACK_TYPES.find((ft) => ft.value === t)?.label !== label,
                  );
                  setAdvancedFilters({ ...advancedFilters, type: updatedTypes });
                  onFilterChange({
                    ...filters,
                    type: updatedTypes.length > 0 ? updatedTypes.join(",") : "all",
                  });
                }}
                className="bg-green-50 text-green-800"
              />
            ))}

          {filters.priority !== "all" &&
            getPriorityLabels(filters.priority).map((label) => (
              <Chip
                key={`priority-${label}`}
                label={`Ưu tiên: ${label}`}
                size="small"
                onDelete={() => {
                  const updatedPriorities = advancedFilters.priority.filter(
                    (p) => PRIORITY_LEVELS.find((pl) => pl.value === p)?.label !== label,
                  );
                  setAdvancedFilters({ ...advancedFilters, priority: updatedPriorities });
                  onFilterChange({
                    ...filters,
                    priority: updatedPriorities.length > 0 ? updatedPriorities.join(",") : "all",
                  });
                }}
                className="bg-yellow-50 text-yellow-800"
              />
            ))}

          {filters.status !== "all" &&
            getStatusLabels(filters.status).map((label) => (
              <Chip
                key={`status-${label}`}
                label={`Trạng thái: ${label}`}
                size="small"
                onDelete={() => {
                  const updatedStatuses = advancedFilters.status.filter(
                    (s) => FEEDBACK_STATUS.find((fs) => fs.value === s)?.label !== label,
                  );
                  setAdvancedFilters({ ...advancedFilters, status: updatedStatuses });
                  onFilterChange({
                    ...filters,
                    status: updatedStatuses.length > 0 ? updatedStatuses.join(",") : "all",
                  });
                }}
                className="bg-purple-50 text-purple-800"
              />
            ))}

          {sortBy && sortBy !== "submitted_at_desc" && (
            <Chip
              label={`Sắp xếp: ${getSortLabel(sortBy)}`}
              size="small"
              onDelete={() => {
                setAdvancedFilters({ ...advancedFilters, sort: "submitted_at_desc" });
                onSortChange("submitted_at_desc");
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
    search: PropTypes.string,
    type: PropTypes.string,
    priority: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  totalResults: PropTypes.number.isRequired,
};

export default FeedbackFilters;
