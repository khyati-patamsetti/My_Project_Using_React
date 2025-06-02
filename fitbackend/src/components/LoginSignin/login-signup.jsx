import React, { useState } from "react";
import './login-signup.css';
import axios from "axios";
const Signup = ({ onToggle, setStoredCredentials }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const handleSignup = async(e) => {
    e.preventDefault();
    const newErrors = {};
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(password)) {
      newErrors.password = "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Password must contain at least one number.";
    } else if (!/[!@#$%^&*]/.test(password)) {
      newErrors.password = "Password must contain at least one special character.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post("http://localhost:9000/get-data", { username: name, email, password });
      console.log(response.data);
      if (response.data.exists) {
        alert("This email is already registered.");
      } else {
        setStoredCredentials({ email, password });
        alert("Signed up successfully!");
        onToggle();
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  

    try {
      await axios.post('http://localhost:9000/user-data', {
        data: { username : name},
      });
      
    }
    catch(error){
      console.log(error);
    }};
  return (
    <div className="auth-container">
      <div className="form-content">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className="input-group">
          <label>Username</label>
          <input
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <span className="msg">{errors.email}</span>}
        </div>
        <div className="input-group">
          <label>Password</label> 
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <span className="msg">{errors.password}</span>}
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{""}
        <span className="link" onClick={onToggle} >
          Login here
        </span>
      </p>
    </div>
    </div> 
  );
};

export default Signup;