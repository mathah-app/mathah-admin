import { getAllDrivers } from "@/backend/admin";
import MainPageWrapper from "@/components/wrappers/MainPageWrapper";
import { ToLocalDate } from "@/utils/formats";
import { driverType } from "@/utils/types";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
export default function drivers() {
  const [data, setData] = useState<driverType[]>([]);
  const [loading, setLoading] = useState(true);

  const getDrivers = async () => {
    try {
      setData(await getAllDrivers());
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getDrivers();
  }, []);
  return (
    <MainPageWrapper>
      <div className="row ">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <div className="card-hearder-with-btn d-flex flex-row justify-content-between w-100">
                <h4 className="card-title">Drivers</h4>
              </div>
              {loading && (
                <div className="text-align-center align-items-center">
                  <Spinner size="sm" color="#be8900" /> Loading Drivers
                </div>
              )}

              {!loading && !data && <p>No Drivers Found</p>}

              {data && !loading && (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> Profile</th>
                        <th> Name </th>
                        <th> Surname</th>
                        <th> Email </th>
                        <th> Phone</th>
                        <th> Date Joined </th>
                        <th> Status</th>
                        <th> Action </th>
                      </tr>
                    </thead>

                    <tbody>
                      {data &&
                        data.map((item) => {
                          return (
                            <>
                              <tr>
                                <td>
                                  <img
                                    src={
                                      item?.profile
                                        ? item.profile
                                        : "assets/images/faces/38.png"
                                    }
                                    alt="image"
                                  />
                                </td>
                                <td>
                                  <span className="pl-2">{item.name}</span>
                                </td>
                                <td>
                                  <span className="pl-2">{item.surname}</span>
                                </td>
                                <td>
                                  <span className="pl-2">{item.email}</span>
                                </td>
                                <td>
                                  <span className="pl-2">{item.phone}</span>
                                </td>
                                <td>
                                  <span className="pl-2">
                                    {ToLocalDate(item?.dateJoined)}
                                  </span>
                                </td>
                                <td>
                                  <span className="pl-2">{item.status}</span>
                                </td>
                                <td>
                                  <a href={`/driver?id=${item.id}`}>
                                    <button
                                      type="button"
                                      className="btn btn-outline-success"
                                    >
                                      View
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
