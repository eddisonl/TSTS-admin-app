import React, { useState } from "react";

export default function AdminLoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email format");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Simulate successful login
    onLoginSuccess({
      id: "1",
      name: "Admin User",
      email: email,
      role: "admin",
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="text-3xl font-bold">TSTS Admin</h1>
          <p className="text-gray-400 mt-2">Trotro Smart Transport System</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-banner">
              <p>{error}</p>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@tsts.gov.gh"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="form-input"
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <p className="text-xs text-gray-500">
            Demo credentials: Use any email and password with 6+ characters
          </p>
        </div>
      </div>
    </div>
  );
}
