import React, { Fragment, useEffect, useState } from 'react';
import useAuthContext from '../../contexts/Auth';
import { useLocation, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../../../services/api';

import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import AddNotas from '../../Modals/modal_sign_notas/AddNotas';
import Container from '../../layout/container/Container';
import Message from '../../layout/Message/Message';
import ModalDeleteNota from '../../Modals/modal_delete_notas/ModalDeleteNota';
import ModalEditNota from '../../Modals/modal_edit_notas/ModalEditNota';
import MenuAppBar from '../../layout/AppBar/MenuAppBar';
import { CCallout, CCard, CCardBody, CCardFooter, CCardHeader, CCardText, CCardTitle, CCol, CRow } from '@coreui/react';

export default function Notas() {
    const { id } = useParams();
    const [notas, setNotas] = useState([]);
    const [sortOrder, setSortOrder] = useState('desc');

    const location = useLocation();
    const backPage = location.pathname.replace('/notas', '');

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
            <MenuAppBar backStep={backPage} />
            <div className="d-flex flex-column p-4 gap-2 h-100">
                <CCard>
                    <CCardBody>
                        <h2>Notas</h2>

                        <h4>FILTROS RÁPIDOS</h4>
                        <section className="d-flex align-items-start gap-2 mb-2">
                            <SubmitButton
                                text="Mais Recentes"
                                onClick={() => setSortOrder('desc')}
                            />
                            <SubmitButton
                                text="Mais Antigos"
                                customClass="button_filtes_bar"
                                onClick={() => setSortOrder('asc')}
                            />

                            {
                                userRole === 'representante' &&
                                <section className="d-flex align-items-start ms-auto p-0 bd-highligh">
                                    <AddNotas data={notas} setData={setNotas} />
                                </section>
                            }
                        </section>
                        <CCallout color='success' className="overflow-auto mb-0 mt-2" style={{ maxHeight: '650px' }}>
                            <Container customClass="start">
                                <CRow xs={{ cols: 1 }} sm={{ cols: 2 }} md={{ cols: 3 }} lg={{ cols: 3 }} xl={{ cols: 4 }} xxl={{ cols: 5 }}>
                                    {notas.length !== 0 ? (
                                        sortDocs().map((nota) => (
                                            <CCol className='mb-4'>
                                                <CCard
                                                    style={{
                                                        backgroundColor: `${((nota.color === 'red') ? '#FBCAC6' :
                                                            (nota.color === 'blue') ? '#BFEEEC' :
                                                                (nota.color === 'green') ? '#BCEBCB' :
                                                                    (nota.color === 'yellow') ? '#F9F8C8' : null)}`,
                                                        height: '15rem',
                                                    }}
                                                    key={nota.id}
                                                >
                                                    <CCardHeader className='fw-bold'>{formatarData(nota.created_at)}</CCardHeader>
                                                    <CCardBody>
                                                        <CCardTitle className='text-capitalize'>{nota.title}</CCardTitle>
                                                        <CCardText>
                                                            {nota.description}
                                                        </CCardText>
                                                    </CCardBody>
                                                    <CCardFooter className="d-flex justify-content-end align-items-end p-0">
                                                        {
                                                            userRole === 'representante' &&
                                                            <>
                                                                <ModalDeleteNota idNote={nota.id} data={notas} setData={setNotas} />
                                                                <ModalEditNota idNota={nota.id} data={notas} setData={setNotas} />
                                                            </>
                                                        }
                                                    </CCardFooter>
                                                </CCard>
                                            </CCol>
                                        ))
                                    ) : (
                                        <p>Sem notas</p>
                                    )}
                                </CRow>
                                {/* {notas.length !== 0 ? (
                                    sortDocs().map((nota) => (
                                        <CCard
                                            style={{
                                                maxWidth: '27rem', width: '100%', backgroundColor: `${((nota.color === 'red') ? '#FBCAC6' :
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
                                                {
                                                    userRole === 'representante' &&
                                                    <>
                                                        <ModalDeleteNota idNote={nota.id} data={notas} setData={setNotas} />
                                                        <ModalEditNota idNota={nota.id} data={notas} setData={setNotas} />
                                                    </>
                                                }
                                            </CCardFooter>
                                        </CCard>
                                    ))

                                ) : (
                                    <p>Sem notas</p>
                                )} */}
                            </Container>
                        </CCallout>
                    </CCardBody>
                </CCard>

                {showMessage && <Message type={messageType} msg={message} setShowMessage={setShowMessage} />}
            </div>
        </Fragment>
    );
}
