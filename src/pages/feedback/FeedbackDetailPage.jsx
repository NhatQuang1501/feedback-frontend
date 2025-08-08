import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Container, Breadcrumbs, Link } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FeedbackIcon from "@mui/icons-material/Feedback";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FeedbackDetail from "@/components/feedback/FeedbackDetail";
import FeedbackComments from "@/components/feedback/FeedbackComments";
import FeedbackReplyForm from "@/components/feedback/FeedbackReplyForm";
import { getFeedbackWithDetails, mockComments } from "@/metadata/QuangMockData";

const FeedbackDetailPage = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);

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

  return (
    <Container maxWidth="lg" className="py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        className="mb-6"
      >
        <Link
          color="inherit"
          href="/"
          className="flex items-center text-gray-600 hover:text-amber-600"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Trang chủ
        </Link>
        <Link
          color="inherit"
          href="/admin/feedback"
          className="flex items-center text-gray-600 hover:text-amber-600"
        >
          <FeedbackIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Quản lý phản hồi
        </Link>
        <Typography color="text.primary" className="font-medium">
          Chi tiết phản hồi
        </Typography>
      </Breadcrumbs>

      {/* Main content */}
      <Box className="space-y-8">
        {/* Feedback detail */}
        <FeedbackDetail feedback={feedback} loading={loading} onReply={handleReplyOpen} />

        {/* Comments section */}
        <Box className="mt-8">
          <FeedbackComments comments={comments} loading={loading} />
        </Box>
      </Box>

      {/* Reply dialog */}
      {feedback && (
        <FeedbackReplyForm
          open={replyDialogOpen}
          onClose={handleReplyClose}
          onSubmit={handleReplySubmit}
          feedbackId={feedback.feedback_id}
        />
      )}
    </Container>
  );
};

export default FeedbackDetailPage;
