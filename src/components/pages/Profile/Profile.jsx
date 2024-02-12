import React, { Fragment, useEffect, useState } from 'react';
import api from '../../../services/api';

import useAuthContext from '../../contexts/Auth';
import MenuAppBar from '../../layout/AppBar/MenuAppBar';
import { Avatar } from '@mui/material';
import styles from './Profile.module.css'
import LinkButton from '../../layout/linkbutton/LinkButton';
import { useLocation } from 'react-router-dom';

const Perfil = () => {
    const [user, setUser] = useState({
        foto: "foto.png",
        name: "nome exemplo",
        email: "teste@teste.com"
    });

    const location = useLocation();
    const backPage = location.pathname.replace("/profile", '');

    return (
        <Fragment>
            <MenuAppBar backStep={backPage} />
            <div className={styles.profile}>
                <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 200, height: 200 }}
                />
                <h5>{user.name}</h5>
                <p>{user.email}</p>
                <section>
                    <LinkButton text="Editar Perfil" customClass="perfil" />
                    <LinkButton text="Alterar Senha" customClass="editar_senha" />
                </section>
            </div>
        </Fragment>
    );
}

export default Perfil;