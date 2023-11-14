import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import GroupsGerente from "../components/pages/GroupsGerente/GroupsGerente";
import GroupsRepresentante from '../components/pages/GroupsRepresentante/GroupsRepresentante'
import SignGroups from "../components/pages/SignGroups/SignGroups";
import OverviewGroup from "../components/pages/OverviewGroup/OverviewGroup";
import SignRepresentatives from "../components/pages/SignRepresentative/SignRepresentative";
import SignTypeUser from "../components/pages/SignTypeUser/SignTypeUser";
import TypeUsers from "../components/pages/TypeUsers/TypeUsers";

const PrivateRoute = ({ children, requiredUserType }) => {
    const isAuthenticated = Cookies.get('authToken');
    const userType = Cookies.get('userType');
    const { pathname } = useLocation();

    if (pathname === '/profile') {
        return isAuthenticated ? children : <Error404 isPermissionDenied={userType} />;
    }

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
                        exact path="/gerente"
                        element={
                            <PrivateRoute requiredUserType={["gerente"]}>
                                <Manager />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        exact path="/representante"
                        element={
                            <PrivateRoute requiredUserType={["representante"]}>
                                <Representative />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        exact path="/visualizador"
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
                            <PrivateRoute requiredUserType={["administrador"]}>
                                <Profile />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        exact path="/editorProfile"
                        element={
                            <PrivateRoute requiredUserType={["administrador"]}>
                                <EditorProfile />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        exact path="/updatePassword"
                        element={
                            <PrivateRoute requiredUserType={["administrador"]}>
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
                        exact path="/groups-gerente"
                        element={
                            <PrivateRoute requiredUserType={["gerente"]}>
                                <GroupsGerente />
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
                        exact path="/detalhes-de-grupos/:id"
                        element={
                            <PrivateRoute requiredUserType={["gerente"]}>
                                <OverviewGroup />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        exact path="/groups-representante"
                        element={
                            <PrivateRoute requiredUserType={["representante"]}>
                                <GroupsRepresentante />
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
