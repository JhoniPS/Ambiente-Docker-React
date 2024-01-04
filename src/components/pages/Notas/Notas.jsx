import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import style from './Notas.module.css';
import AddNotas from '../../Modals/modal_sign_notas/AddNotas';
import Container from '../../layout/container/Container';
import Message from '../../layout/Message/Message';
import { Divider } from 'antd';
import api from '../../../services/api';
import ModalDeleteNota from '../../Modals/modal_delete_notas/ModalDeleteNota';
import ModalEditNota from '../../Modals/modal_edit_notas/ModalEditNota';
import MenuAppBar from '../../layout/AppBar/MenuAppBar';
import { CCallout, CCard, CCardBody } from '@coreui/react';

export default function Notas() {
    const { id } = useParams();
    const [notas, setNotas] = useState([]);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [sortOrder, setSortOrder] = useState('desc');

    const navigate = useNavigate();
    const location = useLocation();
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
        const handlePopstate = () => {
            // Use o hook navigate para redirecionar para a rota desejada
            navigate(`/detalhes-de-grupos-representante/${id}/`);
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
        }
    }, [location.state]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`notes`);
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
                                customClass="button_filtes_bar"
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
                                    <Container customClass="start">
                                        {sortDocs().map((nota) => (
                                            <div className={`${style.cardNotas} ${style[nota.color]}`} key={nota.id}>
                                                <p className={style.data}>{formatarData(nota.created_at)}</p>
                                                <h3>{nota.title}</h3>
                                                <Divider style={{ marginTop: 5 }} />
                                                <p className={style.description}>{nota.description}</p>
                                                <div className="d-flex justify-content-end w-100">
                                                    <ModalDeleteNota idNote={nota.id} data={notas} setData={setNotas} />
                                                    <ModalEditNota idNota={nota.id} data={notas} setData={setNotas} />
                                                </div>
                                            </div>
                                        ))}
                                    </Container>
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
