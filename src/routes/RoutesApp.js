import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Login from "../components/pages/Login/Login";
import Home from "../components/pages/Home/Home"
import Signup from "../components/pages/Signup/Signup";

import React, { useContext } from "react";
import { AuthProvider, AuthContext } from "../components/contexts/Auth";

const RoutesApp = () => {

    const Private = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext)

        if (loading) {
            return <div className="loading">Carregando...</div>;
        }

        return (!authenticated) ? <Navigate to="/login" /> : children;
    };

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route
                        exect path="/"
                        element={
                            <Private>
                                <Home />
                            </Private>
                        }
                    />
                    <Route
                        exect path="/login"
                        element={<Login />}
                    />
                    <Route
                        exect path="/signup"
                        element={<Signup />}
                    />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default RoutesApp;