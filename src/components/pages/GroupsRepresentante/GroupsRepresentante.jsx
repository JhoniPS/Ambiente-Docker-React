import React, { Fragment } from 'react'
import HeaderBar from '../../layout/header/HeaderBar';
import SubmitButton from '../../layout/submitbuttun/SubmitButton';

import { ImArrowLeft2 } from "react-icons/im";
import style from './Groups.module.css'

import TableGroups from '../../TableGroups/TableGroups'
import Filter from '../../layout/filter/Filter';

const GroupsRepresentante = () => {

    return (
        <Fragment>
            <HeaderBar text="PAINEL DE CONTROLE" backPageIcon={<ImArrowLeft2 size={25} />} backPage="/representante" />
            <div className={style.groups}>
                <h2>Grupos</h2>
                <Filter />

                <h4>FILTROS RÁPIDOS</h4>
                <section className={style.button_filters}>
                    <SubmitButton text="Mais Recentes" customClass="button_filtes_bar" />
                    <SubmitButton text="Mais Antigos" customClass="button_filtes_bar" />
                </section>
                <TableGroups rota="detalhes-de-grupos-representante" />
            </div>
        </Fragment>
    );
}

export default GroupsRepresentante;
