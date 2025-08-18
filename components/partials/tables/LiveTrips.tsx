import { listenToLiveTrips } from "@/backend/admin";
import { ToLocalDate } from "@/utils/formats";
import { riderType, tripTypes } from "@/utils/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";

export default function LiveTrips() {
  const [data, setData] = useState<tripTypes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = listenToLiveTrips((trips) => {
      setData(trips);
      setLoading(false); // ✅ Only stop loading after data received
    });

    return () => {
      unsubscribe(); // ✅ Clean up real-time listener on unmount
    };
  }, []);
  return (
    <div>
      <div className="row ">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <div className="card-hearder-with-btn d-flex flex-row justify-content-between w-100 align-items-center">
                <h4 className="card-title">Live Trips</h4>
                <a href="./drivers.php">
                  <button type="button" className="btn btn-link btn-fw">
                    View All
                  </button>
                </a>
              </div>
              {/* table */}
              {!loading && !data && <p>No Live Trips At The Moment</p>}

              {data && !loading &&
                <div>
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
                                    <span className="pl-2">
                                      {item.duration}
                                    </span>
                                  </td>
                                  <td>
                                    <span className="pl-2">
                                      {item.ride_status}
                                    </span>
                                  </td>
                                  <td>
                                    <a href={`/driver?id=${item.id}`}>
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
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
