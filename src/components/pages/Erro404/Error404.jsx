import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Error404.module.css'; // Importe seu arquivo CSS personalizado

const Error404 = ({ isPermissionDenied }) => {
    const navigate = useNavigate();

    return (
        <Fragment>
            <div className={style.error_container}>
                <div className={style.error_content}>
                    <h1 className={style.error_title}>Error 404</h1>
                    {isPermissionDenied ? (
                        <p className={style.error_message}>Você não tem permissão para acessar esta página.</p>
                    ) : (
                        <p className={style.error_message}>A página que você está procurando não existe.</p>
                    )}
                    <a href="/" onClick={(e) => { e.preventDefault(); navigate('/') }} target="_blank" rel="noopener noreferrer">
                        Esqueci minha senha
                    </a>
                </div>
            </div>
        </Fragment>
    );
};

export default Error404;
