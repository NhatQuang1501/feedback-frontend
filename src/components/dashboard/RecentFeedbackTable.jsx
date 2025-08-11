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
  Box,
} from "@mui/material";
import { TypeBadge, PriorityBadge, StatusBadge } from "@/utils/customBadge";

const RecentFeedbackTable = ({ feedbacks = [] }) => {
  return (
    <Paper elevation={2} className="overflow-hidden rounded-lg bg-white px-6" sx={{ width: 1490 }}>
      <Box className="border-b border-gray-200 bg-white p-3">
        <Typography className="mb-2 text-center text-base font-bold text-gray-900">
          Top 10 Phản Hồi Gần Đây
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
                <TableCell width="5%" className="px-4 py-3 font-semibold text-gray-900">
                  {/* Cột ba chấm */}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedbacks.map((feedback, index) => (
                <TableRow
                  key={feedback.feedback_id}
                  className="border-b border-gray-200 transition-colors hover:bg-amber-50"
                >
                  {/* Cột Tiêu đề với mũi tên */}
                  <TableCell className="px-4 py-3">
                    <Typography
                      variant="body2"
                      className="max-w-xs truncate font-medium text-gray-900"
                    >
                      {feedback.title}
                    </Typography>
                  </TableCell>

                  {/* Cột Người gửi */}
                  <TableCell className="px-4 py-3">
                    <Typography variant="body2" className="font-medium text-gray-900">
                      {feedback.user?.full_name || "Không xác định"}
                    </Typography>
                    <Typography variant="caption" className="text-gray-500">
                      {feedback.user?.email || "N/A"}
                    </Typography>
                  </TableCell>

                  {/* Cột Ngày gửi */}
                  <TableCell className="px-4 py-3">
                    <Typography variant="body2" className="text-gray-900">
                      {new Date(feedback.submitted_at).toLocaleString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </Typography>
                  </TableCell>

                  {/* Cột Loại */}
                  <TableCell className="px-4 py-3">
                    <TypeBadge
                      type={
                        feedback.type?.name === "Bug"
                          ? "report"
                          : feedback.type?.name === "Feature Request"
                            ? "feedback"
                            : "other"
                      }
                    />
                  </TableCell>

                  {/* Cột Ưu tiên */}
                  <TableCell className="px-4 py-3">
                    <PriorityBadge
                      priority={
                        feedback.priority?.name === "Urgent" || feedback.priority?.name === "High"
                          ? "high"
                          : feedback.priority?.name === "Medium"
                            ? "medium"
                            : "low"
                      }
                    />
                  </TableCell>

                  {/* Cột Trạng thái */}
                  <TableCell className="px-3 py-3">
                    <StatusBadge
                      status={
                        feedback.status?.name === "New"
                          ? "pending"
                          : feedback.status?.name === "In Progress"
                            ? "processing"
                            : feedback.status?.name === "Resolved"
                              ? "resolved"
                              : feedback.status?.name === "Closed"
                                ? "closed"
                                : "pending"
                      }
                    />
                  </TableCell>

                  {/* Cột ba chấm */}
                  <TableCell className="px-4 py-3">
                    <Typography variant="body2" className="cursor-pointer text-xl text-gray-600">
                      ⋮
                    </Typography>
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
