import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

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

  const revenueData = [
    { day: "Mon", revenue: 6500 },
    { day: "Tue", revenue: 7800 },
    { day: "Wed", revenue: 8200 },
    { day: "Thu", revenue: 7500 },
    { day: "Fri", revenue: 8800 },
    { day: "Sat", revenue: 9200 },
    { day: "Sun", revenue: 10000 },
  ];
  
  const vehicleStatusData = [
    { name: "Active", value: 847 },
    { name: "Maintenance", value: 198 },
    { name: "Inactive", value: 200 },
  ];
  
  const COLORS = ["#10b981", "#f59e0b", "#ef4444"];
  
  return (
    <div className="section">
      <h2 className="section-title">System Overview</h2>

      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} style={{display:'flex', gap:'1em'}} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <p className="stat-label" style={{fontWeight:'700'}}>{stat.label}</p>
              <p className="stat-value" style={{fontWeight:'600'}}>{stat.value}</p>
              <p className="stat-change positive">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="chart-section" >
        <div className="chart-card" style={{ height: '260px', position: 'relative' }}>
          <h3 className="text-lg font-semibold mt-3 mb-3">
            Daily Revenue Trend
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>

        </div>

        <div className="chart-card" style={{ height: '260px', position: 'relative' }}>
          <h3 className="text-lg font-semibold mt-5 mb-2">
            Vehicle Status
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={vehicleStatusData}
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
              >
                {vehicleStatusData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
