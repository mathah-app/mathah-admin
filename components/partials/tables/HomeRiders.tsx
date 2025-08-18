import { getAllRiders } from "@/backend/admin";
import { riderType } from "@/utils/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
export default function HomeRiders() {
  const [data, setData] = useState<riderType[]>([]);
  const getRiders = async () => {
    setData(await getAllRiders());
  };
  useEffect(() => {
    getRiders();
  }, []);
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
                          {item.dateJoined?.toString()}
                        </span>
                      </td>
                      <td>
                        <span className="pl-2">{item.status}</span>
                      </td>
                      <td>
                        <a href={`/rider?id=${item.id}`}>
                          <button
                            type="button"
                            className="btn btn-outline-success btn-fw"
                          >
                            View Details
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
  );
}
