import React, { useState, createContext, useContext, useEffect } from "react";
import api from "../../services/api";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false)
  const [messageErrors, setMessageErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = Cookies.get('authToken');
    if (authToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      // Você pode fazer uma chamada à API aqui para obter as informações do usuário, se necessário.
      setUser(authToken);
    }
  }, []);

  const login = async ({ ...data }) => {
    try {
      const response = await api.post('/login', data)

      const { token, type_user } = response.data;

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      Cookies.set('authToken', token); // Armazene o token nos cookies
      
      switch (type_user.name) {
        case 'administrador':
          navigate('/');
          break;
        case 'gerente':
          navigate('/manager');
          break;
        case 'representante':
          navigate('/representative');
          break;
        case 'visualizador':
          navigate('/viewer');
          break;
        default:
          navigate('/login'); // Redirecionamento padrão para a login
      }

    } catch (e) {
      if (e.response.status === 422) {
        setError(true);
        setMessageErrors(e.response.data.errors)
      }
    }
  }

  const logout = async() => {
    Cookies.remove('authToken'); // Remova o token dos cookies
    setUser(null);
    await api.post('users/logout');
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={
        {
          user,
          error,
          messageErrors,
          login,
          logout,
        }
      }
    >
      {children}
    </AuthContext.Provider>
  );
};


export default function useAuthContext() {
  return useContext(AuthContext);
}