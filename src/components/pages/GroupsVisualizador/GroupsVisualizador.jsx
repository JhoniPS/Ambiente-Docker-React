import React, { Fragment, useState } from 'react'
import HeaderBar from '../../layout/header/HeaderBar';
import SubmitButton from '../../layout/submitbuttun/SubmitButton';

import { ImArrowLeft2 } from "react-icons/im";
import style from './Groups.module.css'

import TableGroups from '../../TableGroups/TableGroups'
import Filter from '../../layout/filter/Filter';

const GroupsVisualizador = () => {
    const [data, setData] = useState([]);
    const [sortOrder, setSortOrder] = useState("desc");

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
            <HeaderBar text="PAINEL DE CONTROLE" backPageIcon={<ImArrowLeft2 size={25} />} backPage="/visualizador" />
            <div className={style.groups}>
                <h2>Grupos</h2>
                <Filter />
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
                <TableGroups rota="detalhes-de-grupos-visualizador" data={sortUsers()} setData={setData} />
            </div>
        </Fragment>
    );
}

export default GroupsVisualizador;
