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
        setMessage(`Email ou senha incorretos`);
        setMessageType('error');
        setShowMessage(true);
      } else if (e.response.status === 401) {
        setError(true);
        setMessageErrors("E-mail ou senha incorretos.");
      }
    }
  }

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
  const api_token = '4c452a5d-4137-4ac5-88e1-128fd19d88e0';

  const logoutSIGAA = async () => {
    try {
      await api.post('users/logout-ufopa', {}, {
        headers: {
          'token': api_token
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