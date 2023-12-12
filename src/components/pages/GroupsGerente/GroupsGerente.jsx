import React, { Fragment, useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";

import Message from "../../layout/Message/Message";
import HeaderBar from '../../layout/header/HeaderBar';
import Container from '../../layout/container/Container'
import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import LinkButton from '../../layout/linkbutton/LinkButton';
import TableGroups from '../../TableGroups/TableGroups'
import Filter from '../../layout/filter/Filter';

import { ImArrowLeft2 } from "react-icons/im";
import { IconContext } from "react-icons";
import { IoMdAdd } from "react-icons/io";

import style from './Groups.module.css'

const GroupsGerente = () => {
    const [data, setData] = useState([]);
    const [sortOrder, setSortOrder] = useState("desc");
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setMessage(location.state.message);
            setMessageType(location.state.messagetype);
            setShowMessage(location.state.showMessage);
        }
    }, [location.state]);

    const sortUsers = () => {
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
            <HeaderBar text="PAINEL DE CONTROLE" backPageIcon={<ImArrowLeft2 size={25} />} backPage="/gerente" />
            <div className={style.groups}>
                <h2>Grupos</h2>
                <section className={style.section_search}>
                    <LinkButton
                        text="Adicionar Grupo"
                        customClass="add"
                        to="/signGroups"
                        icon={
                            <IconContext.Provider value={{ size: '2rem' }}>
                                <IoMdAdd />
                            </IconContext.Provider>
                        }
                    />

                    <Filter />
                </section>

                <h4>FILTROS RÁPIDOS</h4>
                <Container customClass='start'>
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
                </Container>
                <TableGroups rota="detalhes-de-grupos-gerente" data={sortUsers()} setData={setData} />
                {showMessage && <Message type={messageType} msg={message} setShowMessage={setShowMessage} />}
            </div>
        </Fragment>
    );
}

export default GroupsGerente;
