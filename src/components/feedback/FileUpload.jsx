import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Box, Button, Typography, Alert, Chip, Paper } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "@/utils/constants";
import { validateFileSize, validateFileType } from "@/utils/validation";

const FileUpload = ({ onFilesChange, error }) => {
  const [files, setFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const validateFile = (file) => {
    if (!validateFileType(file, ALLOWED_FILE_TYPES)) {
      return "Loại file không được hỗ trợ";
    }
    if (!validateFileSize(file, MAX_FILE_SIZE)) {
      return `File quá lớn. Kích thước tối đa là ${formatFileSize(MAX_FILE_SIZE)}`;
    }
    return null;
  };

  const handleFileChange = useCallback(
    (newFiles) => {
      const validFiles = [];
      let hasError = false;

      Array.from(newFiles).forEach((file) => {
        const error = validateFile(file);
        if (error) {
          setUploadError(error);
          hasError = true;
        } else {
          validFiles.push(file);
        }
      });

      if (!hasError) {
        setUploadError("");
        const updatedFiles = [...files, ...validFiles];
        setFiles(updatedFiles);
        onFilesChange(updatedFiles);
      }
    },
    [files, onFilesChange],
  );

  const handleFileSelect = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles.length > 0) {
      handleFileChange(selectedFiles);
    }
    event.target.value = "";
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileChange(droppedFiles);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center">
        <Button
          component="label"
          variant="contained"
          startIcon={<AttachFileIcon />}
          className="mb-4 px-6 py-2"
          size="large"
        >
          Chọn file
          <input
            id="file-upload-input"
            type="file"
            multiple
            onChange={handleFileSelect}
            accept={ALLOWED_FILE_TYPES.join(",")}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            style={{ clip: "rect(0 0 0 0)", clipPath: "inset(50%)" }}
          />
        </Button>

        <Paper
          className={`relative w-full overflow-hidden rounded-xl border-2 border-dashed p-6 text-center transition-all duration-300 ease-in-out ${
            dragOver
              ? "border-primary-dark bg-gray-100/40 shadow-md"
              : "hover:border-primary-main border-gray-200 hover:bg-gray-100/10"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          elevation={0}
        >
          <div className="relative">
            <Typography variant="body2" className="text-gray-500">
              Hỗ trợ: JPG, PNG, GIF, PDF, TXT, DOC, DOCX
            </Typography>
            <Typography variant="body2" className="text-gray-500">
              Kích thước tối đa: {formatFileSize(MAX_FILE_SIZE)}
            </Typography>
          </div>
        </Paper>
      </div>

      {/* Error Alert */}
      {(uploadError || error) && (
        <Alert severity="error" className="rounded-lg shadow-sm">
          {uploadError || error}
        </Alert>
      )}

      {/* Selected Files */}
      {files.length > 0 && (
        <Box className="rounded-lg bg-gray-50/80 p-4">
          <Typography variant="subtitle2" className="mb-3 font-medium text-gray-500">
            File đã chọn ({files.length}):
          </Typography>
          <div className="flex flex-wrap gap-2">
            {files.map((file, index) => (
              <Chip
                key={`${file.name}-${index}`}
                label={`${file.name} (${formatFileSize(file.size)})`}
                onDelete={() => handleRemoveFile(index)}
                deleteIcon={<DeleteIcon />}
                variant="outlined"
                className="bg-white py-3 shadow-sm hover:bg-gray-50"
                sx={{
                  maxWidth: { xs: "100%", sm: 250 },
                  borderRadius: "8px",
                  "& .MuiChip-label": {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  },
                }}
              />
            ))}
          </div>
        </Box>
      )}
    </div>
  );
};

FileUpload.propTypes = {
  onFilesChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default FileUpload;
