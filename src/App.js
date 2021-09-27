import React from "react";
import "./App.css";
import AuthRoutes from "./components/routes";
import Login from "./components/login";
export default function App() {
  return (
    <div className="App">
      <AuthRoutes>
        <Login />
      </AuthRoutes>
    </div>
  );
}
