import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

import Footer from "@/components/partials/Footer";
import MainPageWrapper from "@/components/wrappers/MainPageWrapper";
import { Card, CardBody, Col, Container, Row } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import HomeDrivers from "@/components/partials/tables/HomeDrivers";
import HomeRiders from "@/components/partials/tables/HomeRiders";
import LiveTrips from "@/components/partials/tables/LiveTrips";
import MyInput from "@/components/MyInput";
import Stats from "@/components/partials/Stats";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (

    <MainPageWrapper title="Mathah Dashboard">
      <div className={` ${geistSans.variable} ${geistMono.variable}`}>
        <main>
          <Row className="row">
            <Col sm={12} className="col-12 grid-margin stretch-card">
              <Card className="card corona-gradient-card">
                <CardBody className="card-body py-0 px-0 px-sm-3">
                  <Row className="row align-items-center">
                    <Col sm={3} xl={2} className="col-4 col-sm-3 col-xl-2">
                      <Image
                        src="/assets/images/dashboard/Group126@2x.png"
                        className="gradient-corona-img img-fluid"
                        alt=""
                        width={200}
                        height={300}
                        priority
                      />
                    </Col>
                    <Col sm={7} xl={8} className="col-5 col-sm-7 col-xl-8 p-0">
                      <h4 className="mb-1 mb-sm-0">Add Team Members?</h4>
                      <p className="mb-0 font-weight-normal d-none d-sm-block">
                        Make admin tasks simple by adding collaborators
                      </p>
                    </Col>
                    <Col
                      sm={2}
                      xl={2}
                      className="col-3 col-sm-2 col-xl-2 pl-0 text-center"
                    >
                      <span>
                        <a
                          href="#"
                          target=""
                          className="btn btn-outline-light btn-rounded get-started-btn"
                        >
                          Add
                        </a>
                      </span>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
            <Stats />
          <LiveTrips />
          <div className="row ">
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <div className="card-hearder-with-btn d-flex flex-row justify-content-between w-100 align-items-center">
                    <h4 className="card-title">Recent Drivers</h4>
                    <a href="./drivers.php">
                      <button type="button" className="btn btn-link btn-fw">
                        View All
                      </button>
                    </a>
                  </div>
                  <HomeDrivers />
                </div>
              </div>
            </div>
          </div>
          
        </main>
      </div>
    </MainPageWrapper>
  );
}
