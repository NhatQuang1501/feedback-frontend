import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import { Send as SendIcon, CheckCircle as CheckCircleIcon } from "@mui/icons-material";
import CustomTabs from "@/components/common/CustomTabs";
import FeedbackList from "@/components/feedback/FeedbackList";
import { getAllFeedbacksWithDetails } from "@/metadata/QuangMockData";

const UserFeedbackPage = () => {
  // State
  const [tabValue, setTabValue] = useState(0);
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const [sentFeedbacks, setSentFeedbacks] = useState([]);
  const [resolvedFeedbacks, setResolvedFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Giả lập API call
        const data = getAllFeedbacksWithDetails();

        // Lọc feedback theo trạng thái
        const sent = data.filter(
          (item) => item.status?.name !== "resolved" && item.status?.name !== "closed",
        );
        const resolved = data.filter(
          (item) => item.status?.name === "resolved" || item.status?.name === "closed",
        );

        setAllFeedbacks(data);
        setSentFeedbacks(sent);
        setResolvedFeedbacks(resolved);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Tab content
  const tabs = [
    {
      label: "Phản hồi đã gửi",
      icon: <SendIcon />,
      content: (
        <FeedbackList
          feedbacks={sentFeedbacks}
          loading={loading}
          emptyMessage="Bạn chưa gửi phản hồi nào"
        />
      ),
    },
    {
      label: "Phản hồi đã giải quyết",
      icon: <CheckCircleIcon />,
      content: (
        <FeedbackList
          feedbacks={resolvedFeedbacks}
          loading={loading}
          emptyMessage="Chưa có phản hồi nào được giải quyết"
        />
      ),
    },
  ];

  return (
    <Container maxWidth="lg" className="py-8">
      {/* Page Header */}
      <Box className="mb-8 text-center">
        <Typography variant="h4" className="mb-2 font-bold text-gray-900">
          Quản Lý Phản Hồi Của Tôi
        </Typography>
        <Typography variant="body1" className="text-gray-600">
          Theo dõi và quản lý tất cả các phản hồi bạn đã gửi
        </Typography>
      </Box>

      {/* Main Content */}
      <Paper className="overflow-hidden rounded-xl shadow-md">
        <CustomTabs tabs={tabs} value={tabValue} onChange={handleTabChange} />
      </Paper>
    </Container>
  );
};

export default UserFeedbackPage;
