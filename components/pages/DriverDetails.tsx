"use client";
import {
  getDriverDetails,
  getDriverTransactions,
  updateDriver,
} from "@/backend/admin";
import { ToLocalDate, validateAndFormatPhoneNumber } from "@/utils/formats";
import { activateDriver, suspendDriver } from "@/utils/functions";
import { driverType } from "@/utils/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";

export default function DriverDetails() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const [data, setData] = useState<driverType>();
  const [loading, setLoading] = useState(true);
  const [finances, setFinances] = useState<any>();
  const [show, setShow] = useState(false);
  const [reason, setReason] = useState<string>("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [acting, setActing] = useState(false);

  useEffect(() => {
    if (!id) return;
    const getDriverData = async () => {
      try {
        setData(await getDriverDetails(id as string));
        setFinances(await getDriverTransactions(id as string));
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };
    // Don't call if no id in URL
    getDriverData();
  }, [id]);

  return (
    <div>
      <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <div className="card-hearder-with-btn d-flex flex-row justify-content-between w-100">
              <h2 className="card-title">Driver Details</h2>
            </div>

            {loading && (
              <div className="text-align-center align-items-center">
                <Spinner size="sm" color="#be8900" /> Loading Driver Details
              </div>
            )}
            {!data && !loading && <p>No Driver Found Here</p>}
            {data && !loading && (
              <div className="align-items-center justify-content-between mb-4">
                <div className=" d-flex flex-column flex-md-row justify-content-between">
                  <h6>
                    Status: <span className="pl-2">{data.status}</span>
                  </h6>
                  <div className="d-flex">
                    {data?.status !== "active" && (
                      <button
                        type="button"
                        className="btn btn-success rounded-pill m-2"
                        style={{ color: "white" }}
                        onClick={() => {
                          // activateDriver(router, id as string, validateAndFormatPhoneNumber(data?.phone));
                          handleShow();
                        }}
                      >
                        <i className="fa fa-exclamation-triangle"></i>{" "}
                        <Icon fontSize={18} icon={"mdi:check-circle-outline"} />{" "}
                        Activate
                      </button>
                    )}
                    {data?.status !== "suspended" && (
                      <button
                        type="button"
                        className="btn btn-warning rounded-pill m-2"
                        style={{ color: "black" }}
                        disabled={acting}
                        onClick={() => {
                          handleShow();
                          // suspendDriver(
                          //   router,
                          //   id as string,
                          //   validateAndFormatPhoneNumber(data?.phone)
                          // );
                        }}
                      >
                        {acting ? (
                          <>
                            <Spinner size="sm" /> Please Wait...
                          </>
                        ) : (
                          <>
                            <Icon
                              fontSize={18}
                              icon={"mdi:exclamation-thick"}
                            />{" "}
                            Suspend
                          </>
                        )}
                      </button>
                    )}
                    <button
                      type="button"
                      className="btn btn-danger bg-danger rounded-pill m-2"
                    >
                      <i className="fa fa-trash"></i>{" "}
                      <Icon
                        fontSize={18}
                        icon={"mdi:trash-can-circle-outline"}
                      />{" "}
                      Delete
                    </button>
                  </div>
                </div>
                <hr />
                <div className="col-md-12">
                  <div className="thumbnail text-center">
                    <div className="name-avatar">
                      <img
                        src={
                          data?.profile
                            ? data.profile
                            : "assets/images/faces/38.png"
                        }
                        width="100"
                        height="100"
                        alt=""
                        style={{ borderRadius: 100, objectFit: "cover" }}
                      />
                    </div>
                    <h3 className="mt-3 text-center"></h3>
                    <h4 className="mt-2"> </h4>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="rounded col-md-4">
                    <div className="tab-content" id="pills-tabContent">
                      <h3>Info</h3>
                      {/* <hr style="height: 1px; background-color:white"/> */}

                      <div
                        className="tab-pane fade text-start active show"
                        id="pills-home"
                        role="tabpanel"
                        aria-labelledby="pills-home-tab"
                      >
                        <p>Name: {data?.name}</p>
                        <p>Surname: {data?.surname}</p>
                        <p>Email: {data?.email} </p>
                        <p>Phone: {data?.phone} </p>
                        <p>Date Registered: {ToLocalDate(data?.dateJoined)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded col-md-4">
                    <div className="tab-content" id="pills-tabContent">
                      <h3>Financial Summary</h3>
                      <hr />

                      <div
                        className="tab-pane fade text-start active show"
                        id="pills-home"
                        role="tabpanel"
                        aria-labelledby="pills-home-tab"
                      >
                        <p>
                          Income This Week:{" "}
                          <span className="fin_stats" id="weekly_income">
                            R {finances?.weeklyEarnings}.00
                          </span>
                        </p>
                        <p>
                          Total Income:{" "}
                          <span className="fin_stats" id="total_income">
                            R {finances?.totalEarnings}.00
                          </span>
                        </p>
                        <p>
                          Trips This Week:{" "}
                          <span className="fin_stats" id="weekly_trips">
                            {finances?.weeklyTrips}
                          </span>
                        </p>
                        <p>
                          Total Trips:{" "}
                          <span className="fin_stats" id="total_trips">
                            {finances?.totalTrips}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded col-md-4">
                    <div className="tab-content" id="pills-tabContent">
                      <h3>Docs</h3>
                      {/* <hr style={{"height: 1px; background-color:white"}}/> */}
                      <div
                        className="tab-pane fade text-start active show"
                        id="pills-home"
                        role="tabpanel"
                        aria-labelledby="pills-home-tab"
                      >
                        <p>
                          Selfie:{" "}
                          {data?.profile ? (
                            <a href={data?.profile} target="_blank">
                              Open
                            </a>
                          ) : (
                            "Profile Unavailable"
                          )}
                        </p>
                        <p>
                          ID Doc:{" "}
                          {data?.verificationId ? (
                            <a href={data?.verificationId} target="_blank">
                              Open
                            </a>
                          ) : (
                            "ID Unavailable"
                          )}
                        </p>
                        <p>
                          License Doc:{" "}
                          {data?.license ? (
                            <a href={data?.license} target="_blank">
                              Open
                            </a>
                          ) : (
                            "License Unavailable"
                          )}
                        </p>
                        <p>
                          Police Clearance:{" "}
                          {data?.policeClearance ? (
                            <a href={data?.policeClearance} target="_blank">
                              Open
                            </a>
                          ) : (
                            "Clearance Document Unavailable"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  {data?.car && (
                    <div className="rounded col-md-4">
                      <div className="tab-content" id="pills-tabContent">
                        <h3>Car Details</h3>
                        {/* <hr style={{"height: .5px; background-color:white"}}/> */}

                        <div
                          className="tab-pane fade text-start active show"
                          id="pills-home"
                          role="tabpanel"
                          aria-labelledby="pills-home-tab"
                        >
                          <p>Make: {data?.car.make}</p>
                          <p>Model:{data?.car.model} </p>
                          <p>Color: {data?.car.color} </p>
                          <p>Reg: {data?.car.reg} </p>
                          <a href={`/vehicle?id=${data?.car.id}`}>
                            <button
                              type="button"
                              className="btn btn-outline-success btn-fw"
                            >
                              View Details
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {data?.status !== "active" ? "Activate Driver" : "Suspend Driver"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="reasonInput">
              <Form.Label>
                {data?.status !== "active"
                  ? "Reason for Activation"
                  : "Reason for Suspension"}
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={
                  data?.status !== "active"
                    ? "Enter reason for activating this driver"
                    : "Enter reason for suspending this driver"
                }
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={async () => {
              setActing(true);
              if (data?.status !== "active") {
                await activateDriver(
                  router,
                  id as string,
                  validateAndFormatPhoneNumber(data?.phone),
                  reason
                ).finally(() => {
                  setActing(false);
                });
              } else {
                await suspendDriver(
                  router,
                  id as string,
                  validateAndFormatPhoneNumber(data?.phone),
                  reason
                ).finally(() => {
                  setActing(false);
                });
              }
              handleClose();
            }}
            disabled={!reason.trim() || acting}
          >
            {acting ? (
              <>
                <Spinner size="sm" /> Please Wait...
              </>
            ) : data?.status !== "active" ? (
              "Activate"
            ) : (
              "Suspend"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
