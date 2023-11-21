import React, { Fragment, useState } from 'react'
import { IconContext } from "react-icons";

import HeaderBar from '../../layout/header/HeaderBar';
import Container from '../../layout/container/Container'
import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import LinkButton from '../../layout/linkbutton/LinkButton';

import { ImArrowLeft2 } from "react-icons/im";
import { IoIosFunnel } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";

import style from './Groups.module.css'

import Modal from '../../Modals/modal_filter_groups/Modal';
import TableGroups from '../../TableGroups/TableGroups'

const GroupsGerente = () => {
    const [openModal, setOpenModal] = useState(false);

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

                    <SubmitButton
                        text="Filtro"
                        customClass="button_filter"
                        onClick={() => setOpenModal(true)}
                        icon={
                            <IconContext.Provider value={{ size: '1.6rem' }}>
                                <IoIosFunnel />
                            </IconContext.Provider>
                        }
                    />
                </section>

                <Modal
                    openModal={openModal}
                    setOpenModal={() => setOpenModal(!openModal)}
                />

                <h4>FILTROS RÁPIDOS</h4>
                <Container customClass='start'>
                    <SubmitButton text="Mais Recentes" customClass="button_filtes_bar" />
                    <SubmitButton text="Mais Antigos" customClass="button_filtes_bar" />
                    <SubmitButton text="Crescente" customClass="button_filtes_bar" />
                    <SubmitButton text="Descrecente" customClass="button_filtes_bar" />
                </Container>
                <TableGroups rota="detalhes-de-grupos-gerente"/>
            </div>
        </Fragment>
    );
}

export default GroupsGerente;
