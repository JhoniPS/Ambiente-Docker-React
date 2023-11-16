import React, { Fragment, useState } from 'react'
import HeaderBar from '../../layout/header/HeaderBar';
import SubmitButton from '../../layout/submitbuttun/SubmitButton';

import { ImArrowLeft2 } from "react-icons/im";
import style from './Groups.module.css'

import Modal from '../../Modals/modal_filter_groups/Modal';
import TableGroups from '../../TableGroups/TableGroups'

const GroupsRepresentante = () => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <Fragment>
            <HeaderBar text="PAINEL DE CONTROLE" backPageIcon={<ImArrowLeft2 size={25} />} backPage="/representante" />
            <div className={style.groups}>
                <h2>Grupos</h2>
                {/* <section className={style.section_search}>
                    <LinkButton
                        text="Adicionar Grupo"
                        customClass="add"
                        to="/signGroups"
                        icon={
                            <IconContext.Provider value={{ size: 25 }}>
                                <IoMdAdd />
                            </IconContext.Provider>
                        }
                    />

                    <SubmitButton
                        text="Filtro"
                        customClass="button_filter"
                        onClick={() => setOpenModal(true)}
                        icon={
                            <IconContext.Provider value={{ size: 20 }}>
                                <IoIosFunnel />
                            </IconContext.Provider>
                        }
                    />
                </section> */}

                <Modal
                    openModal={openModal}
                    setOpenModal={() => setOpenModal(!openModal)}
                />

                <h4>FILTROS RÁPIDOS</h4>
                <section className={style.button_filters}>
                    <SubmitButton text="Mais Recentes" customClass="button_filtes_bar" />
                    <SubmitButton text="Mais Antigos" customClass="button_filtes_bar" />
                    <SubmitButton text="Crescente" customClass="button_filtes_bar" />
                    <SubmitButton text="Descrecente" customClass="button_filtes_bar" />
                </section>
                <TableGroups rota="detalhes-de-grupos-representante" />
            </div>
        </Fragment>
    );
}

export default GroupsRepresentante;
