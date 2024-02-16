import React, { useState, createContext, useContext, useEffect } from "react";
import Cookies from 'js-cookie';
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [userType, setUserType] = useState("");
  const [codeCallback, setCodeCallback] = useState(null);
  const [error, setError] = useState(false);

  const [messageErrors, setMessageErrors] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (codeCallback !== null) {
      const loginSigaa = async () => {
        try {
          const response = await api.get(`callback?code=${codeCallback}`);
          const { api_token, type_user, email } = response.data;

          Cookies.set('authToken', api_token.api_token, { expires: 7, secure: true, sameSite: 'Strict' });

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
              Cookies.set('representante', email)
              break;
            case 'visualizador':
              navigate('/visualizador');
              Cookies.set('userType', type_user.name);
              break;
            default:
              logout(api_token);
          }
        } catch (error) {
          console.log(error);
        }
      };

      loginSigaa();
    }
  }, [codeCallback]);

  const login = async ({ ...data }) => {
    try {
      const response = await api.post('login', data);
      const { token, type_user, email } = response.data;

      Cookies.set('authToken', token, { expires: 7, secure: true, sameSite: 'Strict' });

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
          Cookies.set('representante', email)
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
        setMessageErrors(e.response.data.errors);
      } else if (e.response.status === 401) {
        setError(true);
        setMessage(`${e.response.data.errors}`);
        setMessageType('error');
        setShowMessage(true);
      }
    }
  };

  const logout = async () => {
    try {
      await api.post('users/logout');
      Cookies.remove('authToken', { secure: true, sameSite: 'Strict' });
      Cookies.remove('userType');
      Cookies.remove('representante');
      setUserType(null);
      navigate("/");
    } catch (error) {
      console.log(error.response);
    }
  };

  //teste
  const api_token = '571e99cc-f68b-492f-ad12-507ef4b4e112';

  const logoutSIGAA = async () => {
    try {
      await api.post('users/logout-ufopa', {}, {
        headers: {
          'Token': api_token
        }
      });

      Cookies.remove('authToken', { secure: true, sameSite: 'Strict' });
      Cookies.remove('userType');
      Cookies.remove('representante');
      setUserType(null);
      navigate("/");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userType,
        setUserType,

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
