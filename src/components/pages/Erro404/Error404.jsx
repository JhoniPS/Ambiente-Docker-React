import React from 'react';
import style from './Error404.module.css'; // Importe seu arquivo CSS personalizado

const Error404 = ({ isPermissionDenied }) => {
    return (
        <div className={style.error_container}>
            <div className={style.error_content}>
                <h1 className={style.error_title}>Error 404</h1>
                {isPermissionDenied ? (
                    <p className={style.error_message}>Você não tem permissão para acessar esta página.</p>
                ) : (
                    <p className={style.error_message}>A página que você está procurando não existe.</p>
                )}
            </div>
        </div>
    );
};

export default Error404;
