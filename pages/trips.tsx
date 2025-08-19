import { getAllTrips } from "@/backend/admin";
import MainPageWrapper from "@/components/wrappers/MainPageWrapper";
import { ToLocalDate } from "@/utils/formats";
import { tripTypes } from "@/utils/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

export default function Trips() {
  const [data, setData] = useState<tripTypes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const d: any = await getAllTrips();
        setData(d);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);
  return (
    <MainPageWrapper title="Mathah Trips">
      <div className="row ">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <div className="card-hearder-with-btn d-flex flex-row justify-content-between w-100">
                <h4 className="card-title">Completed Trips</h4>
              </div>
              {loading && (
                <div className="text-align-center align-items-center">
                  <Spinner size="sm" color="#be8900" /> Loading Trips
                </div>
              )}

              {!loading && !data && <p>No Trips Found</p>}

              {data && !loading && (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> Rider Name</th>
                        <th> Driver Name</th>
                        <th> Pickup</th>
                        <th> Destination</th>
                        <th> Fare</th>
                        <th> Distance</th>
                        <th> Duration </th>
                        <th> Status </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data.map((item: any) => {
                          return (
                            <>
                              <tr>
                                <td>
                                  <span className="pl-2">
                                    {item.rider_name}
                                  </span>
                                </td>
                                <td>
                                  <span className="pl-2">
                                    {item.driver?.name || "---"}
                                  </span>
                                </td>
                                <td>
                                  <span className="pl-2">
                                    {item.pickUpTitle}
                                  </span>
                                </td>
                                <td>
                                  <span className="pl-2">
                                    {item.destinationTitle}
                                  </span>
                                </td>
                                <td>
                                  <span className="pl-2">R{item.fare}</span>
                                </td>
                                <td>
                                  <span className="pl-2">
                                    {item.distance}Km
                                  </span>
                                </td>
                                <td>
                                  <span className="pl-2">{item.duration}</span>
                                </td>
                                <td>
                                  <span className="pl-2">
                                    {item.ride_status}
                                  </span>
                                </td>
                                <td>
                                  <a href={`/trip?id=${item.id}`}>
                                    <button
                                      type="button"
                                      className="btn btn-outline-success"
                                    >
                                      <Icon
                                        icon={"mdi:eye"}
                                        className="text-primary"
                                      />
                                    </button>
                                  </a>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainPageWrapper>
  );
}
