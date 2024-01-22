import React, { useState, createContext, useContext } from "react";
import Cookies from 'js-cookie'
import api from "../../services/api";

import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [userType, setUserType] = useState("")
  const [error, setError] = useState(false)
  const [messageErrors, setMessageErrors] = useState([]);

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const navigate = useNavigate();

  const login = async ({ ...data }) => {
    try {
      const response = await api.post('login', data)
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

  const sigaaLogin = async () => {
    try {
      const response = await api.get('redirect');

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await api.post('users/logout');
      Cookies.remove('authToken', { secure: true, sameSite: 'Strict' });
      Cookies.remove('userType');
      setUserType(null);
      navigate("/");
    } catch (error) {
      console.log(error.response);
    }
  };

  //teste
  const api_token = '2dacb2db-4206-45d1-a060-e6c4c000c68c';

  const logoutSIGAA = async () => {
    try {
      await api.post('users/logout-ufopa', {
        headers: {
          'token': { api_token }
        }
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <AuthContext.Provider
      value={
        {
          userType,
          setUserType,
          error,
          messageErrors,
          login,
          sigaaLogin,
          logout,
          logoutSIGAA,
          message,
          messageType,
          showMessage,
          setMessage,
          setMessageType,
          setShowMessage
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