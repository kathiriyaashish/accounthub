import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    setError("");
    setMessage("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    if (rememberMe) {
      localStorage.setItem("rememberUser", email);
    } else {
      localStorage.removeItem("rememberUser");
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    setMessage("Login successful!");

    setTimeout(() => navigate("/profile"), 1000);
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow w-100" style={{ maxWidth: "420px" }}>
        <h3 className="text-center mb-4">Login</h3>

        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <input
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="input-group mb-3">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Remember Me */}
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="remember">
            Remember Me
          </label>
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="text-center mt-3">
          No account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
