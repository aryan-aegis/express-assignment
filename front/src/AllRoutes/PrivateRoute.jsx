import { Navigate } from "react-router-dom";

export function PrivateRoute({children}){
    return (true? children : <Navigate to="/register"/>)
}