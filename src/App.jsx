import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./Authentication/Login";
import SignUp from "./Authentication/SignUp";
import Dashboard from "./Dashboard";
import Products from "./Products";
import Stock from "./Stock";
import Categories from "./Categories";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  // const location = useLocation();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route path="/categories" element={<Categories />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
