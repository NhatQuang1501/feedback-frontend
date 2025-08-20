import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography } from "@mui/material";

const StatCard = ({ title, value, icon, color, subtitle }) => (
  <Card className="h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="h6" className="mb-2 font-semibold text-gray-700">
            {title}
          </Typography>
          <Typography variant="h3" className={`font-bold ${color}`}>
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="body2" className="mt-1 text-gray-500">
              {subtitle}
            </Typography>
          )}
        </div>
        <div className={`rounded-full p-3 ${color.replace("text-", "bg-").replace("600", "100")}`}>
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  icon: PropTypes.node,
  color: PropTypes.string,
  subtitle: PropTypes.string,
};

StatCard.defaultProps = {
  icon: null,
  color: "text-gray-600",
  subtitle: "",
};

export default StatCard;
