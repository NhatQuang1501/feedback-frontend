import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import {
  InsertDriveFile as FileIcon,
  Image as ImageIcon,
  PictureAsPdf as PdfIcon,
  Description as DocIcon,
  Download as DownloadIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";

const FileAttachmentList = ({ attachments }) => {
  const getFileIcon = (fileType) => {
    if (fileType.includes("image")) {
      return <ImageIcon className="text-blue-600" />;
    } else if (fileType.includes("pdf")) {
      return <PdfIcon className="text-red-600" />;
    } else if (fileType.includes("word") || fileType.includes("document")) {
      return <DocIcon className="text-blue-800" />;
    } else {
      return <FileIcon className="text-gray-600" />;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleDownload = (attachment) => {
    // Tạo link tải file từ base64 (nếu có)
    if (attachment.content) {
      const link = document.createElement("a");
      link.href = attachment.content;
      link.download = attachment.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.log("Không có dữ liệu file để tải");
    }
  };

  const handleView = (attachment) => {
    // Mở file trong tab mới (nếu có thể xem được)
    if (attachment.content) {
      window.open(attachment.content, "_blank");
    } else {
      console.log("Không có dữ liệu file để xem");
    }
  };

  if (!attachments || attachments.length === 0) {
    return (
      <Typography variant="body2" className="text-gray-500">
        Không có tệp đính kèm
      </Typography>
    );
  }

  return (
    <Box className="space-y-3">
      {attachments.map((attachment, index) => (
        <Box
          key={`${attachment.name}-${index}`}
          className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 shadow-sm"
        >
          <Box className="flex items-center gap-3">
            <Box className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
              {getFileIcon(attachment.type)}
            </Box>
            <Box>
              <Typography variant="body2" className="font-medium text-gray-900">
                {attachment.name}
              </Typography>
              <Typography variant="caption" className="text-gray-500">
                {formatFileSize(attachment.size)}
              </Typography>
            </Box>
          </Box>

          <Box className="flex items-center gap-1">
            <Tooltip title="Xem trước">
              <IconButton
                size="small"
                className="text-blue-600"
                onClick={() => handleView(attachment)}
              >
                <ViewIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Tải xuống">
              <IconButton
                size="small"
                className="text-green-600"
                onClick={() => handleDownload(attachment)}
              >
                <DownloadIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

FileAttachmentList.propTypes = {
  attachments: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      content: PropTypes.string, // base64 content
    }),
  ),
};

export default FileAttachmentList;
