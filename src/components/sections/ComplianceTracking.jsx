import React from "react";

export default function ComplianceTracking() {
  const [violations] = React.useState([
    {
      id: 1,
      vehicle: "GT-2345",
      driver: "Kwesi Mensah",
      violation: "Speeding",
      date: "2024-01-12",
      status: "resolved",
    },
    {
      id: 2,
      vehicle: "GT-2346",
      driver: "Ama Boateng",
      violation: "Overloading",
      date: "2024-01-10",
      status: "pending",
    },
    {
      id: 3,
      vehicle: "GT-2347",
      driver: "Isaac Owusu",
      violation: "Missing Documents",
      date: "2024-01-08",
      status: "resolved",
    },
  ]);

  return (
    <div className="section">
      <h2 className="section-title">Compliance Tracking</h2>

      <div className="compliance-stats">
        <div className="compliance-card">
          <p className="text-sm text-gray-400">Total Violations</p>
          <p className="text-3xl font-bold text-white">47</p>
        </div>
        <div className="compliance-card">
          <p className="text-sm text-gray-400">Pending Issues</p>
          <p className="text-3xl font-bold text-orange-500">12</p>
        </div>
        <div className="compliance-card">
          <p className="text-sm text-gray-400">Resolved</p>
          <p className="text-3xl font-bold text-green-500">35</p>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Driver</th>
              <th>Violation Type</th>
              <th>Date Reported</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {violations.map((violation) => (
              <tr key={violation.id}>
                <td className="font-semibold">{violation.vehicle}</td>
                <td>{violation.driver}</td>
                <td>{violation.violation}</td>
                <td>{violation.date}</td>
                <td>
                  <span className={`badge badge-${violation.status}`}>
                    {violation.status.charAt(0).toUpperCase() +
                      violation.status.slice(1)}
                  </span>
                </td>
                <td>
                  <button className="action-btn">Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
