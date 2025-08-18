import { getAllCars} from "@/backend/admin";
import MainPageWrapper from "@/components/wrappers/MainPageWrapper";
import { ToLocalDate } from "@/utils/formats";
import { carType } from "@/utils/types";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
export default function Vehicles() {
  const [data, setData] = useState<carType[]>([]);
  const [loading, setLoading] = useState(true);
  const getCars = async () => {
    try {
      setData(await getAllCars());
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCars();
  }, []);
  return (
    <MainPageWrapper>
      <div className="row ">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <div className="card-hearder-with-btn d-flex flex-row justify-content-between w-100">
                <h4 className="card-title">Cars</h4>
              </div>
              {loading && (
                <div className="text-align-center align-items-center">
                  <Spinner size="sm" color="#be8900" /> Loading Cars
                </div>
              )}

              {!loading && !data && <p>No Cars Found</p>}

              {data && !loading && (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> Make</th>
                        <th> Model </th>
                        <th> Color</th>
                        <th> Reg</th>
                        <th> Date Added </th>
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
                                  {item.make}
                                </td>
                                <td>
                                  <span className="pl-2">{item.model}</span>
                                </td>
                                <td>
                                  <span className="pl-2">{item.color}</span>
                                </td>
                                <td>
                                  <span className="pl-2">{item.reg}</span>
                                </td>
                                <td>
                                  <span className="pl-2">
                                    {ToLocalDate(item?.dateAdded)}
                                  </span>
                                </td>
                                <td>
                                  <span className="pl-2">{item.status}</span>
                                </td>
                                <td>
                                  <a href={`/vehicle?id=${item.id}`}>
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
