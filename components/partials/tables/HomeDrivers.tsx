import {getRecentDrivers } from "@/backend/admin";
import { ToLocalDate } from "@/utils/formats";
import { driverType } from "@/utils/types";
import React, { useEffect, useState } from "react";
import { Spinner} from "react-bootstrap";
import Image from "next/image";
export default function HomeDrivers() {
  const [data, setData] = useState<driverType[]>([]);
  const [loading, setLoading] = useState(true);

  const getDrivers = async () => {
    try {
      setData(await getRecentDrivers());
    } catch (error) {
      console.log(error)
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getDrivers();
  }, []);
  if (loading)
    return (
      <div className="text-align-center align-items-center">
        <Spinner size="sm" color="#be8900" /> Loading Drivers
      </div>
    );

  if (!loading && !data) return <p>No Drivers Found</p>;
  return (
    <div>
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
              <th> Status </th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data &&
              data.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>
                      <Image
                        width={50}
                        height={50}
                        src={
                          item?.profile
                            ? item.profile
                            : "/assets/images/faces/38.png"
                        }
                        style={{ objectFit: "cover", borderRadius: 50 }}
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
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
