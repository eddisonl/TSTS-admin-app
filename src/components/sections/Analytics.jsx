import React from "react";
export default function Analytics() {
  const reports = [
    {
      title: "Revenue Report",
      description: "Weekly revenue breakdown by route",
      icon: "💰",
    },
    {
      title: "Driver Performance",
      description: "Driver ratings and trip analytics",
      icon: "📊",
    },
    {
      title: "Route Analysis",
      description: "Popular routes and demand patterns",
      icon: "🗺️",
    },
    {
      title: "Safety Metrics",
      description: "Accident and incident reports",
      icon: "⚠️",
    },
  ];

  return (
    <div className="section">
      <h2 className="section-title">Analytics & Reports</h2>

      <div className="reports-grid">
        {reports.map((report, idx) => (
          <div key={idx} className="report-card">
            <div className="report-icon">{report.icon}</div>
            <h3 className="report-title">{report.title}</h3>
            <p className="report-description">{report.description}</p>
            <button className="btn-secondary w-full mt-4">
              Generate Report
            </button>
          </div>
        ))}
      </div>

      <div className="analytics-section">
        <h3 className="text-lg font-semibold text-white mb-4">
          Top Routes by Revenue
        </h3>
        <div className="route-list">
          {[
            { route: "Accra ↔ Kumasi", revenue: "45,320 GHS", trips: 1240 },
            { route: "Accra ↔ Takoradi", revenue: "38,900 GHS", trips: 985 },
            { route: "Kumasi ↔ Takoradi", revenue: "32,150 GHS", trips: 867 },
          ].map((item, idx) => (
            <div key={idx} className="route-item">
              <div className="route-info">
                <p className="route-name">{item.route}</p>
                <p className="route-trips">{item.trips} trips</p>
              </div>
              <p className="route-revenue">{item.revenue}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
