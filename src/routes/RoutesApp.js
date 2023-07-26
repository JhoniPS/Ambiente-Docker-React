import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Login from "../components/pages/Login/Login";
import Admin from "../components/pages/Home/Admin";
import Manager from "../components/pages/Home/Manager";
import Representative from "../components/pages/Home/Representative"
import Viewer from "../components/pages/Home/Viewer"
import Signup from "../components/pages/Signup/Signup";
import Profile from "../components/pages/Profile/Profile"
import EditorProfile from "../components/pages/EditorProfile/EditorProfile";
import EditorPassword from "../components/pages/EditorPassword/EditorPassword";

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
                                <Admin />
                            </Private>
                        }
                    />
                    <Route
                        exect path="/manager"
                        element={<Manager />}
                    />
                    <Route
                        exect path="/representative"
                        element={<Representative />}
                    />
                    <Route
                        exect path="/viewer"
                        element={<Viewer />}
                    />
                    <Route
                        exect path="/login"
                        element={<Login />}
                    />
                    <Route
                        exect path="/signup"
                        element={<Signup />}
                    />
                    <Route
                        exect path="/profile"
                        element={<Profile />}
                    />
                    <Route
                        exect path="/editorProfile"
                        element={<EditorProfile />}
                    />
                    <Route
                        exect path="/updatePassword"
                        element={<EditorPassword />}
                    />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default RoutesApp;