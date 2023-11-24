import React, { Fragment, useEffect, useState } from 'react';
import api from '../../../services/api';
import useAuthContext from '../../contexts/Auth';
import MenuAppBar from '../../layout/AppBar/MenuAppBar';
import { Avatar } from '@mui/material';
import styles from './Profile.module.css'
import LinkButton from '../../layout/linkbutton/LinkButton';

const Perfil = () => {
    const { token } = useAuthContext();
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get(`users/${2}`);
            setUser(response.data.data);
        }

        fetchData();
    }, [token])

    return (
        <Fragment>
            <MenuAppBar />
            <div className={styles.profile}>
                <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 200, height: 200 }}
                />
                <h5>{user.name}</h5>
                <p>{user.email}</p>
                <section>
                    <LinkButton text="Editar Perfil" customClass="perfil" to="/editorProfile" />
                    <LinkButton text="Alterar Senha" customClass="editar_senha" to="/updatePassword" />
                </section>
            </div>
        </Fragment>
    );
}

export default Perfil;