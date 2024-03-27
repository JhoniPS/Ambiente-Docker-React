import React, { Fragment, useEffect, useState } from 'react'
import { useLocation, useParams } from "react-router-dom";
import useAuthContext from '../../contexts/Auth';
import api from '../../../services/api';
import Cookies from 'js-cookie'

import Message from '../../layout/Message/Message';
import TableDocumentos from '../../TableDocumentos/TableDocumentos';
import AddDocuments from '../../Modals/modal_sign_document/AddDocuments';
import MenuAppBar from '../../layout/AppBar/MenuAppBar';

import { CCard, CCardBody } from '@coreui/react';

function Documents() {
    const { id } = useParams();
    const [data, setData] = useState([]);

    const {
        message,
        messageType,
        showMessage,
        setShowMessage,
        setError,
        setMessage,
        setMessageType
    } = useAuthContext();
    const location = useLocation();
    const backPage = location.pathname.replace("/documentos", '');
    const userRole = Cookies.get('userType');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await api.get(`groups/${id}/documents`);
                setData(data)
            } catch (error) {
                setError(true);
                setMessage(`${error.response.data.errors}`);
                setMessageType('error');
                setShowMessage(true);
            }
        }
        fetchData();
    }, [id, setError, setMessageType, setMessage, setShowMessage]);

    return (
        <Fragment>
            <MenuAppBar backStep={backPage} />
            <div className="d-flex flex-column p-4 gap-2 h-100">
                <CCard>
                    <CCardBody>
                        <section className="d-flex align-items-start gap-2 mb-2">
                            <h2>Documentos</h2>
                            {
                                userRole === 'representante' &&
                                <section className="d-flex align-items-start ms-auto p-0 bd-highligh">
                                    <AddDocuments data={data} setData={setData} />
                                </section>
                            }
                        </section>
                        <TableDocumentos data={data} setData={setData} />
                    </CCardBody>
                </CCard>
                {showMessage && <Message type={messageType} msg={message} setShowMessage={setShowMessage} />}
            </div>
        </Fragment>
    );
}

export default Documents;