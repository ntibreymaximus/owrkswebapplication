import React from "react";
import "./App.css";
import AuthRoutes from "./components/routes";
import Login from "./components/login";
import { AuthProvider } from "./components/Context/AuthContext";
export default function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AuthRoutes>
          <Login />
        </AuthRoutes>
      </AuthProvider>
    </div>
  );
}
