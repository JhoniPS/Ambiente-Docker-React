import React, { useState, createContext, useContext, useEffect } from "react";
import Cookies from 'js-cookie';
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [codeCallback, setCodeCallback] = useState(null);

  const [user, setUser] = useState(() => {
    // Tentar obter o usuário armazenado no localStorage
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [error, setError] = useState(false);
  const [messageErrors, setMessageErrors] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const loginSigaa = async () => {
      if (codeCallback !== null) {
        try {
          const response = await api.get(`callback?code=${codeCallback}`);
          const { api_token, name, type_user, email, url_photo } = response.data;

          Cookies.set('sigaa_token', api_token.api_token, { expires: 7, secure: true, sameSite: 'Strict' });

          const newUser = { name, email, type_user: type_user.name, photo: url_photo };
          setUser(newUser);

          localStorage.setItem('user', JSON.stringify(newUser));

          handleUserTypeNavigation(type_user.name, email);
        } catch (error) {
          setError(true);
          setMessage(`${error.response.data.errors.error_description}`);
          setMessageType('error');
          setShowMessage(true);
        }
      }
    };

    loginSigaa();
  }, [codeCallback, navigate]);

  const handleUserTypeNavigation = (userType, email) => {
    const routes = {
      administrador: '/administrador',
      gerente: '/gerente',
      representante: '/representante',
      visualizador: '/visualizador',
    };

    const route = routes[userType];
    if (route) {
      navigate(route);
      Cookies.set('userType', userType);
      if (userType === 'representante') {
        Cookies.set('representante', email);
      }
    } else {
      logout();
    }
  };

  const login = async (data) => {
    try {
      const response = await api.post('login', data);
      const { token, name, type_user, email, url_photo } = response.data;

      Cookies.set('authToken', token, { expires: 7, secure: true, sameSite: 'Strict' });

      // Atualizar o estado do usuário
      const newUser = { name, email, type_user: type_user.name, photo: url_photo };
      setUser(newUser);

      // Salvar o usuário no localStorage
      localStorage.setItem('user', JSON.stringify(newUser));

      handleUserTypeNavigation(type_user.name, email);
    } catch (e) {
      handleLoginError(e);
    }
  };

  const handleLoginError = (e) => {
    if (e.response.status === 422) {
      setError(true);
      setMessageErrors(e.response.data.errors);
    } else if (e.response.status === 401) {
      setError(true);
      setMessage(`${e.response.data.errors}`);
      setMessageType('error');
      setShowMessage(true);
    }
  };

  const logout = async () => {
    try {
      await api.post('users/logout');
      handleLogoutCleanup();
    } catch (error) {
      setError(true);
      setMessage(`${error.response.data.message}`);
      setMessageType('error');
      setShowMessage(true);
    }
  };

  const logoutSIGAA = async () => {
    try {
      await api.post('users/logout-ufopa');
      handleLogoutCleanup();
    } catch (error) {
      setError(true);
      setMessage(`${error.response.data.message}`);
      setMessageType('error');
      setShowMessage(true);
    }
  };

  const handleLogoutCleanup = () => {
    Cookies.remove('authToken', { secure: true, sameSite: 'Strict' });
    Cookies.remove('sigaa_token', { secure: true, sameSite: 'Strict' });
    Cookies.remove('userType');
    Cookies.remove('representante');

    setUser(null);
    localStorage.removeItem('user');

    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        setError,
        messageErrors,
        setMessageErrors,
        login,
        logout,
        logoutSIGAA,
        message,
        messageType,
        showMessage,
        setMessage,
        setMessageType,
        setShowMessage,
        setCodeCallback,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
