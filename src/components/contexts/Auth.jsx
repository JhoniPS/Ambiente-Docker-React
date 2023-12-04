import React, { useState, createContext, useContext } from "react";
import api from "../../services/api";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [userType, setUserType] = useState("")
  const [error, setError] = useState(false)
  const [messageErrors, setMessageErrors] = useState([]);

  const navigate = useNavigate();

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
        setMessageErrors("E-mail ou senha incorretos.");
      }
    }
  }

  const logout = async () => {
    await api.post('users/logout');
    Cookies.remove('authToken', { secure: true, sameSite: 'Strict' });
    Cookies.remove('userType');
    setUserType(null);
    navigate("/");
  };

  const deleteTypeUser = async ({ id }) => {
    try {
      await api.delete(`/type-user/${id}`);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <AuthContext.Provider
      value={
        {
          //token,
          userType,
          setUserType,
          error,
          messageErrors,
          login,
          logout,
          deleteTypeUser,
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