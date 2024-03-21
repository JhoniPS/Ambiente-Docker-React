import React, { Fragment } from 'react';
import useAuthContext from '../../contexts/Auth';
import MenuAppBar from '../../layout/AppBar/MenuAppBar';
import { useLocation } from 'react-router-dom';
import { CAvatar, CCard, CCardBody } from '@coreui/react';
import img from '../../../img/BrasãoUfopa.png';

const Perfil = () => {
    const { user } = useAuthContext();

    const location = useLocation();
    const backPage = location.pathname.replace("/profile", '');

    return (
        <Fragment>
            <MenuAppBar backStep={backPage} />

            <div className="d-flex flex-column p-4 gap-4 h-100">

                <CCard className='min-vh-50'>
                    <CCardBody className='d-flex align-items-center gap-4'>
                        <CAvatar color="secondary" size="xl" src={img} />
                        <div>
                            <h4 className="mb-3">{user.name}</h4>
                            <p className="mb-1"><strong>E-mail: </strong>{user.email}</p>
                            <p className="mb-1"><strong>Tipo de usuário: </strong>{user.type_user}</p>
                        </div>
                    </CCardBody>
                </CCard>
            </div>
        </Fragment>
    );
}

export default Perfil;
