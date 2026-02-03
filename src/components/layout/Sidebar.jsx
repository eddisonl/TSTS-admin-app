import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { CButton } from "@coreui/react";
import CIcon from '@coreui/icons-react';
import { cilList } from '@coreui/icons';

export default function Sidebar({ onToggle, collapsed: externalCollapsed }) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);

  // Use external collapsed state if provided, otherwise use internal
  const collapsed = externalCollapsed !== undefined ? externalCollapsed : internalCollapsed;
  const setCollapsed = externalCollapsed !== undefined ? onToggle : setInternalCollapsed;

  const menuItems = [
    { id: "overview", path: "/overview", label: "Overview", icon: "📊" },
    { id: "vehicles", path: "/vehicles", label: "Vehicles", icon: "🚐" },
    { id: "drivers", path: "/drivers", label: "Drivers", icon: "👨‍✈️" },
    { id: "compliance", path: "/compliance", label: "Compliance", icon: "✓" },
    { id: "analytics", path: "/analytics", label: "Analytics", icon: "📈" },
    { id: "reports", path: "/reports", label: "Reports", icon: "📋" },
  ];

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        {!collapsed && (
          <span>
            <h2 className="text-xl font-bold text-gray-900">TSTS</h2>
            <p className="text-xs text-gray-600">Admin Control</p>
          </span>
        )}
        <CButton
          style={{
            border: 'none',
            background: "none",
            cursor: 'pointer',
            padding: '8px',
            position: collapsed ? "relative" : "absolute",
            right: collapsed ? "auto" : "10px",
            top: collapsed ? "auto" : "10px",
            zIndex: 1001
          }}
          onClick={() => setCollapsed(!collapsed)}
        >
          <CIcon icon={cilList} className="text-gray-600" style={{width: "20px", height: "20px"}} />
        </CButton>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""} ${collapsed ? "collapsed" : ""}`
            }
            title={collapsed ? item.label : ""}
          >
            <span className="nav-icon">{item.icon}</span>
            {!collapsed && <span className="nav-label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
