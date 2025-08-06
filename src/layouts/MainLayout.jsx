import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const MainLayout = () => {
  return (
    <div className="from-primary-light via-background-default to-secondary-light/10 flex min-h-screen flex-col bg-gradient-to-br">
      <Header />
      <main className="flex-grow py-6 sm:py-8 lg:py-10">
        <Container maxWidth="lg" className="relative z-10 mx-auto px-2 sm:px-3 lg:px-4">
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
