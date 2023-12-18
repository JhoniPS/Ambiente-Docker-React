import React, { Fragment, useState, useEffect } from 'react';
import HeaderBar from '../../layout/header/HeaderBar';
import SubmitButton from '../../layout/submitbuttun/SubmitButton';

import { ImArrowLeft2 } from "react-icons/im";
import style from './Groups.module.css';

import TableGroups from '../../TableGroups/TableGroups';
import Filter from '../../layout/filter/Filter';

const GroupsVisualizador = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [sortOrder, setSortOrder] = useState("desc");
    const [groupType, setGroupType] = useState("");

    useEffect(() => {
        const filterGroups = () => {
            return [...data].filter((group) => {
                if (groupType === 'interno') {
                    return group.type_group.type === 'interno';
                } else if (groupType === 'externo') {
                    return group.type_group.type === 'externo';
                } else {
                    return true;
                }
            });
        };
        const filteredGroups = filterGroups();
        setFilteredData(filteredGroups);
    }, [data, groupType]);

    const sortUsers = () => {
        return [...filteredData].sort((a, b) => {
            if (sortOrder === 'desc') {
                return new Date(b.created_at) - new Date(a.created_at);
            } else {
                return new Date(a.created_at) - new Date(b.created_at);
            }
        });
    };

    useEffect(() => {
        if (groupType === "") {
            setFilteredData([...data]);
        }
    }, [data, groupType]);

    return (
        <Fragment>
            <HeaderBar text="PAINEL DE CONTROLE" backPageIcon={<ImArrowLeft2 size={25} />} backPage="/visualizador" />
            <div className={style.groups}>
                <h2>Grupos</h2>
                <Filter />
                <h4>FILTROS RÁPIDOS</h4>
                <section className={style.button_filters}>
                    <SubmitButton text="Mais Recentes" customClass="button_filtes_bar" onClick={() => setSortOrder('desc')} />
                    <SubmitButton text="Mais Antigos" customClass="button_filtes_bar" onClick={() => setSortOrder('asc')} />
                    <SubmitButton text="Grupos Internos" customClass="button_filtes_bar" onClick={() => setGroupType('interno')} />
                    <SubmitButton text="Grupos Externos" customClass="button_filtes_bar" onClick={() => setGroupType('externo')} />
                    <SubmitButton text="Mostrar Todos" customClass="button_filtes_bar" onClick={() => setGroupType('')} />
                </section>
                <TableGroups rota="detalhes-de-grupos-visualizador" data={sortUsers()} setData={setData} />
            </div>
        </Fragment>
    );
}

export default GroupsVisualizador;
