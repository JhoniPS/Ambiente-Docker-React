import React, { Fragment, useEffect, useState } from 'react';
import useAuthContext from '../../contexts/Auth';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../../../services/api';

import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import AddNotas from '../../Modals/modal_sign_notas/AddNotas';
import Container from '../../layout/container/Container';
import Message from '../../layout/Message/Message';
import ModalDeleteNota from '../../Modals/modal_delete_notas/ModalDeleteNota';
import ModalEditNota from '../../Modals/modal_edit_notas/ModalEditNota';
import MenuAppBar from '../../layout/AppBar/MenuAppBar';
import { CCallout, CCard, CCardBody, CCardFooter, CCardHeader, CCardText, CCardTitle } from '@coreui/react';

export default function Notas() {
    const { id } = useParams();
    const [notas, setNotas] = useState([]);
    const [sortOrder, setSortOrder] = useState('desc');

    const { message, messageType, showMessage, setShowMessage } = useAuthContext();
    const userRole = Cookies.get('userType');

    const sortDocs = () => {
        return [...notas].sort((a, b) => {
            if (sortOrder === 'desc') {
                return new Date(b.created_at) - new Date(a.created_at);
            } else {
                return new Date(a.created_at) - new Date(b.created_at);
            }
        });
    };

    function formatarData(dt) {
        const dataObj = new Date(dt);
        const ano = dataObj.getFullYear();
        const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
        const dia = String(dataObj.getDate()).padStart(2, '0');
        return `${dia}/${mes}/${ano}`;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`group/${id}/notes`);
                setNotas(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [id]);

    return (
        <Fragment>
            <MenuAppBar />
            <div className="d-flex flex-column p-4 gap-2 h-100">
                <CCard>
                    <CCardBody>
                        <h2>Notas do (Nome do tipo do Grupo)</h2>
                        {
                            userRole === 'representante' &&
                            <section className="d-flex align-items-start gap-4">
                                <AddNotas data={notas} setData={setNotas} />
                            </section>
                        }

                        <h4>FILTROS RÁPIDOS</h4>
                        <section className="d-flex align-items-start gap-2 mb-5">
                            <SubmitButton
                                text="Mais Recentes"     
                                onClick={() => setSortOrder('desc')}
                            />
                            <SubmitButton
                                text="Mais Antigos"
                                customClass="button_filtes_bar"
                                onClick={() => setSortOrder('asc')}
                            />
                        </section>
                        <CCallout>
                            <Container customClass="start">
                                {notas.length !== 0 ? (
                                    sortDocs().map((nota) => (
                                        <CCard
                                            style={{
                                                maxWidth: '18rem', width: '100%', backgroundColor: `${((nota.color === 'red') ? '#FBCAC6' :
                                                    (nota.color === 'blue') ? '#BFEEEC' :
                                                        (nota.color === 'green') ? '#C2FFC4' :
                                                            (nota.color === 'yellow') ? '#F9F8C8' : null)}`
                                            }}
                                            key={nota.id}
                                        >
                                            <CCardHeader className='fw-bold'>{formatarData(nota.created_at)}</CCardHeader>
                                            <CCardBody>
                                                <CCardTitle className='text-capitalize'>{nota.title}</CCardTitle>
                                                <CCardText className='text-justify text-wrap text-break'>{nota.description}</CCardText>
                                            </CCardBody>
                                            <CCardFooter className="d-flex justify-content-end align-items-end">
                                                <ModalDeleteNota idNote={nota.id} data={notas} setData={setNotas} />
                                                <ModalEditNota idNota={nota.id} data={notas} setData={setNotas} />
                                            </CCardFooter>
                                        </CCard>
                                    ))

                                ) : (
                                    <p>Sem notas</p>
                                )}
                            </Container>
                        </CCallout>
                    </CCardBody>
                </CCard>

                {showMessage && <Message type={messageType} msg={message} setShowMessage={setShowMessage} />}
            </div>
        </Fragment>
    );
}
