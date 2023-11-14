import React, { useState, createContext, useContext, useEffect } from "react";
import api from "../../services/api";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState("")
  const [error, setError] = useState(false)
  const [messageErrors, setMessageErrors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      const authToken = Cookies.get('authToken');
      const storedUserType = Cookies.get('userType');

      if (authToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
        setToken(authToken);
        setUserType(storedUserType);
      }
    };

    checkAuthentication();
  }, []);

  const login = async ({ ...data }) => {
    try {
      const response = await api.post('/login', data)
      const { token, type_user } = response.data;
      Cookies.set('authToken', token, { expires: 7, secure: true, sameSite: 'Strict' }); // Armazene o token nos cookies

      switch (type_user.name) {
        case 'administrador':
          navigate('/administrador');
          Cookies.set('userType', type_user.name);
          break;
        case 'gerente':
          navigate('/gerente');
          Cookies.set('userType', type_user.name);
          break;
        case 'representante':
          navigate('/representante');
          Cookies.set('userType', type_user.name);
          break;
        case 'visualizador':
          navigate('/visualizador');
          Cookies.set('userType', type_user.name);
          break;
        default:
          logout();
      }

    } catch (e) {
      if (e.response.status === 422) {
        setError(true);
        setMessageErrors(e.response.data.errors)
      } else if (e.response.status === 401) {
        setError(true);
        setMessageErrors("E-mail ou senha incorretos!!!");
        logout();
      }
    }
  }

  const logout = async () => {
    await api.post('users/logout');
    Cookies.remove('authToken', { secure: true, sameSite: 'Strict' });
    Cookies.remove('userType');
    setToken(null);
    setUserType("");
    navigate("/");
  };

  const newTypeUser = async ({ ...name }) => {
    try {
      await api.post('/type-user', name);
    } catch (e) {
      console.log(e);
    }
  }

  const deleteTypeUser = async ({ id }) => {
    try {
      await api.delete(`/type-user/${id}`);
    } catch (e) {
      console.log(e);
    }
  }

  const deleteUser = async ({ id }) => {
    try {
      await api.delete(`users/${id}`);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <AuthContext.Provider
      value={
        {
          token,
          userType,
          setUserType,
          error,
          messageErrors,
          login,
          logout,
          newTypeUser,
          deleteTypeUser,
          deleteUser,
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