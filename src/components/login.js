import React, { useRef, useState } from "react";
import "../css/login.css";
import { Link, useHistory } from "react-router-dom";
import {useAuth} from "../components/Context/AuthContext";


export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

const {login} = useAuth()
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      await login(emailRef.current.value, passwordRef.current.value);
      console.log("completed login, going to verify");

      //               await verifyUser();
      history.push("/dashboard");
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  }

  return (
    <div className="login">
      <h1 className="login-header">OWRKS</h1>
      <form onSubmit={handleSubmit}>
        <h2 className="loginform-header">Admin Login</h2>
        <div className="alert-danger">{error && error}</div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <div className="forminputcontainer">
            <input
              name="email"
              className="forminput"
              id="email"
              aria-describedby="email"
              type="email"
              placeholder="Enter email"
              ref={emailRef}
            />
          </div>
          <label htmlFor="password">Password</label>
          <div className="forminputcontainer">
            <input
              type="password"
              name="password"
              className="forminput"
              id="password"
              placeholder="Password"
              ref={passwordRef}
            />
          </div>
          <div className="forminputcontainer">
            <button type="submit" disabled={loading} className="formbutton">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
