import { Navigate } from "react-router-dom";
import { authAPI } from "../services/authAPI";

const PrivateRoute = ({ children }) => {
  if (!authAPI.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;
