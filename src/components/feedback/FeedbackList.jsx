import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Collapse,
  Box,
  Skeleton,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Delete as DeleteIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import { TypeBadge, PriorityBadge, StatusBadge } from "@/utils/customBadge";
import { useNavigate } from "react-router-dom";

const FeedbackList = ({ feedbacks, loading, emptyMessage = "Không có phản hồi nào" }) => {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleExpandClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleMenuOpen = (event, feedback) => {
    setAnchorEl(event.currentTarget);
    setSelectedFeedback(feedback);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = () => {
    console.log("Đã xóa feedback:", selectedFeedback?.feedback_id);
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleStatusChange = (newStatus) => {
    console.log("Đã thay đổi trạng thái:", selectedFeedback?.feedback_id, "thành", newStatus);
    handleMenuClose();
  };

  const handleViewDetail = (feedbackId) => {
    navigate(`/feedbacks/${feedbackId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Loading skeletons
  if (loading) {
    return (
      <div className="space-y-4">
        <Typography variant="h6" className="font-bold text-gray-900">
          Danh sách phản hồi
        </Typography>
        <TableContainer className="rounded-lg border border-gray-200">
          <Table>
            <TableHead className="bg-amber-100">
              <TableRow>
                <TableCell width="5%" className="px-4 py-3 font-semibold text-gray-900"></TableCell>
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
                    <Skeleton variant="circular" width={24} height={24} />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Skeleton variant="text" width="90%" />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Skeleton variant="text" width="80%" />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Skeleton variant="text" width="70%" />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Skeleton variant="rounded" width={60} height={24} />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Skeleton variant="rounded" width={60} height={24} />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Skeleton variant="rounded" width={80} height={24} />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Skeleton variant="circular" width={24} height={24} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }

  // No feedbacks found
  if (!loading && (!feedbacks || feedbacks.length === 0)) {
    return (
      <Paper className="p-8 text-center">
        <Typography variant="body1" className="text-gray-600">
          {emptyMessage}
        </Typography>
      </Paper>
    );
  }

  return (
    <div className="space-y-4">
      <Typography variant="h6" className="font-bold text-gray-900">
        Danh sách phản hồi
      </Typography>
      <TableContainer className="rounded-lg border border-gray-200">
        <Table>
          <TableHead className="bg-amber-100">
            <TableRow>
              <TableCell width="5%" className="px-4 py-3 font-semibold text-gray-900"></TableCell>
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
            {feedbacks.map((feedback) => (
              <React.Fragment key={feedback.feedback_id}>
                <TableRow
                  className={`border-b border-gray-200 transition-colors hover:bg-amber-50 ${
                    expandedId === feedback.feedback_id ? "bg-amber-50" : ""
                  }`}
                >
                  <TableCell className="px-4 py-3">
                    <IconButton
                      size="small"
                      onClick={() => handleExpandClick(feedback.feedback_id)}
                      className="text-gray-600 hover:text-amber-700"
                    >
                      {expandedId === feedback.feedback_id ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </IconButton>
                  </TableCell>
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
                      {feedback.user?.full_name}
                    </Typography>
                    <Typography variant="caption" className="text-gray-500">
                      {feedback.user?.email}
                    </Typography>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Typography variant="body2" className="text-gray-900">
                      {formatDate(feedback.submitted_at)}
                    </Typography>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <TypeBadge type={feedback.type?.name} />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <PriorityBadge priority={feedback.priority?.name} />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <StatusBadge status={feedback.status?.name} />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, feedback)}
                      className="text-gray-600 hover:text-amber-700"
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ padding: 0 }} colSpan={8}>
                    <Collapse in={expandedId === feedback.feedback_id} timeout="auto" unmountOnExit>
                      <Box className="border-t border-gray-200 bg-amber-50 p-4">
                        <Typography
                          variant="subtitle2"
                          className="mb-2 font-semibold text-gray-900"
                        >
                          Nội dung phản hồi:
                        </Typography>
                        <Typography
                          variant="body2"
                          className="mb-4 whitespace-pre-line text-gray-800"
                        >
                          {feedback.content}
                        </Typography>
                        <div className="flex justify-end gap-2">
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<VisibilityIcon />}
                            className="border-amber-600 text-amber-600 hover:border-amber-700 hover:bg-amber-100 hover:text-amber-700"
                            onClick={() => handleViewDetail(feedback.feedback_id)}
                          >
                            Xem chi tiết
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            startIcon={<EditIcon />}
                            className="bg-amber-600 text-white hover:bg-amber-700"
                          >
                            Phản hồi
                          </Button>
                        </div>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          className: "rounded-lg shadow-lg border border-gray-200",
        }}
      >
        <MenuItem
          onClick={() => {
            handleViewDetail(selectedFeedback?.feedback_id);
            handleMenuClose();
          }}
          className="text-gray-900 hover:bg-amber-50"
        >
          <ListItemIcon>
            <VisibilityIcon fontSize="small" className="text-gray-600" />
          </ListItemIcon>
          <ListItemText>Xem chi tiết</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose} className="text-gray-900 hover:bg-amber-50">
          <ListItemIcon>
            <EditIcon fontSize="small" className="text-gray-600" />
          </ListItemIcon>
          <ListItemText>Phản hồi</ListItemText>
        </MenuItem>
        {selectedFeedback?.status?.name !== "processing" && (
          <MenuItem
            onClick={() => handleStatusChange("processing")}
            className="text-gray-900 hover:bg-amber-50"
          >
            <ListItemIcon>
              <ArrowForwardIcon fontSize="small" className="text-blue-600" />
            </ListItemIcon>
            <ListItemText>Đánh dấu đang xử lý</ListItemText>
          </MenuItem>
        )}
        {selectedFeedback?.status?.name !== "resolved" && (
          <MenuItem
            onClick={() => handleStatusChange("resolved")}
            className="text-gray-900 hover:bg-amber-50"
          >
            <ListItemIcon>
              <CheckCircleIcon fontSize="small" className="text-green-600" />
            </ListItemIcon>
            <ListItemText>Đánh dấu đã giải quyết</ListItemText>
          </MenuItem>
        )}
        {selectedFeedback?.status?.name !== "closed" && (
          <MenuItem
            onClick={() => handleStatusChange("closed")}
            className="text-gray-900 hover:bg-amber-50"
          >
            <ListItemIcon>
              <CancelIcon fontSize="small" className="text-gray-600" />
            </ListItemIcon>
            <ListItemText>Đánh dấu đã đóng</ListItemText>
          </MenuItem>
        )}
        <MenuItem onClick={handleDeleteClick} className="text-red-600 hover:bg-red-50">
          <ListItemIcon>
            <DeleteIcon fontSize="small" className="text-red-600" />
          </ListItemIcon>
          <ListItemText>Xóa phản hồi</ListItemText>
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        PaperProps={{
          className: "rounded-lg",
        }}
      >
        <DialogTitle className="font-bold text-gray-900">Xác nhận xóa phản hồi</DialogTitle>
        <DialogContent>
          <DialogContentText className="text-gray-700">
            Bạn có chắc chắn muốn xóa phản hồi này? Hành động này không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={handleDeleteCancel} className="text-gray-600 hover:bg-gray-100">
            Hủy bỏ
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            className="bg-red-600 text-white hover:bg-red-700"
            variant="contained"
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

FeedbackList.propTypes = {
  feedbacks: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
};

export default FeedbackList;
