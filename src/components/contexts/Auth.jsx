import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = localStorage.getItem('user');

    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }

    setLoading(false);
  }, []);

  const login = (email, password) => {
    console.log("login auth: ", { email, password });

    //Substituir pela API
    const loggedUser = {
      id: '123',
      email,
    };

    localStorage.setItem("user", JSON.stringify(loggedUser));

    if (password === "secret" && email === "jhonisilva500@gmail.com") {
      setUser({ loggedUser }) // Substituir pelo banco
      navigate("/");
    } else {
      alert("Senha ou E-mail está incorreto");
    }
  };

  const signup = (name, email, authEmail, password, office) => {
    const registeredUser = {
      name,
      email,
      authEmail,
      password,
      office
    };

    if (email !== authEmail)
      alert("Erro de confirmação do e-mail");
    else
      console.log("Signup auth: ", { registeredUser });
  }

  const logout = () => {
    console.log("logout")
    localStorage.removeItem('user');
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};