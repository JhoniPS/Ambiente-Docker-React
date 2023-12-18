import React, { Fragment, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Message from '../../layout/Message/Message';
import HeaderBar from '../../layout/header/HeaderBar';
import Container from '../../layout/container/Container';
import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import LinkButton from '../../layout/linkbutton/LinkButton';
import TableGroups from '../../TableGroups/TableGroups';
import Filter from '../../layout/filter/Filter';

import { ImArrowLeft2 } from 'react-icons/im';
import { IconContext } from 'react-icons';
import { IoMdAdd } from 'react-icons/io';

import style from './Groups.module.css';

const GroupsGerente = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [sortOrder, setSortOrder] = useState('desc');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [groupType, setGroupType] = useState("");

    const location = useLocation();

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

    useEffect(() => {
        if (location.state) {
            setMessage(location.state.message);
            setMessageType(location.state.messagetype);
            setShowMessage(location.state.showMessage);
        }
    }, [location.state]);

    useEffect(() => {
        if (groupType === "") {
            setFilteredData([...data]);
        }
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
                <Container customClass="start">
                    <SubmitButton text="Mais Recentes" customClass="button_filtes_bar" onClick={() => setSortOrder('desc')} />
                    <SubmitButton text="Mais Antigos" customClass="button_filtes_bar" onClick={() => setSortOrder('asc')} />
                    <SubmitButton text="Grupos Internos" customClass="button_filtes_bar" onClick={() => setGroupType('interno')} />
                    <SubmitButton text="Grupos Externos" customClass="button_filtes_bar" onClick={() => setGroupType('externo')} />
                    <SubmitButton text="Mostrar Todos" customClass="button_filtes_bar" onClick={() => setGroupType('')} />
                </Container>
                <TableGroups rota="detalhes-de-grupos-gerente" data={sortUsers()} setData={setData} />
                {showMessage && <Message type={messageType} msg={message} setShowMessage={setShowMessage} />}
            </div>
        </Fragment>
    );
};

export default GroupsGerente;
