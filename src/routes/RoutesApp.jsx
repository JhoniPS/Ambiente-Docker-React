import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';

import { AuthProvider } from "../components/contexts/Auth";

import Error404 from "../components/pages/Erro404/Error404";
import Login from "../components/pages/Login/Login";
import Admin from "../components/pages/Home/Admin";
import Manager from "../components/pages/Home/Manager";
import Representative from "../components/pages/Home/Representative";

import Profile from "../components/pages/Profile/Profile";
import SignUser from "../components/pages/SignUser/SignUser";
import SignGroups from "../components/pages/SignGroups/SignGroups";
import SignMember from "../components/pages/SignMember/SignMember";
import SignTypeUser from "../components/pages/SignTypeUser/SignTypeUser";

import OverviewGroupGerente from "../components/pages/OverviewGroupGerente/OverviewGroupGerente";
import OverviewGroupRepresentante from "../components/pages/OverviewGroupRepresentante/OverviewGroupRepresentante"
import OverviewGroupVisualizador from "../components/pages/OverviewGroupVisualizador/OverviewGroupVisualizador";
import GroupsVisualizador from "../components/pages/GroupsVisualizador/GroupsVisualizador";

import Documents from "../components/pages/Documents/Documents";
import HistoricoReuniao from "../components/pages/HistoricoReuniao/HistoricoReuniao";
import Notas from "../components/pages/Notas/Notas";
import Activity from "../components/pages/Atividades/Activity";

const PrivateRoute = ({ children, requiredUserType }) => {
    const isAuthenticated = Cookies.get('authToken');
    const userType = Cookies.get('userType');
    const { pathname } = useLocation();

    if (pathname === '/profile') {
        return isAuthenticated ? children : <Navigate to="/Error404" />;
    }

    return isAuthenticated && userType === requiredUserType ? (
        children
    ) : (
        <Navigate to="/Error404" />
    );
};

const routes = [
    /* Acesso Geral */
    { path: '/', element: <Login /> },
    { path: '/Error404', element: <Error404 /> },
    { path: '/signUser', element: <SignUser /> },

    /* Administrador */
    { path: '/profile', element: <PrivateRoute requiredUserType="administrador"><Profile /></PrivateRoute> },
    { path: '/administrador', element: <PrivateRoute requiredUserType="administrador"><Admin /></PrivateRoute> },
    { path: '/administrador-novo-tipo', element: <PrivateRoute requiredUserType="administrador"><SignTypeUser /></PrivateRoute> },

    /* Gerente */
    { path: '/gerente', element: <PrivateRoute requiredUserType="gerente"><Manager /></PrivateRoute> },
    { path: '/gerente-cadastrar-grupo', element: <PrivateRoute requiredUserType="gerente"><SignGroups /></PrivateRoute> },
    { path: '/gerente-detalhes-de-grupos/:id', element: <PrivateRoute requiredUserType="gerente"><OverviewGroupGerente /></PrivateRoute> },
    { path: '/gerente-detalhes-de-grupos/:id/documentos', element: <PrivateRoute requiredUserType="gerente"><Documents /></PrivateRoute> },
    { path: '/gerente-detalhes-de-grupos/:id/notas', element: <PrivateRoute requiredUserType="gerente"><Notas /></PrivateRoute> },
    { path: '/gerente-detalhes-de-grupos/:id/historico-de-reunioes', element: <PrivateRoute requiredUserType="gerente"><HistoricoReuniao /></PrivateRoute> },
    { path: '/gerente-detalhes-de-grupos/:id/atividades', element: <PrivateRoute requiredUserType="gerente"><Activity /></PrivateRoute> },

    /* Representante */
    { path: '/representante', element: <PrivateRoute requiredUserType="representante"><Representative /></PrivateRoute> },
    { path: '/representante-detalhes-de-grupos/:id', element: <PrivateRoute requiredUserType="representante"><OverviewGroupRepresentante /></PrivateRoute> },
    { path: '/representante-detalhes-de-grupos/:id/notas', element: <PrivateRoute requiredUserType="representante"><Notas /></PrivateRoute> },
    { path: '/representante-detalhes-de-grupos/:id/documentos', element: <PrivateRoute requiredUserType="representante"><Documents /></PrivateRoute> },
    { path: '/representante-detalhes-de-grupos/:id/adicionar-membro', element: <PrivateRoute requiredUserType="representante"><SignMember /></PrivateRoute> },
    { path: '/representante-detalhes-de-grupos/:id/historico-de-reunioes', element: <PrivateRoute requiredUserType="representante"><HistoricoReuniao /></PrivateRoute> },
    { path: '/representante-detalhes-de-grupos/:id/atividades', element: <PrivateRoute requiredUserType="representante"><Activity /></PrivateRoute> },

    /* Visualizador */
    { path: '/visualizador', element: <PrivateRoute requiredUserType="visualizador"><GroupsVisualizador /></PrivateRoute> },
    { path: '/visualizador-detalhes-de-grupos/:id', element: <PrivateRoute requiredUserType="visualizador"><OverviewGroupVisualizador /></PrivateRoute> },
    { path: '/visualizador-detalhes-de-grupos/:id/notas', element: <PrivateRoute requiredUserType="visualizador"><Notas /></PrivateRoute> },
    { path: '/visualizador-detalhes-de-grupos/:id/documentos', element: <PrivateRoute requiredUserType="visualizador"><Documents /></PrivateRoute> },
    { path: '/visualizador-detalhes-de-grupos/:id/historico-de-reunioes', element: <PrivateRoute requiredUserType="visualizador"><HistoricoReuniao /></PrivateRoute> },
    { path: '/visualizador-detalhes-de-grupos/:id/atividades', element: <PrivateRoute requiredUserType="visualizador"><Activity /></PrivateRoute> },
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
