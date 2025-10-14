import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button as MuiButton,
  Box,
} from "@mui/material";
import { TypeBadge, PriorityBadge, StatusBadge } from "@/components/common/CustomBadge";
import { getTypeInfo, getPriorityInfo, getStatusInfo } from "@/utils/constants";
import { Visibility as VisibilityIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

const detailUrlPrefix = "/admin/feedbacks/";

const RecentFeedbackTable = ({ feedbacks = [] }) => {
  return (
    <Paper elevation={2} className="overflow-hidden rounded-lg bg-white px-6" sx={{ width: 1490 }}>
      <Box className="border-b border-gray-200 bg-white p-3">
        <Typography className="mb-2 text-center text-base font-bold text-gray-900">
          Phản Hồi Gần Đây
        </Typography>
      </Box>

      {feedbacks.length === 0 ? (
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Typography color="text.secondary" variant="h6">
            Không có phản hồi nào
          </Typography>
        </Box>
      ) : (
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
              {feedbacks.map((feedback, index) => (
                <TableRow
                  key={feedback.feedback_id}
                  className="border-b border-gray-200 transition-colors hover:bg-amber-50"
                >
                  <TableCell className="px-4 py-3">
                    <Typography
                      variant="body2"
                      className="max-w-xs truncate font-medium text-gray-900"
                    >
                      {feedback.title}
                    </Typography>
                  </TableCell>

                  <TableCell className="px-4 py-3">
                    <Typography variant="body2" className="font-medium text-gray-900">
                      {feedback.user_full_name || "Không xác định"}
                    </Typography>
                    <Typography variant="caption" className="text-gray-500">
                      {feedback.user_email || "N/A"}
                    </Typography>
                  </TableCell>

                  <TableCell className="px-4 py-3">
                    <Typography variant="body2" className="text-gray-900">
                      {feedback.created_at
                        ? new Date(feedback.created_at).toLocaleString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                        : "N/A"}
                    </Typography>
                  </TableCell>

                  <TableCell className="px-4 py-3">
                    <TypeBadge type={getTypeInfo(feedback.type_display).value} />
                  </TableCell>

                  <TableCell className="px-4 py-3">
                    <PriorityBadge priority={getPriorityInfo(feedback.priority_display).value} />
                  </TableCell>

                  <TableCell className="px-3 py-3">
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
      )}
    </Paper>
  );
};

export default RecentFeedbackTable;
