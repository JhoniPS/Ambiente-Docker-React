import React, { Fragment } from 'react'
import { IconContext } from "react-icons";
import { useLocation } from "react-router-dom";

import Message from "../../layout/Message/Message";
import HeaderBar from '../../layout/header/HeaderBar';
import Container from '../../layout/container/Container'
import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import LinkButton from '../../layout/linkbutton/LinkButton';

import { ImArrowLeft2 } from "react-icons/im";
import { IoMdAdd } from "react-icons/io";

import style from './Groups.module.css'
import TableGroups from '../../TableGroups/TableGroups'
import Filter from '../../layout/filter/Filter';

const GroupsGerente = () => {
    const location = useLocation();
    let message = '';
    let messagetype = '';

    if (location.state) {
        message = location.state.message;
        messagetype = location.state.messagetype;
    }

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
                    <SubmitButton text="Mais Recentes" customClass="button_filtes_bar" />
                    <SubmitButton text="Mais Antigos" customClass="button_filtes_bar" />
                </Container>
                <TableGroups rota="detalhes-de-grupos-gerente" />
                {message && <Message type={messagetype} msg={message} />}
            </div>
        </Fragment>
    );
}

export default GroupsGerente;
