
import styles from '../formLogin/Form.module.css'
import Input from '../layout/Input'
import SubmitButton from '../layout/SubmitButton';

import React, { useState, useContext } from 'react';

import { AuthContext } from '../contexts/Auth';

const Form = () => {
    const { authenticated, login } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("submit", { email, password });
        login(email, password);
    };

    return (
        <form className={styles.Form} onSubmit={handleSubmit}>
            <Input
                type="e-mail"
                text="E-mail"
                name="name"
                placeholder="Digite no e-mail"
                value={email}
                OnChange={(e) => setEmail(e.target.value)}
            />
            <Input
                type="password"
                text="Senha"
                placeholder="Digite a senha"
                value={password}
                OnChange={(e) => setPassword(e.target.value)}
            />
            <SubmitButton
                text="Login"
                to="/home"
            />

            <p>{String(authenticated)}</p>
        </form>
    );
};

export default Form;