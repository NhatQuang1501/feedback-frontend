import React from "react";
import PropTypes from "prop-types";
import { Paper, Typography, Tooltip, IconButton } from "@mui/material";
import { Download as DownloadIcon, InsertDriveFile as FileIcon } from "@mui/icons-material";
import { formatDate } from "@/utils/formatters";

const FileAttachmentList = ({ attachments }) => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    {attachments.map((file) => (
      <Paper
        key={file.attachment_id}
        className="flex items-center gap-4 rounded-lg border border-gray-100 p-3 shadow-sm"
        elevation={0}
      >
        <div>
          {file.file_type?.startsWith("image/") ? (
            <a href={file.file_url} target="_blank" rel="noopener noreferrer">
              <img
                src={file.file_url}
                alt={file.file_name}
                className="h-16 w-16 rounded border object-cover"
              />
            </a>
          ) : (
            <FileIcon className="text-4xl text-blue-400" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <Typography variant="body2" className="truncate font-medium text-gray-900">
            <a
              href={file.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {file.file_name}
            </a>
          </Typography>
          <Typography variant="caption" className="text-gray-500">
            {file.file_type}
          </Typography>
          <div>
            <Typography variant="caption" className="text-gray-400">
              {formatDate(file.uploaded_at)}
            </Typography>
          </div>
        </div>
        <Tooltip title="Tải xuống">
          <IconButton
            href={file.file_url}
            target="_blank"
            rel="noopener noreferrer"
            download
            size="small"
            className="text-blue-600 hover:text-blue-800"
          >
            <DownloadIcon />
          </IconButton>
        </Tooltip>
      </Paper>
    ))}
  </div>
);

FileAttachmentList.propTypes = {
  attachments: PropTypes.arrayOf(
    PropTypes.shape({
      attachment_id: PropTypes.string.isRequired,
      file_name: PropTypes.string.isRequired,
      file_url: PropTypes.string.isRequired,
      file_type: PropTypes.string,
      uploaded_at: PropTypes.string,
    }),
  ).isRequired,
};

export default FileAttachmentList;
