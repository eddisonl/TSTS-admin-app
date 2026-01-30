import React, { useState } from "react";

export default function VehicleManagement() {
  const [vehicles] = useState([
    {
      id: 1,
      plate: "GT-2345",
      model: "Sprinter",
      capacity: 14,
      driver: "Kwesi Mensah",
      status: "active",
    },
    {
      id: 2,
      plate: "GT-2346",
      model: "Hiace",
      capacity: 16,
      driver: "Ama Boateng",
      status: "active",
    },
    {
      id: 3,
      plate: "GT-2347",
      model: "Sprinter",
      capacity: 14,
      driver: "Isaac Owusu",
      status: "maintenance",
    },
  ]);

  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">Vehicle Management</h2>
        <button className="btn-primary">Register New Vehicle</button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Plate Number</th>
              <th>Model</th>
              <th>Capacity</th>
              <th>Driver</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td className="font-semibold">{vehicle.plate}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.capacity} seats</td>
                <td>{vehicle.driver}</td>
                <td>
                  <span className={`badge badge-${vehicle.status}`}>
                    {vehicle.status.charAt(0).toUpperCase() +
                      vehicle.status.slice(1)}
                  </span>
                </td>
                <td>
                  <button className="action-btn">View</button>
                  <button className="action-btn">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
