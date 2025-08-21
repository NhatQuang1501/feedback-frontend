import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, Paper } from "@mui/material";
const FeedbackContent = ({ feedback }) => {
  return (
    <>
      <Box className="mb-6">
        <Typography variant="subtitle1" className="mb-2 font-semibold text-gray-800">
          Nội dung phản hồi
        </Typography>
        <Paper elevation={0} className="rounded-lg bg-gray-50 p-4">
          <Typography variant="body1" className="whitespace-pre-line text-gray-800">
            {feedback.content}
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

FeedbackContent.propTypes = {
  feedback: PropTypes.shape({
    content: PropTypes.string.isRequired,
    user: PropTypes.shape({
      full_name: PropTypes.string,
      email: PropTypes.string,
    }),
    attachments: PropTypes.array,
  }).isRequired,
};

export default FeedbackContent;
