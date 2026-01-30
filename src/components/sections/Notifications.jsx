import React, { useState } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Vehicle #VH-001 maintenance due",
      time: "2 hours ago",
      type: "maintenance",
      read: false,
    },
    {
      id: 2,
      message: "Driver licensing expired for DRV-045",
      time: "5 hours ago",
      type: "driver",
      read: false,
    },
    {
      id: 3,
      message: "New compliance violation reported on route Accra-Kumasi",
      time: "1 day ago",
      type: "compliance",
      read: true,
    },
    {
      id: 4,
      message: "Route Accra-Kumasi revenue updated: GHS 2,450",
      time: "2 days ago",
      type: "revenue",
      read: true,
    },
    {
      id: 5,
      message: "System maintenance scheduled for Sunday 2:00 AM",
      time: "3 days ago",
      type: "system",
      read: true,
    },
    {
      id: 6,
      message: "Driver DRV-023 completed safety training",
      time: "4 days ago",
      type: "driver",
      read: true,
    },
    {
      id: 7,
      message: "Vehicle #VH-005 passed inspection with no issues",
      time: "5 days ago",
      type: "vehicle",
      read: true,
    },
    {
      id: 8,
      message: "New regulation update from transport authority",
      time: "1 week ago",
      type: "compliance",
      read: true,
    },
  ]);

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type) => {
    const icons = {
      maintenance: "🔧",
      driver: "👨‍✈️",
      compliance: "✓",
      revenue: "💰",
      system: "⚙️",
      vehicle: "🚐",
    };
    return icons[type] || "📢";
  };

  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">Notifications</h2>
        {notifications.length > 0 && (
          <button onClick={handleClearAll} className="btn-clear-all">
            Clear All
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="empty-state">
          <p className="text-2xl mb-2">🔔</p>
          <p className="text-gray-600">No notifications</p>
        </div>
      ) : (
        <div className="notifications-container">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`notification-card ${notif.read ? "read" : "unread"}`}
            >
              <div className="notification-content">
                <div className="notification-icon">
                  {getNotificationIcon(notif.type)}
                </div>
                <div className="notification-details">
                  <p className="notification-text">{notif.message}</p>
                  <p className="notification-time">{notif.time}</p>
                </div>
              </div>
              <div className="notification-actions">
                {!notif.read && (
                  <button
                    onClick={() => handleMarkAsRead(notif.id)}
                    className="btn-mark-read"
                    title="Mark as read"
                  >
                    ✓
                  </button>
                )}
                <button
                  onClick={() => handleDeleteNotification(notif.id)}
                  className="btn-delete-notification"
                  title="Delete notification"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
