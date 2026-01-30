import React, { useState } from "react";

export default function DriverManagement() {
  const [drivers] = useState([
    {
      id: 1,
      name: "Kwesi Mensah",
      license: "DR-12345",
      rating: 4.8,
      trips: 1250,
      status: "verified",
    },
    {
      id: 2,
      name: "Ama Boateng",
      license: "DR-12346",
      rating: 4.9,
      trips: 980,
      status: "verified",
    },
    {
      id: 3,
      name: "Isaac Owusu",
      license: "DR-12347",
      rating: 4.5,
      trips: 567,
      status: "pending",
    },
  ]);

  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">Driver Management</h2>
        <button className="btn-primary">Register Driver</button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Driver Name</th>
              <th>License Number</th>
              <th>Rating</th>
              <th>Trips Completed</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id}>
                <td className="font-semibold">{driver.name}</td>
                <td>{driver.license}</td>
                <td>
                  <span className="stars">
                    {"⭐".repeat(Math.floor(driver.rating))}
                  </span>
                  {driver.rating}
                </td>
                <td>{driver.trips}</td>
                <td>
                  <span className={`badge badge-${driver.status}`}>
                    {driver.status.charAt(0).toUpperCase() +
                      driver.status.slice(1)}
                  </span>
                </td>
                <td>
                  <button className="action-btn">View</button>
                  <button className="action-btn">Verify</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
