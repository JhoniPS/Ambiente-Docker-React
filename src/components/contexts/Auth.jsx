import React, { useState, createContext, useContext } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
//import Cookies from 'js-cookie'

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false)
  const [messageErrors, setMessageErrors] = useState([]);
  const navigate = useNavigate();

  const login = async ({ ...data }) => {
    try {
      const response = await api.post('/login', data)

      const { token, type_user } = response.data;

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
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