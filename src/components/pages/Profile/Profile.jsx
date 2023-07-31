import React, { Fragment } from 'react';
import MenuAppBar from '../../layout/AppBar/MenuAppBar';
import { Avatar } from '@mui/material';

import styles from './Profile.module.css'
import LinkButton from '../../layout/linkbutton/LinkButton';

const Perfil = () => {
    return (
        <Fragment>
            <MenuAppBar />
            <div className={styles.profile}>
                <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 200, height: 200 }}
                />
                <h5>Jhonicley Pereira Da Silva</h5>
                <p>teste@teste@discente.com.br</p>
                <section>
                    <LinkButton text="Editar Perfil" customClass="perfil" to="/editorProfile"/>
                    <LinkButton text="Alterar Senha" customClass="editar_senha" to="/updatePassword" />
                </section>
            </div>
        </Fragment>
    );
}

export default Perfil;