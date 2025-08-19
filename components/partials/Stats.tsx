import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getStats } from "@/backend/admin";

export default function Stats() {
  const [stats, setStats] = useState({
    revenue: 0,
    activeDrivers: 0,
    passengers: 0,
    successfulTrips: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getStats();
      setStats(data);
    };
    fetchStats();
  }, []);

  return (
    <Row className="row">
      <Col sm={6} xl={3} className="grid-margin stretch-card">
        <Card>
          <CardBody>
            <div className="row">
              <div className="col-9">
                <div className="d-flex align-items-center">
                  <h3 className="mb-0">R{(stats.revenue).toFixed(1)}</h3>
                  <p className="text-success ml-2 mb-0 font-weight-medium">+3.5%</p>
                </div>
              </div>
              <div className="col-3">
                <div className="icon icon-box-success">
                  <Icon icon={"mdi:arrow-top-right"} />
                </div>
              </div>
            </div>
            <h6 className="text-muted font-weight-normal">Generated Revenue</h6>
          </CardBody>
        </Card>
      </Col>

      <Col sm={6} xl={3} className="grid-margin stretch-card">
        <Card>
          <CardBody>
            <div className="row">
              <div className="col-9">
                <h3 className="mb-0">{stats.activeDrivers}</h3>
              </div>
            </div>
            <h6 className="text-muted font-weight-normal">Active Drivers</h6>
          </CardBody>
        </Card>
      </Col>

      <Col sm={6} xl={3} className="grid-margin stretch-card">
        <Card>
          <CardBody>
            <div className="row">
              <div className="col-9">
                <h3 className="mb-0">{stats.passengers}</h3>
              </div>
              <div className="col-3">
                <div className="icon icon-box-danger">
                  <Icon icon={"mdi:arrow-bottom-left"} />
                </div>
              </div>
            </div>
            <h6 className="text-muted font-weight-normal">Passengers</h6>
          </CardBody>
        </Card>
      </Col>

      <Col sm={6} xl={3} className="grid-margin stretch-card">
        <Card>
          <CardBody>
            <div className="row">
              <div className="col-9">
                <h3 className="mb-0">{stats.successfulTrips}</h3>
                <p className="text-success ml-2 mb-0 font-weight-medium">+3.5%</p>
              </div>
              <div className="col-3">
                <div className="icon icon-box-success">
                  <Icon icon={"mdi:arrow-top-right"} />
                </div>
              </div>
            </div>
            <h6 className="text-muted font-weight-normal">Successful Trips</h6>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

