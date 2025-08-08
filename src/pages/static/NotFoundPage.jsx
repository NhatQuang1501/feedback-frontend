import React from "react";
import { Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Container
      maxWidth="md"
      className="flex min-h-[70vh] flex-col items-center justify-center text-center"
    >
      <Typography variant="h1" className="mb-4 text-gray-800">
        404
      </Typography>
      <Typography variant="h4" className="mb-6 text-gray-600">
        Trang không tồn tại
      </Typography>
      <Typography variant="body1" className="mb-8 text-gray-500">
        Trang bạn đang tìm kiếm không tồn tại.
      </Typography>
      <Button component={Link} variant="contained" color="primary" size="large">
        Quay về trang chủ
      </Button>
    </Container>
  );
};

export default NotFoundPage;
