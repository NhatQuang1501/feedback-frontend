import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import AdminHeader from "@/components/layout/AdminHeader";
// import Footer from "@/components/layout/Footer";

const AdminLayout = () => {
  return (
    <div className="from-primary-light/30 to-primary/20 flex min-h-screen flex-col bg-gradient-to-br">
      <AdminHeader />
      <main className="flex-grow py-6 sm:py-8 lg:py-10">
        <Container maxWidth="xl" className="relative z-10 mx-auto px-2 sm:px-3 lg:px-4">
          <Outlet />
        </Container>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default AdminLayout;
