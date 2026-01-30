import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuItems = [
    { id: "overview", path: "/overview", label: "Overview", icon: "📊" },
    { id: "vehicles", path: "/vehicles", label: "Vehicles", icon: "🚐" },
    { id: "drivers", path: "/drivers", label: "Drivers", icon: "👨‍✈️" },
    { id: "compliance", path: "/compliance", label: "Compliance", icon: "✓" },
    { id: "analytics", path: "/analytics", label: "Analytics", icon: "📈" },
    { id: "reports", path: "/reports", label: "Reports", icon: "📋" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="text-xl font-bold text-gray-900">TSTS</h2>
        <p className="text-xs text-gray-600">Admin Control</p>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
