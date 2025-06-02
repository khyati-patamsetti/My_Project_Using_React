import React, { useState } from "react";
import Signup from "./login-signup";
import './login-signup.css';
import Login from "./loginn";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
const App = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate(); 
  const toggleForm = () => {
    setIsSignup((prev) => !prev);
  };
  const handleLogin = (credentials) => {
    setStoredCredentials(credentials);
    navigate("/gender"); 
};
  return (
    <div className="auth-container">
      {isSignup ? (
        <Signup onToggle={toggleForm} setStoredCredentials={setStoredCredentials} />
      ) : (
        <Login onToggle={toggleForm} storedCredentials={storedCredentials} />
      )}
    </div>
  );
};


export default App;
