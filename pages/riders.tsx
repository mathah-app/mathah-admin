import {  getAllRiders } from "@/backend/admin";
import MainPageWrapper from "@/components/wrappers/MainPageWrapper";
// import { ToLocalDate } from "@/utils/formats";
import {riderType } from "@/utils/types";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Image from "next/image";
export default function Riders() {
  const [data, setData] = useState<riderType[]>([]);
  const [loading, setLoading] = useState(true);

  const getRiders = async () => {
    try {
      setData(await getAllRiders());
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getRiders();
  }, []);
  return (
    <MainPageWrapper title="Mathah Riders">
      <div className="row ">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <div className="card-hearder-with-btn d-flex flex-row justify-content-between w-100">
                <h4 className="card-title">Riders</h4>
              </div>
              {loading && (
                <div className="text-align-center align-items-center">
                  <Spinner size="sm" color="#be8900" /> Loading Riders
                </div>
              )}

              {!loading && !data && <p>No Riders Found</p>}

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
                        {/* <th> Date Joined </th> */}
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
                                  <Image
                                  width={50}
                                  height={50}
                                    src={
                                      item?.profile
                                        ? item.profile
                                        : "/assets/images/faces/38.png"
                                    }
                                    style={{objectFit:'cover', borderRadius:50}}
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
                                {/* <td>
                                  <span className="pl-2">
                                    {'dAT'}
                                  </span>
                                </td> */}
                                <td>
                                  <span className="pl-2">{item.status}</span>
                                </td>
                                <td>
                                  <a href={`/rider?id=${item.id}`}>
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