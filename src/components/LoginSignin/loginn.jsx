import React, { useState } from "react";
import './login-signup.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ onToggle, storedCredentials }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9000/check-data", { email, password });
      
      if (response.status === 200 && response.data.message === "Valid User") {
        // alert("Logged in successfully!");
        // const { username } = response.data; 
        // Navigate to the gender selection page
        navigate("/gender"); 
        setError("");
      } else {
        setError(response.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="form-content">
        <h2>Sign in</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div> 
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <span className="msg">{error}</span>}
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?<span className="link" onClick={onToggle} >
          Signup here
          </span>
        </p>
      </div>
    </div>
  );
}; 

export default Login;
