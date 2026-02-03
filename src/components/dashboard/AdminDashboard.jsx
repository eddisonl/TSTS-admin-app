import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import Topbar from "../layout/Topbar";

export default function AdminDashboard({ user, onLogout, children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  // Extract active section from current path
  const getActiveSection = () => {
    const path = location.pathname;
    if (path === "/overview") return "overview";
    if (path === "/vehicles") return "vehicles";
    if (path === "/drivers") return "drivers";
    if (path === "/compliance") return "compliance";
    if (path === "/analytics") return "analytics";
    if (path === "/notifications") return "notifications";
    if (path === "/settings") return "settings";
    if (path === "/reports") return "reports";
    return "overview";
  };

  const activeSection = getActiveSection();

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Topbar
          user={user}
          onLogout={onLogout}
          activeSection={activeSection}
        />
        <div className="content-area">{children}</div>
      </div>
    </div>
  );
}
