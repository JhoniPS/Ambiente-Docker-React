import React, { Fragment, useEffect, useState } from 'react'
import { useLocation, useParams } from "react-router-dom";
import Cookies from 'js-cookie'

import HeaderBar from '../../layout/header/HeaderBar';
import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import style from './Notas.module.css'

import { ImArrowLeft2 } from "react-icons/im";
import AddNotas from '../../Modals/modal_sign_notas/AddNotas';
import Container from '../../layout/container/Container';
import Message from '../../layout/Message/Message';
import { Divider } from 'antd';
import api from '../../../services/api';
import ModalDeleteNota from '../../Modals/modal_delete_notas/ModalDeleteNota';
import ModalEditNota from '../../Modals/modal_edit_notas/ModalEditNota';

export default function Notas() {
    const { id } = useParams();
    const [notas, setNotas] = useState([]);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [sortOrder, setSortOrder] = useState("desc");

    const location = useLocation();
    const backPage = location.pathname.replace("/notas", '');
    const userRole = Cookies.get('userType');

    const sortDocs = () => {
        return [...notas].sort((a, b) => {
            if (sortOrder === "desc") {
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
    }, [id])

    return (
        <Fragment>
            <HeaderBar text="PAINEL DE CONTROLE" backPageIcon={<ImArrowLeft2 size={25} />} backPage={backPage} />
            <div className={style.container}>
                <h2>Notas do (Nome do tipo do Grupo)</h2>
                {
                    userRole === 'representante' &&
                    <section className={style.section_filter}>
                        <AddNotas data={notas} setData={setNotas} />
                    </section>
                }

                <h4>FILTROS RÁPIDOS</h4>
                <section className={style.button_filters}>
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
                <Container customClass="start">
                    {sortDocs().map((nota) => (
                        <div className={`${style.cardNotas} ${style[nota.color]}`} key={nota.id}>
                            <p className={style.data}>{formatarData(nota.created_at)}</p>
                            <h3>{nota.title}</h3>
                            <Divider style={{ marginTop: 5 }} />
                            <p className={style.description}>{nota.description}</p>
                            <div className={style.container_button}>
                                <ModalDeleteNota idNote={nota.id} data={notas} setData={setNotas} />
                                <ModalEditNota idNota={nota.id} data={notas} setData={setNotas} />
                            </div>
                        </div>
                    ) || "Sem dados")}
                </Container>
                {showMessage && <Message type={messageType} msg={message} setShowMessage={setShowMessage} />}
            </div>
        </Fragment>
    )
}
