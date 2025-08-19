import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import {
  AccountCircleOutlined as AccountIcon,
  ExitToAppOutlined as LogoutIcon,
} from "@mui/icons-material";
import { logoutUser } from "@/store/slices/authSlice";

const AdminHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const navigationItems = [
    {
      label: "Danh sách phản hồi",
      path: "/admin/feedbacks",
    },
    {
      label: "Dashboard",
      path: "/admin/dashboard",
    },
  ];

  return (
    <AppBar position="static" color="default" elevation={0} className="bg-white shadow-md">
      <Container maxWidth="lg" className="mx-auto">
        <Toolbar className="flex px-4 py-3">
          {/* Logo & Brand */}
          <Typography
            variant="h5"
            component={Link}
            to="/admin/feedbacks"
            className="text-primary hover:text-primary-dark mr-8 text-[1.5rem] font-bold tracking-wide no-underline transition-colors duration-200 sm:text-[1.75rem]"
          >
            FeedbackHub Admin
          </Typography>

          {/* Main Navigation - Now on the left */}
          <div className="hidden gap-6 sm:flex lg:gap-8">
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                variant="text"
                size="medium"
                className={`relative font-medium normal-case transition-colors duration-200 hover:bg-transparent ${
                  isActive(item.path)
                    ? "text-primary after:bg-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full"
                    : "hover:text-primary text-gray-500"
                }`}
              >
                {item.icon}
                {item.label}
              </Button>
            ))}
          </div>

          {/* Spacer to push the right items to the end */}
          <div className="flex-grow"></div>

          {/* Right side items */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Auth Separator */}
            <div className="hidden h-6 w-px bg-gray-300 sm:block"></div>

            {/* Profile Menu */}
            <div className="flex items-center">
              <IconButton size="large" edge="end" onClick={handleProfileMenuOpen}>
                <Avatar className="bg-primary text-secondary">
                  {user?.full_name ? user.full_name.charAt(0).toUpperCase() : <AccountIcon />}
                </Avatar>
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                className="mt-2"
              >
                <MenuItem onClick={handleProfileMenuClose} className="gap-3">
                  <AccountIcon className="h-5 w-5 text-gray-600" />
                  <span>Thông tin cá nhân</span>
                </MenuItem>
                <MenuItem
                  onClick={async () => {
                    try {
                      await dispatch(logoutUser()).unwrap();
                      navigate("/auth/login");
                    } catch (error) {
                      console.error("Logout failed:", error);
                    }
                    handleProfileMenuClose();
                  }}
                  className="gap-3"
                >
                  <LogoutIcon className="h-5 w-5 text-gray-600" />
                  <span>Đăng xuất</span>
                </MenuItem>
              </Menu>
            </div>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AdminHeader;
