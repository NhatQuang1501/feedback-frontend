import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Button as MuiButton,
  Tooltip,
} from "@mui/material";
import { Visibility as VisibilityIcon } from "@mui/icons-material";
import PropTypes from "prop-types";
import { TypeBadge, PriorityBadge, StatusBadge } from "@/components/common/CustomBadge";
import { Link } from "react-router-dom";
import { getTypeInfo, getPriorityInfo, getStatusInfo } from "@/utils/constants";

const FeedbackList = ({
  feedbacks,
  loading,
  emptyMessage = "Không có phản hồi nào",
  detailUrlPrefix = "/admin/feedbacks/",
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const dateFormat = new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);

    const timeFormat = new Intl.DateTimeFormat("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);

    return (
      <div className="flex flex-col">
        <span className="font-medium">{dateFormat}</span>
        <span className="text-sm text-gray-500">{timeFormat}</span>
      </div>
    );
  };

  // Loading skeletons
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Typography variant="h6" className="font-bold text-gray-900">
            Danh sách phản hồi
          </Typography>
        </div>
        <TableContainer className="rounded-lg border border-gray-200">
          <Table>
            <TableHead className="bg-amber-100">
              <TableRow>
                <TableCell width="25%" className="px-4 py-3 font-semibold text-gray-900">
                  Tiêu đề
                </TableCell>
                <TableCell width="20%" className="px-4 py-3 font-semibold text-gray-900">
                  Người gửi
                </TableCell>
                <TableCell width="15%" className="px-4 py-3 font-semibold text-gray-900">
                  Ngày gửi
                </TableCell>
                <TableCell width="15%" className="px-4 py-3 font-semibold text-gray-900">
                  Loại
                </TableCell>
                <TableCell width="10%" className="px-4 py-3 font-semibold text-gray-900">
                  Ưu tiên
                </TableCell>
                <TableCell width="10%" className="px-4 py-3 font-semibold text-gray-900">
                  Trạng thái
                </TableCell>
                <TableCell width="5%" className="px-4 py-3 font-semibold text-gray-900"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(5)].map((_, index) => (
                <TableRow key={index} className="border-b border-gray-200">
                  <TableCell className="px-4 py-3">
                    <Typography variant="body2" className="text-gray-500">
                      Đang tải...
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }

  if (!loading && (!feedbacks || !Array.isArray(feedbacks) || feedbacks.length === 0)) {
    return (
      <Paper className="p-8 text-center">
        <Typography variant="body1" className="text-gray-600">
          {emptyMessage}
        </Typography>
      </Paper>
    );
  }

  const feedbackArray = Array.isArray(feedbacks) ? feedbacks : [];

  return (
    <div className="space-y-4">
      <TableContainer className="rounded-lg border border-gray-200">
        <Table>
          <TableHead className="bg-amber-100">
            <TableRow>
              <TableCell width="25%" className="px-4 py-3 font-semibold text-gray-900">
                Tiêu đề
              </TableCell>
              <TableCell width="20%" className="px-4 py-3 font-semibold text-gray-900">
                Người gửi
              </TableCell>
              <TableCell width="15%" className="px-4 py-3 font-semibold text-gray-900">
                Ngày gửi
              </TableCell>
              <TableCell width="15%" className="px-4 py-3 font-semibold text-gray-900">
                Loại
              </TableCell>
              <TableCell width="10%" className="px-4 py-3 font-semibold text-gray-900">
                Ưu tiên
              </TableCell>
              <TableCell width="10%" className="px-4 py-3 font-semibold text-gray-900">
                Trạng thái
              </TableCell>
              <TableCell width="5%" className="px-4 py-3 font-semibold text-gray-900"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbackArray.map((feedback) => (
              <TableRow
                key={feedback.feedback_id}
                className="border-b border-gray-200 transition-colors hover:bg-amber-50"
              >
                <TableCell className="px-4 py-3">
                  <Tooltip title={feedback.title} placement="top-start" arrow>
                    <Typography
                      variant="body2"
                      className="max-w-xs truncate font-medium text-gray-900"
                    >
                      {feedback.title}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Typography variant="body2" className="font-medium text-gray-900">
                    {feedback.user_full_name}
                  </Typography>
                  <Typography variant="caption" className="text-gray-500">
                    {feedback.user_email}
                  </Typography>
                </TableCell>
                <TableCell className="px-4 py-3">{formatDate(feedback.created_at)}</TableCell>
                <TableCell className="px-4 py-3">
                  <TypeBadge type={getTypeInfo(feedback.type_display).value} />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <PriorityBadge priority={getPriorityInfo(feedback.priority_display).value} />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <StatusBadge status={getStatusInfo(feedback.status_display).value} />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <MuiButton
                    size="small"
                    variant="text"
                    startIcon={<VisibilityIcon />}
                    component={Link}
                    to={`${detailUrlPrefix}${feedback.feedback_id}`}
                    className="min-w-0 p-1 hover:bg-transparent"
                    sx={{
                      "&:hover": {
                        "backgroundColor": "transparent",
                        "& .MuiSvgIcon-root": {
                          color: "#1976d2",
                          transition: "color 0.3s ease",
                        },
                      },
                    }}
                  ></MuiButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

FeedbackList.propTypes = {
  feedbacks: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  detailUrlPrefix: PropTypes.string,
};

export default FeedbackList;
