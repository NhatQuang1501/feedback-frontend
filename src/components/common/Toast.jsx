import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

export const ToastContext = React.createContext({
  showToast: () => {},
});

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ open: false, message: "", type: "info" });

  const showToast = (message, type = "success", duration = 3000) => {
    setToast({ open: true, message, type });

    if (duration !== 0) {
      setTimeout(() => {
        setToast((prev) => ({ ...prev, open: false }));
      }, duration);
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.open && (
        <Toast {...toast} onClose={() => setToast((prev) => ({ ...prev, open: false }))} />
      )}
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

const Toast = ({ message, type = "success", onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);

    return () => setIsVisible(false);
  }, []);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircleIcon className="text-white" />;
      case "error":
        return <ErrorIcon className="text-white" />;
      case "warning":
        return <WarningIcon className="text-white" />;
      case "info":
        return <InfoIcon className="text-white" />;
      default:
        return null;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-green-600";
      case "error":
        return "bg-red-600";
      case "warning":
        return "bg-amber-500";
      case "info":
        return "bg-blue-600";
      default:
        return "bg-gray-700";
    }
  };

  return (
    <div
      className={`fixed right-6 bottom-6 z-50 mb-4 flex transform items-center rounded-lg p-4 shadow-md transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      } ${getBackgroundColor()}`}
      role="alert"
    >
      <div className="mr-2 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center">
        {getIcon()}
      </div>
      <div className="max-w-xs text-sm font-normal text-white">{message}</div>
      <button
        onClick={onClose}
        className="-mr-1 ml-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent p-1.5 text-white hover:bg-white/20"
      >
        <CloseIcon fontSize="small" className="text-white" />
      </button>
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "warning", "info"]),
  onClose: PropTypes.func.isRequired,
};

export default Toast;
