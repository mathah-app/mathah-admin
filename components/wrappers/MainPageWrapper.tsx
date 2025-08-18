import Head from "next/head";
import React from "react";
import Footer from "../partials/Footer";
import { MainPageWrapperType } from "@/utils/types";
import TopNav from "../partials/TopNav";
import SideBar from "../partials/SideBar";
import { Container } from "react-bootstrap";

export default function MainPageWrapper({ children, title }: MainPageWrapperType) {
  return (
    <>
      <Head>
        <meta name="description" content="" />
      </Head>
      <>
        <div className="container-scroller">
          <SideBar />
          <div className="container-fluid page-body-wrapper">
            <TopNav />
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
    </>
  );
}
