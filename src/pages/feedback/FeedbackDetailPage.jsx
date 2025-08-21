import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Box } from "@mui/material";
import FeedbackDetail from "@/components/feedback/FeedbackDetail";
import { feedbackApi } from "@/api/feedbackApi";
import { useToast } from "@/components/common/Toast";

const FeedbackDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role?.name === "admin";

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const data = await feedbackApi.getFeedbackDetail(id);
      setFeedback(data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      showToast("Không thể tải thông tin phản hồi", "error");
      navigate("/not-found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchFeedback();
    }
  }, [id, navigate]);

  const handleStatusChange = async (newStatus) => {
    if (newStatus === "processing") {
      showToast("Đã chuyển trạng thái sang Đang xử lý", "success");
    } else if (newStatus === "resolved") {
      showToast("Đã chuyển trạng thái sang Đã xử lý", "success");
    }
  };

  return (
    <Container maxWidth="lg" className="py-8">
      <Box className="space-y-8">
        <FeedbackDetail
          feedback={feedback}
          loading={loading}
          isAdmin={isAdmin}
          onStatusChange={handleStatusChange}
        />
      </Box>
    </Container>
  );
};

export default FeedbackDetailPage;
