import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';

import { AuthProvider } from "../components/contexts/Auth";

import Error404 from "../components/pages/Erro404/Error404";
import Login from "../components/pages/Login/Login";
import TypeUsers from "../components/pages/TypeUsers/TypeUsers";

import Admin from "../components/pages/Home/Admin";
import Manager from "../components/pages/Home/Manager";
import Representative from "../components/pages/Home/Representative";
import Viewer from "../components/pages/Home/Viewer";

import Profile from "../components/pages/Profile/Profile";
import Users from "../components/pages/Users/Users";

import GroupsGerente from "../components/pages/GroupsGerente/GroupsGerente";
import GroupsRepresentante from '../components/pages/GroupsRepresentante/GroupsRepresentante'

import SignUser from "../components/pages/SignUser/SignUser";
import SignGroups from "../components/pages/SignGroups/SignGroups";
import SignMember from "../components/pages/SignMember/SignMember";
import SignRepresentatives from "../components/pages/SignRepresentative/SignRepresentative";
import SignTypeUser from "../components/pages/SignTypeUser/SignTypeUser";

import OverviewGroupGerente from "../components/pages/OverviewGroupGerente/OverviewGroupGerente";
import OverviewGroupRepresentante from "../components/pages/OverviewGroupRepresentante/OverviewGroupRepresentante"
import OverviewGroupVisualizador from "../components/pages/OverviewGroupVisualizador/OverviewGroupVisualizador";
import GroupsVisualizador from "../components/pages/GroupsVisualizador/GroupsVisualizador";

import Documents from "../components/pages/Documents/Documents";
import HistoricoReuniao from "../components/pages/HistoricoReuniao/HistoricoReuniao";
import Notas from "../components/pages/Notas/Notas";

const PrivateRoute = ({ children, requiredUserType }) => {
    const isAuthenticated = Cookies.get('authToken');
    const userType = Cookies.get('userType');
    const { pathname } = useLocation();

    if (pathname === '/profile') {
        return isAuthenticated ? children : <Navigate to="/Error404" />;
    }

    return isAuthenticated && userType.includes(requiredUserType) ? (
        children
    ) : (
        <Navigate to="/Error404" />
    );
};

const routes = [
    /* Acesso Geral */
    { path: '/', element: <Login /> },
    { path: '/Error404', element: <Error404 /> },

    /* Administrador */
    { path: '/users', element: <PrivateRoute requiredUserType={["administrador"]}><Users /></PrivateRoute> },
    { path: '/profile', element: <PrivateRoute requiredUserType={["administrador"]}><Profile /></PrivateRoute> },
    { path: '/signUser', element: <PrivateRoute requiredUserType={["administrador"]}><SignUser /></PrivateRoute> },
    { path: '/administrador', element: <PrivateRoute requiredUserType={["administrador"]}><Admin /></PrivateRoute> },
    { path: '/Novo-tipo', element: <PrivateRoute requiredUserType={["administrador"]}><SignTypeUser /></PrivateRoute> },
    { path: '/Tipos-de-Usuarios', element: <PrivateRoute requiredUserType={["administrador"]}><TypeUsers /></PrivateRoute> },

    /* Gerente */
    { path: '/gerente', element: <PrivateRoute requiredUserType={["gerente"]}><Manager /></PrivateRoute> },
    { path: '/signRepresentantes', element: <PrivateRoute requiredUserType={["gerente"]}><SignRepresentatives /></PrivateRoute> },
    { path: '/signGroups', element: <PrivateRoute requiredUserType={["gerente"]}><SignGroups /></PrivateRoute> },
    { path: '/groups-gerente', element: <PrivateRoute requiredUserType={["gerente"]}><GroupsGerente /></PrivateRoute> },
    { path: '/detalhes-de-grupos-gerente/:id', element: <PrivateRoute requiredUserType={["gerente"]}><OverviewGroupGerente /></PrivateRoute> },
    { path: '/detalhes-de-grupos-gerente/:id/documentos', element: <PrivateRoute requiredUserType={["gerente"]}><Documents /></PrivateRoute> },
    { path: '/detalhes-de-grupos-gerente/:id/notas', element: <PrivateRoute requiredUserType={["gerente"]}><Notas /></PrivateRoute> },
    { path: '/detalhes-de-grupos-gerente/:id/historico-de-reunioes', element: <PrivateRoute requiredUserType={["gerente"]}><HistoricoReuniao /></PrivateRoute> },

    /* Representante */
    { path: '/representante', element: <PrivateRoute requiredUserType={["representante"]}><Representative /></PrivateRoute> },
    { path: '/groups-representante', element: <PrivateRoute requiredUserType={["representante"]}><GroupsRepresentante /></PrivateRoute> },
    { path: '/detalhes-de-grupos-representante/:id', element: <PrivateRoute requiredUserType={["representante"]}><OverviewGroupRepresentante /></PrivateRoute> },
    { path: '/detalhes-de-grupos-representante/:id/notas', element: <PrivateRoute requiredUserType={["representante"]}><Notas /></PrivateRoute> },
    { path: '/detalhes-de-grupos-representante/:id/documentos', element: <PrivateRoute requiredUserType={["representante"]}><Documents /></PrivateRoute> },
    { path: '/detalhes-de-grupos-representante/:id/adicionar-membro', element: <PrivateRoute requiredUserType={["representante"]}><SignMember /></PrivateRoute> },
    { path: '/detalhes-de-grupos-representante/:id/historico-de-reunioes', element: <PrivateRoute requiredUserType={["representante"]}><HistoricoReuniao /></PrivateRoute> },
    
    /* Visualizador */
    { path: '/visualizador', element: <PrivateRoute requiredUserType={["visualizador"]}><Viewer /></PrivateRoute> },
    { path: '/groups-visualizador', element: <PrivateRoute requiredUserType={["visualizador"]}><GroupsVisualizador /></PrivateRoute> },
    { path: '/detalhes-de-grupos-visualizador/:id', element: <PrivateRoute requiredUserType={["visualizador"]}><OverviewGroupVisualizador /></PrivateRoute> },
    { path: '/detalhes-de-grupos-visualizador/:id/notas', element: <PrivateRoute requiredUserType={["visualizador"]}><Notas /></PrivateRoute> },
    { path: '/detalhes-de-grupos-visualizador/:id/documentos', element: <PrivateRoute requiredUserType={["visualizador"]}><Documents /></PrivateRoute> },
    { path: '/detalhes-de-grupos-visualizador/:id/historico-de-reunioes', element: <PrivateRoute requiredUserType={["visualizador"]}><HistoricoReuniao /></PrivateRoute> },
];

const RoutesApp = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>{routes.map((route, index) => <Route key={index} {...route} />)}</Routes>
            </AuthProvider>
        </Router>
    );
};

export default RoutesApp;
