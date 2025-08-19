import { getVehicleDetails } from "@/backend/admin";
import MainPageWrapper from "@/components/wrappers/MainPageWrapper";
import { ToLocalDate } from "@/utils/formats";
import { carType, riderType } from "@/utils/types";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Vehicle() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [data, setData] = useState<carType>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const getRiderData = async () => {
      try {
        setData(await getVehicleDetails(id as string));
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };
    getRiderData();
  }, [id]);
  return (
    <MainPageWrapper title="Mathah Vehicle Details">
      <div className="row ">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <div className="card-hearder-with-btn d-flex flex-row justify-content-between w-100">
                <h2 className="card-title">Car</h2>
              </div>
              <div className="align-items-center justify-content-between mb-4">
                <div className=" d-flex flex-column flex-md-row justify-content-between">
                  <h6>
                    Status: <span className="pl-2">{data?.status}</span>
                  </h6>
                  <div className="d-flex">
                    <button
                      type="button"
                      className="btn btn-success rounded-pill m-2"
                      style={{ backgroundColor: "green;" }}
                    >
                      Approve
                    </button>

                    <button
                      type="button"
                      className="btn btn-warning rounded-pill m-2"
                      style={{ color: "gray" }}
                    >
                      <i className="fa fa-exclamation-triangle"></i> Suspend
                    </button>

                    <button
                      type="button"
                      className="btn btn-danger bg-danger rounded-pill m-2"
                    >
                      <i className="fa fa-trash"></i> Decline
                    </button>
                  </div>
                </div>
                <hr />
                <div className="col-md-12">
                  <div className="thumbnail text-center">
                    <h3 className="mt-3 text-center"> </h3>
                    <h4 className="mt-2"> Color: {data?.color} </h4>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="rounded col-md-4">
                    <div className="tab-content" id="pills-tabContent">
                      <h3>Info</h3>
                      {/* <hr style="height: 1px; background-color:white"> */}

                      <div
                        className="tab-pane fade text-start active show"
                        id="pills-home"
                        role="tabpanel"
                        aria-labelledby="pills-home-tab"
                      >
                        <p>Make: {data?.make}</p>
                        <p>Model: {data?.model} </p>
                        <p>Color: {data?.color} </p>
                        <p>Reg No: {data?.reg} </p>
                        <p>Date Added: {ToLocalDate(data?.dateAdded)} </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded col-md-4">
                    <div className="tab-content" id="pills-tabContent">
                      <h3>Owner Details</h3>
                      {/* <hr style="height: .5px; background-color:white"/> */}

                      <div
                        className="tab-pane fade text-start active show"
                        id="pills-home"
                        role="tabpanel"
                        aria-labelledby="pills-home-tab"
                      >
                        {/* <p>Name: </p>
                        <p>Surname: </p>
                        <p>Mathah ID: </p> */}
                        <a href={`/driver?id${data?.userId}`}>
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
                  <div className="rounded col-md-4">
                    <div className="tab-content" id="pills-tabContent">
                      <h3>NOTES:</h3>
                      {/* <hr style="height: 1px; background-color:white"> */}

                      <div
                        className="tab-pane fade text-start active show"
                        id="pills-home"
                        role="tabpanel"
                        aria-labelledby="pills-home-tab"
                      >
                        <p>
                          This car will need to be verified through a live
                          video. The video will be between Mathah's team member
                          and the driver showing around the car, inside and out.
                          Upon verification and inspection completion, the
                          driver will need to send the required docs, through
                          email or whatsapp platform. Then from there a decision
                          will be made. The decision can be to approve or to
                          decline the car.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainPageWrapper>
  );
}
