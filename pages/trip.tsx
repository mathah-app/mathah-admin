"use client";
import MainPageWrapper from "@/components/wrappers/MainPageWrapper";
import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { tripTypes } from "@/utils/types";
import { getTripDetails } from "@/backend/admin";
import { useSearchParams } from "next/navigation";
import GoogleMap from "@/components/partials/GoogleMap";

export default function Trip() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [data, setData] = useState<tripTypes>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const getTripData = async () => {
      try {
        setData(await getTripDetails(id as string));
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };
    getTripData();
  }, [id]);

  return (
    <MainPageWrapper title="Mathah Trip Details" >
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              {/* Header */}
              <div className="card-hearder-with-btn d-flex flex-row justify-content-between w-100">
                <h2 className="card-title">Trip Details</h2>
              </div>
              {data && !loading && (
                <div>
                  {/* Map */}
                  {/* <div style={{ width: "100%", height: "400px" }} /> */}
                  <div style={{ height: "400px", width: "100%" }} id="map">
                    <GoogleMap data={data} />
                  </div>

                  {/* Status */}
                  <div className="align-items-center justify-content-between mb-4">
                    <hr />

                    {/* Trip Info */}
                    <div className="col-md-12">
                      <div className="thumbnail text-center">
                        <h3 className="mt-3 text-center">About The Trip</h3>
                        <h4 className="mt-2" id="trip_id"></h4>
                      </div>
                    </div>
                    <hr />
                  </div>

                  {/* Rider / Driver */}
                  <div className="row">
                    <div className="col-md-4 tab-content">
                      <h3>Trip Summary</h3>
                      <ul className="trip_user_details">
                        <li>
                          <span>Pickup: </span>
                          <span id="rider_name">{data?.pickUpTitle}</span>
                        </li>
                        <li>
                          <span>Destination:</span>
                          <span id="rider_seats">{data?.destinationTitle}</span>
                        </li>
                        <li>
                          <span>Fare:</span>
                          <span id="rider_note">R {data?.fare}.00</span>
                        </li>
                        <li>
                          <span>Distance:</span>
                          <span id="rider_note">{data?.distance}Km</span>
                        </li>
                        <li>
                          <span>Est Duration</span>
                          <span id="rider_note">{data?.duration}</span>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-4 tab-content">
                      <h3>Rider</h3>
                      <ul className="trip_user_details">
                        <li>
                          <span>Name: </span>

                          <a href={`/rider?id=${data?.driver?.id}`}>
                            <span id="rider_name">
                              {data?.rider_name} {data.rider_surname}
                            </span>
                          </a>
                        </li>
                        <li>
                          <span>Passengers:</span>
                          <span id="rider_seats">{data?.seats}</span>
                        </li>
                        <li>
                          <span>Notes:</span>
                          <span id="rider_note">{data?.note}</span>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-4 tab-content">
                      <h3>Driver</h3>
                      <ul className="trip_user_details">
                        <li>
                          <span>Name: </span>
                          <a href={`/driver?id=${data?.driver?.id}`}>
                            <span id="driver_name">
                              {data?.driver?.name} {data?.driver?.surname}
                            </span>
                          </a>
                        </li>
                        <li>
                          <span>Car:</span>
                          <span id="driver_car">
                            {data.driver?.car?.color} {data.driver?.car?.make}{" "}
                            {data.driver?.car?.model}{" "}
                          </span>
                        </li>
                        <li>
                          <span>Car Reg No:</span>
                          <span id="driver_car_reg">
                            {data.driver?.car?.reg}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainPageWrapper>
  );
}
