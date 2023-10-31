import React, { useState } from 'react';
import useAuthContext from '../../contexts/Auth';

import { FormControl, FormHelperText, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';

import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import styles from './Login.module.css'
import img from '../../../img/BrasãoUfopa.png'


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const { login, error, messageErrors } = useAuthContext();

    const handleLogin = async (e) => {
        e.preventDefault();
        await login({ email, password });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin(e);
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className={styles.login}>
            <section>
                <img src={img} alt='Logo da UFOPA' />
                <h4>Documentos e Comissões</h4>
                <h5>Seja bem vindo(a)!</h5>
                <p>Digite seu e-mail institucional e a senha para realizar o login.</p>
                <form className={styles.Form} onSubmit={handleLogin}>
                    <FormControl focused sx={{ width: 350 }}>
                        <InputLabel htmlFor="outlined-adornment-password">E-mail</InputLabel>
                        <OutlinedInput
                            type='e-mail'
                            label="E-mail"
                            name='email'
                            autoComplete="On"
                            placeholder='Digite seu e-mail'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <FormHelperText error={error}>
                            {messageErrors.email || messageErrors}
                        </FormHelperText>
                    </FormControl>

                    <FormControl focused sx={{ width: 350 }} >
                        <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                        <OutlinedInput
                            type={showPassword ? 'text' : 'password'}
                            label="Senha"
                            name='password'
                            autoComplete="On"
                            placeholder='Digite sua senha'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            autoFocus
                            margin='dense'
                            onKeyDown={handleKeyDown}
                        />
                        <FormHelperText error={error}>
                            {messageErrors.password || messageErrors}
                        </FormHelperText>
                    </FormControl>

                    <SubmitButton text="Entrar na conta" to="/home" />
                </form>
            </section>
        </div >
    );
};

export default Login;