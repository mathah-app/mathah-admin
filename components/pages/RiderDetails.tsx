"use client";
import { getRiderDetails, getRiderTransactions } from "@/backend/admin";
import { riderType } from "@/utils/types";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Image from "next/image";
export default function RiderDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [data, setData] = useState<riderType>();
  const [loading, setLoading] = useState(true);
  const [finances, setFinances] = useState<any>();

  useEffect(() => {
    if (!id) return;
    const getRiderData = async () => {
      try {
        setData(await getRiderDetails(id as string));
        setFinances(await getRiderTransactions(id as string));
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };
    getRiderData();
  }, [id]);
  return (
    <div>
      <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <div className="card-hearder-with-btn d-flex flex-row justify-content-between w-100">
              <h2 className="card-title">Rider Details</h2>
            </div>

            {loading && (
              <div className="text-align-center align-items-center">
                <Spinner size="sm" color="#be8900" /> Loading Rider Details
              </div>
            )}
            {!data && !loading && <p>No Rider Found Here</p>}
            {data && !loading && (
              <div className="align-items-center justify-content-between mb-4">
                <div className=" d-flex flex-column flex-md-row justify-content-between">
                  <h6>
                    Status: <span className="pl-2">{data.status}</span>
                  </h6>
                  <div className="d-flex">
                    <a href="./backend/drivers/suspend_driver.php?id=<?php echo $rows['id']  ?>">
                      <button
                        type="button"
                        className="btn btn-warning rounded-pill m-2"
                        style={{ color: "gray" }}
                      >
                        <i className="fa fa-exclamation-triangle"></i> Suspend
                      </button>
                    </a>
                    <a href="./backend/drivers/decline_driver.php?id=<?php echo $rows['id']  ?>">
                      <button
                        type="button"
                        className="btn btn-danger bg-danger rounded-pill m-2"
                      >
                        <i className="fa fa-trash"></i> Decline
                      </button>
                    </a>
                  </div>
                </div>
                <hr />
                <div className="col-md-12">
                  <div className="thumbnail text-center">
                    <div className="name-avatar">
                      <Image
                        width={100}
                        height={100}
                        src={
                          data?.profile
                            ? data.profile
                            : "/assets/images/faces/38.png"
                        }
                        style={{ objectFit: "cover", borderRadius: 100 }}
                        alt="image"
                      />
                      {/* <p>{data?.id}</p> */}
                    </div>
                    <h3 className="mt-3 text-center"></h3>
                    <h4 className="mt-2"> </h4>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="rounded col-md-6">
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
                        <p>Surname:{data?.surname}</p>
                        <p>Email:{data?.email} </p>
                        <p>Phone:{data?.phone} </p>
                        <p>Date Registered:{data?.dateJoined?.toString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded col-md-6">
                    <div className="tab-content" id="pills-tabContent">
                      <h3>Ride Summary</h3>
                      <hr />

                      <div
                        className="tab-pane fade text-start active show"
                        id="pills-home"
                        role="tabpanel"
                        aria-labelledby="pills-home-tab"
                      >
                        <p>
                          Spent This Week:{" "}
                          <span className="fin_stats" id="weekly_income">
                            R {finances?.weeklyEarnings}.00
                          </span>
                        </p>
                        <p>
                          Total Spent:{" "}
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
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
