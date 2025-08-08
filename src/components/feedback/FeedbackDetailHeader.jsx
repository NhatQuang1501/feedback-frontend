import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, Grid } from "@mui/material";
import { AccessTime as AccessTimeIcon } from "@mui/icons-material";
import { TypeBadge, PriorityBadge, StatusBadge } from "@/utils/customBadge";
import { formatDate } from "@/utils/formatters";

const FeedbackDetailHeader = ({ feedback }) => {
  return (
    <Box className="flex-1">
      <Typography variant="h5" className="mb-3 text-xl font-bold text-gray-900">
        {feedback.title}
      </Typography>
      <Grid container spacing={2} columns={{ xs: 1, sm: 2 }}>
        <Grid item xs={1}>
          <Box className="flex items-center gap-2">
            <Typography variant="subtitle2" className="font-medium text-gray-700">
              Loại phản hồi:
            </Typography>
            <TypeBadge type={feedback.type?.name} />
          </Box>
        </Grid>
        <Grid item xs={1}>
          <Box className="flex items-center gap-2">
            <Typography variant="subtitle2" className="font-medium text-gray-700">
              Mức độ ưu tiên:
            </Typography>
            <PriorityBadge priority={feedback.priority?.name} />
          </Box>
        </Grid>
        <Grid item xs={1}>
          <Box className="flex items-center gap-2">
            <Typography variant="subtitle2" className="font-medium text-gray-700">
              Trạng thái:
            </Typography>
            <StatusBadge status={feedback.status?.name} />
          </Box>
        </Grid>
        <Grid item xs={1}>
          <Box className="flex items-center gap-1 text-gray-600">
            <AccessTimeIcon fontSize="small" />
            <Typography variant="body2">
              Thời gian gửi: {formatDate(feedback.submitted_at)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

FeedbackDetailHeader.propTypes = {
  feedback: PropTypes.shape({
    title: PropTypes.string.isRequired,
    submitted_at: PropTypes.string.isRequired,
    type: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    priority: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    status: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default FeedbackDetailHeader;
