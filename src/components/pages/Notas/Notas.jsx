import React, { Fragment, useEffect, useState } from 'react'
import { useLocation, useParams } from "react-router-dom";
import Cookies from 'js-cookie'

import HeaderBar from '../../layout/header/HeaderBar';
import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import style from './Notas.module.css'

import { ImArrowLeft2 } from "react-icons/im";
import AddNotas from '../../Modals/modal_sign_notas/AddNotas';
import Container from '../../layout/container/Container';
import { Divider } from 'antd';

export default function Notas() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [sortOrder, setSortOrder] = useState("desc");

    const location = useLocation();
    const backPage = location.pathname.replace("/notas", '');
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

    return (
        <Fragment>
            <HeaderBar text="PAINEL DE CONTROLE" backPageIcon={<ImArrowLeft2 size={25} />} backPage={backPage} />
            <div className={style.container}>
                <h2>Notas do (Nome do tipo do Grupo)</h2>
                {
                    userRole === 'representante' &&
                    <section className={style.section_filter}>
                        <AddNotas data={data} setData={setData} />
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
                    <div className={`${style.cardNotas} ${style.customColorGreen}`}>
                        <p className={style.data}>xx/xx/xxxx</p>
                        <h3>Brainstorming</h3>
                        <Divider style={{ marginTop: 5 }} />
                    </div>

                    <div className={`${style.cardNotas} ${style.customColorYellow}`}>
                        <p className={style.data}>xx/xx/xxxx</p>
                        <h3>Brainstorming</h3>
                        <Divider style={{ marginTop: 5 }} />
                    </div>

                    <div className={`${style.cardNotas} ${style.customColorBlue}`}>
                        <p className={style.data}>xx/xx/xxxx</p>
                        <h3>Brainstorming</h3>
                        <Divider style={{ marginTop: 5 }} />
                    </div>

                    <div className={`${style.cardNotas} ${style.customColorRed}`}>
                        <p className={style.data}>xx/xx/xxxx</p>
                        <h3>Brainstorming</h3>
                        <Divider style={{ marginTop: 5 }} />
                    </div>
                </Container>
            </div>
        </Fragment>
    )
}
