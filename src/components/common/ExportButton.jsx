import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Typography, LinearProgress, Alert } from "@mui/material";
import { FileDownload as FileDownloadIcon } from "@mui/icons-material";
import Button from "@/components/common/Button";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { feedbackApi } from "@/api/feedbackApi";
import { useToast } from "@/components/common/Toast";

const ExportButton = ({ filters = {}, disabled = false, className = "" }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState(null);
  const [exportProgress, setExportProgress] = useState(0);
  const [csvId, setCsvId] = useState(null);
  const [taskId, setTaskId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    let interval;
    if (taskId && isExporting) {
      interval = setInterval(async () => {
        try {
          const response = await feedbackApi.checkExportStatus(taskId);

          if (response.status === "completed") {
            setExportStatus("completed");
            setExportProgress(100);
            setCsvId(response.csv_id);
            setIsExporting(false);
            showToast("Xuất file CSV thành công!", "success");
          } else if (response.status === "error") {
            setExportStatus("error");
            setError(response.message || "Có lỗi xảy ra khi xuất file");
            setIsExporting(false);
            showToast("Có lỗi xảy ra khi xuất file CSV", "error");
          } else {
            setExportProgress((prev) => Math.min(prev + 10, 90));
          }
        } catch (error) {
          console.error("Error checking export status:", error);
          setExportStatus("error");
          setError("Không thể kiểm tra trạng thái xuất file");
          setIsExporting(false);
          showToast("Lỗi khi kiểm tra trạng thái xuất file", "error");
        }
      }, 2000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [taskId, isExporting, showToast]);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      setExportStatus("processing");
      setExportProgress(10);
      setError(null);
      setDialogOpen(true);

      const response = await feedbackApi.exportFeedbacks(filters);
      setTaskId(response.task_id);
      showToast("Đang xử lý yêu cầu xuất file...", "info");
    } catch (error) {
      console.error("Error starting export:", error);
      setExportStatus("error");
      setError("Không thể bắt đầu xuất file");
      setIsExporting(false);
      showToast("Không thể bắt đầu xuất file CSV", "error");
    }
  };

  const handleDownload = async () => {
    if (csvId) {
      try {
        setIsDownloading(true);
        const response = await feedbackApi.downloadCsv(csvId);
        const blob = new Blob([response.data], { type: "text/csv;charset=utf-8;" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `feedback_export_${new Date().getTime()}.csv`);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);

        showToast("Đang tải xuống file CSV...", "success");
      } catch (error) {
        console.error("Error downloading CSV:", error);
        showToast("Lỗi khi tải xuống file CSV", "error");
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const handleCloseDialog = () => {
    if (!isExporting) {
      setDialogOpen(false);
      setTimeout(() => {
        setExportStatus(null);
        setExportProgress(0);
        setCsvId(null);
        setTaskId(null);
        setError(null);
      }, 300);
    }
  };

  const getDialogContent = () => {
    return (
      <Box className="space-y-4">
        <Typography variant="body1" className="text-gray-700">
          {exportStatus === "processing"
            ? "Đang xử lý dữ liệu và tạo file CSV..."
            : exportStatus === "completed"
              ? "Xuất file thành công! Bạn có thể tải xuống file CSV."
              : exportStatus === "error"
                ? error || "Có lỗi xảy ra khi xuất file."
                : ""}
        </Typography>

        {isExporting && (
          <Box>
            <LinearProgress variant="determinate" value={exportProgress} className="rounded-full" />
            <Typography variant="caption" className="mt-1 text-gray-500">
              {exportProgress}% hoàn thành
            </Typography>
          </Box>
        )}

        {exportStatus === "error" && <Alert severity="error">{error}</Alert>}

        {exportStatus === "completed" && (
          <Alert severity="success">
            File CSV đã được tạo thành công và sẵn sàng để tải xuống.
          </Alert>
        )}
      </Box>
    );
  };

  return (
    <>
      <Button
        variant="success"
        size="medium"
        startIcon={<FileDownloadIcon />}
        onClick={handleExport}
        disabled={disabled || isExporting}
        loading={isExporting}
        className={`min-w-[140px] ${className}`}
      >
        {isExporting ? "Đang xuất..." : "Xuất CSV"}
      </Button>

      <ConfirmDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onConfirm={exportStatus === "completed" ? handleDownload : handleCloseDialog}
        title="Xuất danh sách phản hồi"
        content={getDialogContent()}
        confirmText={exportStatus === "completed" ? "Tải xuống" : "Đóng"}
        cancelText={exportStatus === "completed" ? "Đóng" : "Hủy"}
        type={
          exportStatus === "completed" ? "success" : exportStatus === "error" ? "warning" : "info"
        }
        loading={isExporting || isDownloading}
      />
    </>
  );
};

ExportButton.propTypes = {
  filters: PropTypes.object,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default ExportButton;
