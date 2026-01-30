import React, { useState } from "react";

export default function Settings({ user }) {
  const [settings, setSettings] = useState({
    // Account Settings
    accountName: user.name,
    accountEmail: user.email,
    phoneNumber: "+233 50 123 4567",
    timezone: "GMT+0",
    language: "English",

    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    systemAlerts: true,
    maintenanceAlerts: true,
    complianceAlerts: true,
    revenueReports: false,

    // System Settings
    darkMode: false,
    autoLogout: true,
    autoLogoutTime: "30",
    twoFactorAuth: true,
    sessionTimeout: "60",

    // Data Settings
    dataRetention: "12",
    reportFrequency: "monthly",
    backupFrequency: "daily",

    // Permission Settings
    canAddVehicles: true,
    canAddDrivers: true,
    canViewReports: true,
    canManageCompliance: true,
    canManageUsers: false,
    canAccessSystemLogs: true,
  });

  const [activeTab, setActiveTab] = useState("account");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleInputChange = (field, value) => {
    setSettings({
      ...settings,
      [field]: value,
    });
  };

  const handleSaveSettings = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="section">
      <div className="settings-header">
        <h2 className="section-title">Settings</h2>
        {saveSuccess && (
          <p className="save-success-message">✓ Settings saved successfully</p>
        )}
      </div>

      <div className="settings-tabs">
        <button
          className={`settings-tab ${activeTab === "account" ? "active" : ""}`}
          onClick={() => setActiveTab("account")}
        >
          👤 Account
        </button>
        <button
          className={`settings-tab ${
            activeTab === "notifications" ? "active" : ""
          }`}
          onClick={() => setActiveTab("notifications")}
        >
          🔔 Notifications
        </button>
        <button
          className={`settings-tab ${activeTab === "system" ? "active" : ""}`}
          onClick={() => setActiveTab("system")}
        >
          ⚙️ System
        </button>
        <button
          className={`settings-tab ${activeTab === "data" ? "active" : ""}`}
          onClick={() => setActiveTab("data")}
        >
          📊 Data & Reports
        </button>
        <button
          className={`settings-tab ${
            activeTab === "permissions" ? "active" : ""
          }`}
          onClick={() => setActiveTab("permissions")}
        >
          🔐 Permissions
        </button>
      </div>

      <div className="settings-content">
        {/* Account Settings */}
        {activeTab === "account" && (
          <div className="settings-section">
            <h3 className="settings-section-title">Account Information</h3>

            <div className="setting-group">
              <label className="setting-label">Full Name</label>
              <input
                type="text"
                value={settings.accountName}
                onChange={(e) =>
                  handleInputChange("accountName", e.target.value)
                }
                className="setting-input"
              />
            </div>

            <div className="setting-group">
              <label className="setting-label">Email Address</label>
              <input
                type="email"
                value={settings.accountEmail}
                onChange={(e) =>
                  handleInputChange("accountEmail", e.target.value)
                }
                className="setting-input"
              />
            </div>

            <div className="setting-group">
              <label className="setting-label">Phone Number</label>
              <input
                type="text"
                value={settings.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                className="setting-input"
              />
            </div>

            <div className="setting-group">
              <label className="setting-label">Timezone</label>
              <select
                value={settings.timezone}
                onChange={(e) => handleInputChange("timezone", e.target.value)}
                className="setting-select"
              >
                <option>GMT+0</option>
                <option>GMT+1</option>
                <option>GMT-5</option>
              </select>
            </div>

            <div className="setting-group">
              <label className="setting-label">Language</label>
              <select
                value={settings.language}
                onChange={(e) => handleInputChange("language", e.target.value)}
                className="setting-select"
              >
                <option>English</option>
                <option>Twi</option>
                <option>Ga</option>
                <option>Hausa</option>
              </select>
            </div>

            <button onClick={handleSaveSettings} className="btn-save-settings">
              Save Changes
            </button>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === "notifications" && (
          <div className="settings-section">
            <h3 className="settings-section-title">Notification Preferences</h3>

            <div className="toggle-setting">
              <div className="toggle-info">
                <p className="toggle-label">Email Notifications</p>
                <p className="toggle-description">
                  Receive important updates via email
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) =>
                  handleInputChange("emailNotifications", e.target.checked)
                }
                className="toggle-input"
              />
            </div>

            <div className="toggle-setting">
              <div className="toggle-info">
                <p className="toggle-label">SMS Notifications</p>
                <p className="toggle-description">
                  Get critical alerts via SMS
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.smsNotifications}
                onChange={(e) =>
                  handleInputChange("smsNotifications", e.target.checked)
                }
                className="toggle-input"
              />
            </div>

            <div className="toggle-setting">
              <div className="toggle-info">
                <p className="toggle-label">System Alerts</p>
                <p className="toggle-description">
                  Receive system maintenance and downtime alerts
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.systemAlerts}
                onChange={(e) =>
                  handleInputChange("systemAlerts", e.target.checked)
                }
                className="toggle-input"
              />
            </div>

            <div className="toggle-setting">
              <div className="toggle-info">
                <p className="toggle-label">Maintenance Alerts</p>
                <p className="toggle-description">
                  Get notified about vehicle maintenance schedules
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.maintenanceAlerts}
                onChange={(e) =>
                  handleInputChange("maintenanceAlerts", e.target.checked)
                }
                className="toggle-input"
              />
            </div>

            <div className="toggle-setting">
              <div className="toggle-info">
                <p className="toggle-label">Compliance Alerts</p>
                <p className="toggle-description">
                  Be notified of compliance violations
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.complianceAlerts}
                onChange={(e) =>
                  handleInputChange("complianceAlerts", e.target.checked)
                }
                className="toggle-input"
              />
            </div>

            <div className="toggle-setting">
              <div className="toggle-info">
                <p className="toggle-label">Revenue Reports</p>
                <p className="toggle-description">
                  Receive weekly revenue reports
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.revenueReports}
                onChange={(e) =>
                  handleInputChange("revenueReports", e.target.checked)
                }
                className="toggle-input"
              />
            </div>

            <button onClick={handleSaveSettings} className="btn-save-settings">
              Save Preferences
            </button>
          </div>
        )}

        {/* System Settings */}
        {activeTab === "system" && (
          <div className="settings-section">
            <h3 className="settings-section-title">System Configuration</h3>

            <div className="toggle-setting">
              <div className="toggle-info">
                <p className="toggle-label">Dark Mode</p>
                <p className="toggle-description">
                  Enable dark theme for the dashboard
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) =>
                  handleInputChange("darkMode", e.target.checked)
                }
                className="toggle-input"
              />
            </div>

            <div className="toggle-setting">
              <div className="toggle-info">
                <p className="toggle-label">Auto Logout</p>
                <p className="toggle-description">
                  Automatically logout after inactivity
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.autoLogout}
                onChange={(e) =>
                  handleInputChange("autoLogout", e.target.checked)
                }
                className="toggle-input"
              />
            </div>

            {settings.autoLogout && (
              <div className="setting-group">
                <label className="setting-label">
                  Auto Logout After (minutes)
                </label>
                <input
                  type="number"
                  value={settings.autoLogoutTime}
                  onChange={(e) =>
                    handleInputChange("autoLogoutTime", e.target.value)
                  }
                  className="setting-input"
                />
              </div>
            )}

            <div className="toggle-setting">
              <div className="toggle-info">
                <p className="toggle-label">Two-Factor Authentication</p>
                <p className="toggle-description">Require 2FA for login</p>
              </div>
              <input
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={(e) =>
                  handleInputChange("twoFactorAuth", e.target.checked)
                }
                className="toggle-input"
              />
            </div>

            <div className="setting-group">
              <label className="setting-label">Session Timeout (minutes)</label>
              <input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) =>
                  handleInputChange("sessionTimeout", e.target.value)
                }
                className="setting-input"
              />
            </div>

            <button onClick={handleSaveSettings} className="btn-save-settings">
              Save Configuration
            </button>
          </div>
        )}

        {/* Data & Reports Settings */}
        {activeTab === "data" && (
          <div className="settings-section">
            <h3 className="settings-section-title">Data & Report Settings</h3>

            <div className="setting-group">
              <label className="setting-label">Data Retention (months)</label>
              <input
                type="number"
                value={settings.dataRetention}
                onChange={(e) =>
                  handleInputChange("dataRetention", e.target.value)
                }
                className="setting-input"
              />
              <p className="setting-help">How long to keep transaction data</p>
            </div>

            <div className="setting-group">
              <label className="setting-label">
                Report Generation Frequency
              </label>
              <select
                value={settings.reportFrequency}
                onChange={(e) =>
                  handleInputChange("reportFrequency", e.target.value)
                }
                className="setting-select"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>

            <div className="setting-group">
              <label className="setting-label">Backup Frequency</label>
              <select
                value={settings.backupFrequency}
                onChange={(e) =>
                  handleInputChange("backupFrequency", e.target.value)
                }
                className="setting-select"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <button onClick={handleSaveSettings} className="btn-save-settings">
              Save Data Settings
            </button>
          </div>
        )}

        {/* Permissions Settings */}
        {activeTab === "permissions" && (
          <div className="settings-section">
            <h3 className="settings-section-title">User Permissions</h3>
            <p className="permissions-note">
              Configure what this admin account can access and modify
            </p>

            <div className="toggle-setting">
              <div className="toggle-info">
                <p className="toggle-label">Add Vehicles</p>
                <p className="toggle-description">
                  Can register and add new vehicles
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.canAddVehicles}
                onChange={(e) =>
                  handleInputChange("canAddVehicles", e.target.checked)
                }
                className="toggle-input"
              />
            </div>

            <div className="toggle-setting">
              <div className="toggle-info">
                <p className="toggle-label">Add Drivers</p>
                <p className="toggle-description">
                  Can register and add new drivers
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.canAddDrivers}
                onChange={(e) =>
                  handleInputChange("canAddDrivers", e.target.checked)
                }
                className="toggle-input"
              />
            </div>

            <div className="toggle-setting">
              <div className="toggle-info">
                <p className="toggle-label">View Reports</p>
                <p className="toggle-description">
                  Can access and view all reports
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.canViewReports}
                onChange={(e) =>
                  handleInputChange("canViewReports", e.target.checked)
                }
                className="toggle-input"
              />
            </div>

            <div className="toggle-setting">
              <div className="toggle-info">
                <p className="toggle-label">Manage Compliance</p>
                <p className="toggle-description">
                  Can handle compliance violations and enforcement
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.canManageCompliance}
                onChange={(e) =>
                  handleInputChange("canManageCompliance", e.target.checked)
                }
                className="toggle-input"
              />
            </div>

            <div className="toggle-setting">
              <div className="toggle-info">
                <p className="toggle-label">Manage Users</p>
                <p className="toggle-description">
                  Can create and manage admin users
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.canManageUsers}
                onChange={(e) =>
                  handleInputChange("canManageUsers", e.target.checked)
                }
                className="toggle-input"
              />
            </div>

            <div className="toggle-setting">
              <div className="toggle-info">
                <p className="toggle-label">Access System Logs</p>
                <p className="toggle-description">
                  Can view system logs and audit trails
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.canAccessSystemLogs}
                onChange={(e) =>
                  handleInputChange("canAccessSystemLogs", e.target.checked)
                }
                className="toggle-input"
              />
            </div>

            <button onClick={handleSaveSettings} className="btn-save-settings">
              Update Permissions
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
