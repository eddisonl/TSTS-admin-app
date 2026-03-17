import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CFormSelect, CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilList } from "@coreui/icons";

export default function Topbar({
  user,
  onLogout,
  activeSection,
  onToggleMobileSidebar,
}) {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Vehicle #VH-001 maintenance due",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      message: "Driver licensing expired for DRV-045",
      time: "5 hours ago",
      read: false,
    },
    {
      id: 3,
      message: "New compliance violation reported",
      time: "1 day ago",
      read: true,
    },
    {
      id: 4,
      message: "Route Accra-Kumasi revenue updated",
      time: "2 days ago",
      read: true,
    },
  ]);

  const userProfileSelect = [
    {
      id: 1,
      name: "⚙️ Settings",
    },
    {
      id: 2,
      name: "Profile Settings",
    },
    {
      id: 3,
      name: "Change Password",
    },
    {
      id: 4,
      name: "Logout",
    },
  ];
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSettingsClick = () => {
    setShowUserMenu(false);
    navigate("/settings");
  };

  const handleNotificationClick = () => {
    setShowNotifications(false);
    navigate("/notifications");
  };

  return (
    <div className="topbar">
      <div className="topbar-content">
        <div className="topbar-title">
          <h1 className="text-2xl font-bold">Admin</h1>
          <p className="text-sm text-gray-300">
            Monitor and manage transport operations
          </p>
        </div>
        <CButton
          className="mobile-sidebar-toggle"
          onClick={onToggleMobileSidebar}
          style={{
            background: "none",
            border: "none",
            padding: "8px",
            // display: "none",
          }}
        >
          <CIcon icon={cilList} size="lg" />
        </CButton>

        <div className="topbar-actions">
          <div className="relative">
            <button
              onClick={handleNotificationClick}
              className="notification-button"
              
            >
              <span className="text-2xl" style={{fontSize:"14px"}}>🔔</span>
              {unreadCount > 0 && (
                <span className="notification-badge" >{unreadCount}</span>
              )}
            </button>

            {showNotifications && (
              <div className="notifications-dropdown">
                <div className="dropdown-header">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Notifications
                  </h3>
                  <button
                    onClick={handleNotificationClick}
                    className="view-all-link"
                  >
                    View All
                  </button>
                </div>
                <div className="notifications-list">
                  {notifications.slice(0, 4).map((notif) => (
                    <div key={notif.id} className="notification-item">
                      <div className="notification-message">
                        <p className="text-sm text-gray-900">{notif.message}</p>
                        <span className="text-xs text-gray-500">
                          {notif.time}
                        </span>
                      </div>
                      {!notif.read && <div className="notification-dot"></div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="user-info" style={{ gap: "0.5em" }}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="user-button"
            >
              <div className="user-avatar">👤</div>
            </button>
            <span>
              <p className="text-sm font-semibold text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </span>
          </div>
          <div
            className="relative"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {showUserMenu && (
              <div className="user-menu">
                <button onClick={handleSettingsClick} className="menu-item">
                  ⚙️ Settings
                </button>
                <hr className="menu-divider" />
                <button onClick={onLogout} className="menu-item logout-item">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
