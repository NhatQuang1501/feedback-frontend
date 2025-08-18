import React, { useState, useEffect } from "react";

const GoogleAuthProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (window.google && window.google.accounts) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log("Google Identity Services loaded successfully");
      setIsLoaded(true);
    };

    script.onerror = () => {
      console.error("Failed to load Google Identity Services");
      setError("Failed to load Google Identity Services");
    };

    const timeout = setTimeout(() => {
      if (!window.google) {
        console.warn("Google Identity Services loading timeout");
        setError("Google Identity Services loading timeout");
      }
    }, 10000);

    document.head.appendChild(script);

    return () => {
      clearTimeout(timeout);
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);


  if (!isLoaded && !error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-primary mb-4 h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
          <p className="text-gray-600">Đang tải Google Identity Services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    console.warn(
      "Google Identity Services failed to load, but app will continue without Google OAuth",
    );
  }

  return <>{children}</>;
};

export default GoogleAuthProvider;
