"use client";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Footer from "../partials/Footer";
import TopNav from "../partials/TopNav";
import SideBar from "../partials/SideBar";
import { useAuth } from "@/context/AuthContext";
import { MainPageWrapperType } from "@/utils/types";

export default function MainPageWrapper({ children, title }: MainPageWrapperType) {
  const { user } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (user === null) {
      router.replace("/auth/login"); 
    } else {
      setLoading(false);
    }
  }, [user, router]);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p>Loading...</p>
      </div>
    ); // optional loading screen while auth state is being checked
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="" />
      </Head>

      <div className={`container-scroller ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <SideBar isOpen={isSidebarOpen} onClose={closeSidebar} />

        {/* Backdrop for mobile: click to close */}
        {isSidebarOpen && (
          <button
            aria-label="Close sidebar"
            className="sidebar-backdrop d-lg-none"
            onClick={closeSidebar}
          />
        )}

        <div className="container-fluid page-body-wrapper">
          <TopNav toggleSidebar={toggleSidebar} />
          <div className="main-panel">
            <div className="content-wrapper">
              <h2 className="h3">{title}</h2>
              {children}
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

