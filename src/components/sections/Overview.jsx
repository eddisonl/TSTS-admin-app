import React from "react";
export default function Overview() {
  const stats = [
    { label: "Active Vehicles", value: "1,245", change: "+5.2%", icon: "🚐" },
    {
      label: "Registered Drivers",
      value: "2,847",
      change: "+12.3%",
      icon: "👨‍✈️",
    },
    { label: "Passengers Today", value: "15,432", change: "+8.1%", icon: "👥" },
    { label: "Revenue (GHS)", value: "125,420", change: "+3.4%", icon: "💰" },
  ];

  return (
    <div className="section">
      <h2 className="section-title">System Overview</h2>

      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <p className="stat-label">{stat.label}</p>
              <p className="stat-value">{stat.value}</p>
              <p className="stat-change positive">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="chart-section">
        <div className="chart-card">
          <h3 className="text-lg font-semibold text-white mb-4">
            Daily Revenue Trend
          </h3>
          <div className="chart-placeholder">
            <p className="text-gray-400">Revenue chart visualization area</p>
            <div className="chart-bars">
              {[65, 78, 82, 75, 88, 92, 85].map((val, idx) => (
                <div key={idx} className="chart-bar-container">
                  <div
                    className="chart-bar"
                    style={{ height: `${val}%` }}
                  ></div>
                  <p className="chart-label">Day {idx + 1}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h3 className="text-lg font-semibold text-white mb-4">
            Vehicle Status
          </h3>
          <div className="status-list">
            <div className="status-item">
              <div
                className="status-dot"
                style={{ backgroundColor: "#10b981" }}
              ></div>
              <span>Active</span>
              <span className="ml-auto font-semibold">847 (68%)</span>
            </div>
            <div className="status-item">
              <div
                className="status-dot"
                style={{ backgroundColor: "#f59e0b" }}
              ></div>
              <span>In Maintenance</span>
              <span className="ml-auto font-semibold">198 (16%)</span>
            </div>
            <div className="status-item">
              <div
                className="status-dot"
                style={{ backgroundColor: "#ef4444" }}
              ></div>
              <span>Inactive</span>
              <span className="ml-auto font-semibold">200 (16%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
