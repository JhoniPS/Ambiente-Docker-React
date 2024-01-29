import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, useLocation, useParams } from "react-router-dom";
import api from '../../../services/api';
import Cookies from 'js-cookie'

import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import Message from '../../layout/Message/Message';
import TableDocumentos from '../../TableDocumentos/TableDocumentos';
import AddDocuments from '../../Modals/modal_sign_document/AddDocuments';
import MenuAppBar from '../../layout/AppBar/MenuAppBar';

import { CCard, CCardBody } from '@coreui/react';

function Documents() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [sortOrder, setSortOrder] = useState("desc");

    const navigate = useNavigate();
    const location = useLocation();
    const backPage = location.pathname.replace("/documentos", '');
    const userRole = Cookies.get('userType');

    const sortDocs = () => {
        return [...data].sort((a, b) => {
            if (sortOrder === "desc") {
                return new Date(b.created_at) - new Date(a.created_at);
            } else {
                return new Date(a.created_at) - new Date(b.created_at);
            }
        });
    };

    useEffect(() => {
        const handlePopstate = () => {
            // Use o hook navigate para redirecionar para a rota desejada
            navigate(`/detalhes-de-grupos-gerente/${id}/`);
        };

        // Adicione um event listener ao evento popstate
        window.addEventListener('popstate', handlePopstate);

        return () => {
            // Remova o event listener ao desmontar o componente
            window.removeEventListener('popstate', handlePopstate);
        };
    }, [id, navigate]);

    useEffect(() => {
        if (location.state) {
            setMessage(location.state.message);
            setMessageType(location.state.messageType);
            setShowMessage(location.state.showMessage);
        };
    }, [location.state]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await api.get(`group/${id}/documents`);
                setData(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [id]);

    return (
        <Fragment>
            <MenuAppBar backStep={backPage} />
            <div className="d-flex flex-column p-4 gap-2 h-100">
                <CCard>
                    <CCardBody>
                        <h2>Documentos</h2>

                        {
                            userRole === 'representante' &&
                            <section className="d-flex align-items-start gap-4">
                                <AddDocuments data={data} setData={setData} />
                            </section>
                        }

                        <h4>FILTROS RÁPIDOS</h4>
                        <section className="d-flex align-items-start gap-2 mb-4">
                            <SubmitButton
                                text="Mais Recentes"
                                customClass="button_filtes_bar"
                                onClick={() => setSortOrder("desc")}
                            />
                            <SubmitButton
                                text="Mais Antigos"
                                customClass="button_filtes_bar"
                                onClick={() => setSortOrder("asc")}
                            />
                        </section>
                        <TableDocumentos data={sortDocs()} setData={setData} />
                    </CCardBody>
                </CCard>
                {showMessage && <Message type={messageType} msg={message} setShowMessage={setShowMessage} />}
            </div>
        </Fragment>
    );
}

export default Documents;