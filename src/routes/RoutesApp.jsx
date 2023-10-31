import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from 'js-cookie';

import { AuthProvider } from "../components/contexts/Auth";
import Error404 from "../components/pages/Erro404/Error404";
import Login from "../components/pages/Login/Login";
import Admin from "../components/pages/Home/Admin";
import Manager from "../components/pages/Home/Manager";
import Representative from "../components/pages/Home/Representative";
import Viewer from "../components/pages/Home/Viewer";
import Signup from "../components/pages/Signup/Signup";
import Profile from "../components/pages/Profile/Profile";
import EditorProfile from "../components/pages/EditorProfile/EditorProfile";
import EditorPassword from "../components/pages/EditorPassword/EditorPassword";
import Users from "../components/pages/Users/Users";
import SignUser from "../components/pages/SignUser/SignUser";
import Groups from "../components/pages/Groups/Groups";
import SignGroups from "../components/pages/SignGroups/SignGroups";
import EditGroup from "../components/pages/EditGroup/EditGroup";
import Representatives from "../components/pages/Representatives/Representatives";
import SignRepresentatives from "../components/pages/SignRepresentative/SignRepresentative";
import EditRepresentative from "../components/pages/EditRepresentative/EditRepresentative";
import SignTypeUser from "../components/pages/SignTypeUser/SignTypeUser";
import TypeUsers from "../components/pages/TypeUsers/TypeUsers";

const PrivateRoute = ({ children, requiredUserType }) => {
    const isAuthenticated = Cookies.get('authToken');
    const userType = Cookies.get('userType');

    return (isAuthenticated && userType.includes(requiredUserType)) ? children : <Error404 isPermissionDenied={userType} />;
};

const RoutesApp = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path="/" element={<Login />} />

                    <Route
                        exact path="/administrador"
                        element={
                            <PrivateRoute requiredUserType={["administrador"]}>
                                <Admin />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        exact path="/manager"
                        element={
                            <PrivateRoute requiredUserType={["gerente"]}>
                                <Manager />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        exact path="/representative"
                        element={
                            <PrivateRoute requiredUserType={["representante"]}>
                                <Representative />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        exact path="/viewer"
                        element={
                            <PrivateRoute requiredUserType={["visualizador"]}>
                                <Viewer />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        exact path="/signup"
                        element={<Signup />}
                    />
                    <Route
                        exact path="/profile"
                        element={
                            <PrivateRoute requiredUserType={["administrador", "gerente", "representante", "visualizador"]}>
                                <Profile />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        exact path="/editorProfile"
                        element={
                            <PrivateRoute requiredUserType={["administrador", "gerente", "representante", "visualizador"]}>
                                <EditorProfile />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        exact path="/updatePassword"
                        element={
                            <PrivateRoute requiredUserType={["administrador", "gerente", "representante", "visualizador"]}>
                                <EditorPassword />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        exact path="/users"
                        element={
                            <PrivateRoute requiredUserType={["administrador"]}>
                                <Users />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        exact path="/signUser"
                        element={
                            <PrivateRoute requiredUserType={["administrador"]}>
                                <SignUser />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        exact path="/groups"
                        element={
                            <PrivateRoute requiredUserType={["gerente"]}>
                                <Groups />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        exact path="/signGroups"
                        element={
                            <PrivateRoute requiredUserType={["gerente"]}>
                                <SignGroups />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        exact path="/editGroup"
                        element={
                            <PrivateRoute requiredUserType={["gerente"]}>
                                <EditGroup />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        exact path="/representantes"
                        element={
                            <PrivateRoute requiredUserType={["gerente"]}>
                                <Representatives />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        exact path="/signRepresentantes"
                        element={
                            <PrivateRoute requiredUserType={["gerente"]}>
                                <SignRepresentatives />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        exact path="/editRepresentante"
                        element={
                            <PrivateRoute requiredUserType={["gerente"]}>
                                <EditRepresentative />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        exact path="/Tipos-de-Usuarios"
                        element={
                            <PrivateRoute requiredUserType={["administrador"]}>
                                <TypeUsers />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        exact path="/Novo-tipo"
                        element={
                            <PrivateRoute requiredUserType={["administrador"]}>
                                <SignTypeUser />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        exact path="/Error404"
                        element={<Error404 />}
                    />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default RoutesApp;
