import React from "react";
import { Container, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <footer className="via-primary-light/5 border-primary-main/10 mt-auto border-t bg-gradient-to-r from-gray-50 to-gray-50 py-8">
      <Container maxWidth="lg" className="mx-auto px-4">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          {/* Logo và Copyright */}
          <div className="flex flex-col items-center space-y-2 md:items-start">
            <Typography variant="h6" className="text-primary-main text-lg font-bold tracking-wide">
              FeedbackHub
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              © {new Date().getFullYear()} FeedbackHub. Tất cả quyền được bảo lưu.
            </Typography>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center space-y-3 md:items-end">
            <div className="flex flex-wrap justify-center gap-6 md:justify-end">
              <Link
                href="#"
                className="hover:text-primary-dark text-gray-700 transition-colors duration-200 hover:no-underline"
                underline="hover"
              >
                Điều khoản sử dụng
              </Link>
              <Link
                href="#"
                className="hover:text-primary-dark text-gray-700 transition-colors duration-200 hover:no-underline"
                underline="hover"
              >
                Chính sách bảo mật
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
