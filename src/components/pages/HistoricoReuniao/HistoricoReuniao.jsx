import React, { Fragment, useState } from 'react'
import { useLocation, useParams } from "react-router-dom";
import Cookies from 'js-cookie'

import { ImArrowLeft2 } from "react-icons/im";
import HeaderBar from '../../layout/header/HeaderBar';
import Container from '../../layout/container/Container';
import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import style from './HistoricoReuniao.module.css'

function HistoricoReuniao() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [sortOrder, setSortOrder] = useState("desc");

    const location = useLocation();
    const backPage = location.pathname.replace("/historico-de-reunioes", '');
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
                <h2>Histórico de Reuniões</h2>

                {
                    userRole === 'representante' &&
                    <section className={style.section_filter}>
                        {/* <AddDocuments data={data} setData={setData} /> */}
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
                <Container customClass='start'>
                    <div className={style.cardReuniao}>
                        <p className={style.dataReuniao}>00/00/00</p>
                        <div>
                            <h2>Reunião</h2>
                        </div>

                        <p className={style.resumoReuniao}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <p className={style.link}>ata.pdf</p>
                    </div>

                    <div className={style.cardReuniao}>
                        <p className={style.dataReuniao}>00/00/00</p>
                        <div>
                            <h2>Reunião</h2>
                        </div>

                        <p className={style.resumoReuniao}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <p className={style.link}>ata.pdf</p>
                    </div>

                    <div className={style.cardReuniao}>
                        <p className={style.dataReuniao}>00/00/00</p>
                        <div>
                            <h2>Reunião</h2>
                        </div>

                        <p className={style.resumoReuniao}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <p className={style.link}>ata.pdf</p>
                    </div>
                </Container>
            </div>
        </Fragment>
    );
}

export default HistoricoReuniao;
