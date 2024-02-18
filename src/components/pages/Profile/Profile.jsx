import React, { Fragment,useState } from 'react';
import useAuthContext from '../../contexts/Auth';
import MenuAppBar from '../../layout/AppBar/MenuAppBar';
import { useLocation } from 'react-router-dom';
import { CAvatar, CCard, CCardBody } from '@coreui/react';
import img from '../../../img/BrasãoUfopa.png'

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
            <div className="d-flex flex-column p-4 gap-4 h-100">
                <CCard className='min-vh-50'>
                    <CCardBody>
                        <CAvatar color="secondary" size="xl" src={img} />
                        <h5>{user.name}</h5>
                        <p>{user.email}</p>
                    </CCardBody>
                </CCard>
            </div>
        </Fragment>
    );
}

export default Perfil;