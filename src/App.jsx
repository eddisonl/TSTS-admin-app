import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminLoginForm from "./components/auth/AdminLoginForm";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import Overview from "./components/sections/Overview";
import VehicleManagement from "./components/sections/VehicleManagement";
import DriverManagement from "./components/sections/DriverManagement";
import ComplianceTracking from "./components/sections/ComplianceTracking";
import Analytics from "./components/sections/Analytics";
import Notifications from "./components/sections/Notifications";
import Settings from "./components/sections/Settings";
import Reports from "./components/sections/Reports";
import * as icon from '@coreui/icons';
import CIcon from '@coreui/icons-react';



export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    localStorage.setItem("adminUser", JSON.stringify(userData));
    setAdminUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    setIsLoggedIn(false);
    setAdminUser(null);
  };

  useEffect(()=>{
    const savedAdmin = localStorage.getItem("adminUser");
    if (savedAdmin) {
      setAdminUser(JSON.parse(savedAdmin))
      setIsLoggedIn(true)
    }
  },[])

  return (
    <Router>
      <div className="app">
        {!isLoggedIn ? (
          <AdminLoginForm onLoginSuccess={handleLoginSuccess} />
        ) : (
          <Routes>
            <Route path="/" element={<Navigate to="/overview" replace />} />
            <Route
              path="/overview"
              element={
                <AdminDashboard user={adminUser} onLogout={handleLogout}>
                  <Overview />
                </AdminDashboard>
              }
            />
            <Route
              path="/vehicles"
              element={
                <AdminDashboard user={adminUser} onLogout={handleLogout}>
                  <VehicleManagement />
                </AdminDashboard>
              }
            />
            <Route
              path="/drivers"
              element={
                <AdminDashboard user={adminUser} onLogout={handleLogout}>
                  <DriverManagement />
                </AdminDashboard>
              }
            />
            <Route
              path="/compliance"
              element={
                <AdminDashboard user={adminUser} onLogout={handleLogout}>
                  <ComplianceTracking />
                </AdminDashboard>
              }
            />
            <Route
              path="/analytics"
              element={
                <AdminDashboard user={adminUser} onLogout={handleLogout}>
                  <Analytics />
                </AdminDashboard>
              }
            />
            <Route
              path="/notifications"
              element={
                <AdminDashboard user={adminUser} onLogout={handleLogout}>
                  <Notifications />
                </AdminDashboard>
              }
            />
            <Route
              path="/settings"
              element={
                <AdminDashboard user={adminUser} onLogout={handleLogout}>
                  <Settings user={adminUser} />
                </AdminDashboard>
              }
            />
            <Route
              path="/reports"
              element={
                <AdminDashboard user={adminUser} onLogout={handleLogout}>
                  <Reports />
                </AdminDashboard>
              }
            />
          </Routes>
        )}
      </div>
    </Router>
  );
}
