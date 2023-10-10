import Login from "../components/pages/Login/Login";
import Admin from "../components/pages/Home/Admin";
import Manager from "../components/pages/Home/Manager";
import Representative from "../components/pages/Home/Representative"
import Viewer from "../components/pages/Home/Viewer"
import Signup from "../components/pages/Signup/Signup";
import Profile from "../components/pages/Profile/Profile"
import EditorProfile from "../components/pages/EditorProfile/EditorProfile";
import EditorPassword from "../components/pages/EditorPassword/EditorPassword";
import Users from "../components/pages/Users/Users";
import SignUser from "../components/pages/SignUser/SignUser"
import EditUser from "../components/pages/EditUser/EditUser"
import Groups from "../components/pages/Groups/Groups";
import SignGroups from "../components/pages/SignGroups/SignGroups"
import EditGroup from "../components/pages/EditGroup/EditGroup"
import Representatives from "../components/pages/Representatives/Representatives"
import SignRepresentatives from "../components/pages/SignRepresentative/SignRepresentative"
import EditRepresentative from "../components/pages/EditRepresentative/EditRepresentative"
import TypeUsers from "../components/pages/TypeUsers/TypeUsers";

import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import { AuthProvider } from "../components/contexts/Auth";

const RoutesApp = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route
                        exect path="/login"
                        element={<Login />}
                    />

                    <Route
                        exect path="/"
                        element={<Admin />}
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
                    <Route
                        exect path="/users"
                        element={<Users />}
                    />
                    <Route
                        exect path="/signUser"
                        element={<SignUser />}
                    />
                    <Route
                        exect path="/editUser"
                        element={<EditUser />}
                    />

                    <Route
                        exect path="/groups"
                        element={<Groups />}
                    />
                    <Route
                        exect path="/signGroups"
                        element={<SignGroups />}
                    />
                    <Route
                        exect path="/editGroup"
                        element={<EditGroup />}
                    />

                    <Route
                        exect path="/representantes"
                        element={<Representatives />}
                    />
                    <Route
                        exect path="/signRepresentantes"
                        element={<SignRepresentatives />}
                    />
                    <Route
                        exect path="/editRepresentante"
                        element={<EditRepresentative />}
                    />

                    <Route
                        exect path="/Tipos-de-Usuarios"
                        element={<TypeUsers />}
                    />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default RoutesApp;