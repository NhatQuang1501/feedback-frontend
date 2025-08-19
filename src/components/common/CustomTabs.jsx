import React from "react";
import PropTypes from "prop-types";
import { Box, Tabs, Tab, useTheme } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`custom-tabpanel-${index}`}
      aria-labelledby={`custom-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    "id": `custom-tab-${index}`,
    "aria-controls": `custom-tabpanel-${index}`,
  };
}

const CustomTabs = ({
  tabs,
  value,
  onChange,
  variant = "fullWidth",
  orientation = "horizontal",
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={onChange}
          variant={variant}
          orientation={orientation}
          aria-label="custom tabs"
          sx={{
            "& .MuiTab-root": {
              "textTransform": "none",
              "fontSize": { xs: "0.875rem", sm: "1rem" },
              "fontWeight": 500,
              "minHeight": { xs: 48, sm: 56 },
              "padding": { xs: "8px 12px", sm: "12px 16px" },
              "color": "#6b7280",
              "&:hover": {
                backgroundColor: "rgba(255, 236, 153, 0.04)",
                color: "#374151",
              },
              "&.Mui-selected": {
                fontWeight: 600,
                color: "#374151",
              },
            },
            "& .MuiTabs-indicator": {
              height: 3,
              borderRadius: "3px 3px 0 0",
              backgroundColor: theme.palette.primary.main,
            },
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              icon={tab.icon}
              iconPosition={tab.iconPosition || "start"}
              disabled={tab.disabled}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  );
};

CustomTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
      icon: PropTypes.node,
      iconPosition: PropTypes.oneOf(["start", "end", "top", "bottom"]),
      disabled: PropTypes.bool,
    }),
  ).isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["standard", "scrollable", "fullWidth"]),
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
};

export default CustomTabs;
