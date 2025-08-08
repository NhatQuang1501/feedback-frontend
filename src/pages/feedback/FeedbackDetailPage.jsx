import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Container } from "@mui/material";
import FeedbackDetail from "@/components/feedback/FeedbackDetail";
import FeedbackComments from "@/components/feedback/FeedbackComments";
import FeedbackReplyForm from "@/components/feedback/FeedbackReplyForm";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { getFeedbackWithDetails, mockComments } from "@/metadata/QuangMockData";

const FeedbackDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmDialogConfig, setConfirmDialogConfig] = useState({
    title: "",
    content: "",
    confirmText: "",
    type: "warning",
    action: null,
  });

  // Giả lập phân quyền - trong thực tế sẽ lấy từ context auth
  const userRole = "admin"; // hoặc "user"
  const isAdmin = userRole === "admin";

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        // API call
        const data = getFeedbackWithDetails(id);

        if (data) {
          setFeedback(data);
          // API call
          setComments(mockComments);
        } else {
          console.error("Không tìm thấy phản hồi với ID:", id);
        }
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFeedback();
    }
  }, [id]);

  const handleReplyOpen = () => {
    setReplyDialogOpen(true);
  };

  const handleReplyClose = () => {
    setReplyDialogOpen(false);
  };

  const handleReplySubmit = async ({ feedbackId, content }) => {
    try {
      console.log("Submitting reply:", { feedbackId, content });

      // API call
      // Mock comment
      const newComment = {
        id: `comment-${Date.now()}`,
        content,
        created_at: new Date().toISOString(),
        user: {
          full_name: "Admin User",
          role: "admin",
        },
      };

      setComments((prev) => [...prev, newComment]);
      return Promise.resolve();
    } catch (error) {
      console.error("Error submitting reply:", error);
      return Promise.reject(error);
    }
  };

  const handleStatusChange = (newStatus) => {
    let title, content, confirmText, type;

    switch (newStatus) {
      case "processing":
        title = "Xác nhận chuyển trạng thái";
        content = "Bạn có chắc chắn muốn chuyển phản hồi này sang trạng thái đang xử lý?";
        confirmText = "Chuyển trạng thái";
        type = "info";
        break;
      case "resolved":
        title = "Xác nhận đánh dấu đã giải quyết";
        content = "Bạn có chắc chắn muốn đánh dấu phản hồi này là đã giải quyết?";
        confirmText = "Đánh dấu đã giải quyết";
        type = "success";
        break;
      case "closed":
        title = "Xác nhận đóng phản hồi";
        content = "Bạn có chắc chắn muốn đóng phản hồi này?";
        confirmText = "Đóng phản hồi";
        type = "warning";
        break;
      default:
        return;
    }

    setConfirmDialogConfig({
      title,
      content,
      confirmText,
      type,
      action: () => updateFeedbackStatus(newStatus),
    });
    setConfirmDialogOpen(true);
  };

  const handleDeleteFeedback = () => {
    setConfirmDialogConfig({
      title: "Xác nhận xóa phản hồi",
      content: "Bạn có chắc chắn muốn xóa phản hồi này? Hành động này không thể hoàn tác.",
      confirmText: "Xóa phản hồi",
      type: "delete",
      action: deleteFeedback,
    });
    setConfirmDialogOpen(true);
  };

  const updateFeedbackStatus = async (newStatus) => {
    try {
      console.log(`Updating feedback ${id} status to ${newStatus}`);
      // API call would go here

      // Update local state
      setFeedback((prev) => ({
        ...prev,
        status: { name: newStatus },
      }));

      // Success message would go here
    } catch (error) {
      console.error("Error updating feedback status:", error);
      // Error message would go here
    }
  };

  const deleteFeedback = async () => {
    try {
      console.log(`Deleting feedback ${id}`);
      // API call would go here

      // Redirect to feedback list
      navigate("/feedback");
    } catch (error) {
      console.error("Error deleting feedback:", error);
      // Error message would go here
    }
  };

  const handleConfirmAction = () => {
    if (confirmDialogConfig.action) {
      confirmDialogConfig.action();
    }
    setConfirmDialogOpen(false);
  };

  return (
    <Container maxWidth="lg" className="py-8">
      {/* Main content */}
      <Box className="space-y-8">
        {/* Feedback detail */}
        <FeedbackDetail
          feedback={feedback}
          loading={loading}
          onReply={isAdmin ? handleReplyOpen : null}
          onStatusChange={isAdmin ? handleStatusChange : null}
          onDelete={isAdmin ? handleDeleteFeedback : null}
          isAdmin={isAdmin}
        />

        {/* Comments section */}
        <Box className="mt-8">
          <FeedbackComments comments={comments} loading={loading} />
        </Box>
      </Box>

      {/* Reply dialog */}
      {feedback && isAdmin && (
        <FeedbackReplyForm
          open={replyDialogOpen}
          onClose={handleReplyClose}
          onSubmit={handleReplySubmit}
          feedbackId={feedback.feedback_id}
        />
      )}

      {/* Confirm dialog */}
      <ConfirmDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={handleConfirmAction}
        title={confirmDialogConfig.title}
        content={confirmDialogConfig.content}
        confirmText={confirmDialogConfig.confirmText}
        cancelText="Hủy bỏ"
        type={confirmDialogConfig.type}
      />
    </Container>
  );
};

export default FeedbackDetailPage;
