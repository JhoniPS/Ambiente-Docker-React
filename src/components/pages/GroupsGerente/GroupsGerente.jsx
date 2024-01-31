import React, { Fragment, useState, useEffect } from 'react';
import useAuthContext from '../../contexts/Auth';
import { useLocation } from 'react-router-dom';

import Message from '../../layout/Message/Message';
import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import LinkButton from '../../layout/linkbutton/LinkButton';
import TableGroups from '../../TableGroups/TableGroups';

import { IconContext } from 'react-icons';
import { IoMdAdd } from 'react-icons/io';
import { CCard, CCardBody } from '@coreui/react';

const GroupsGerente = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [sortOrder, setSortOrder] = useState('desc');
    const [groupType, setGroupType] = useState("");

    const { message, messageType, showMessage, setShowMessage, setMessage, setMessageType } = useAuthContext();

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

        window.history.replaceState(null, '');

    }, [location.state, setMessage, setMessageType, setShowMessage]);

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
            <div className="d-flex flex-column p-4 gap-4 h-100">
                <CCard>
                    <CCardBody className="d-flex flex-column gap-3">
                        <h3 className='text-h3 mb-2'>Grupos</h3>
                        <section className='mb-0'>
                            <LinkButton
                                text="Adicionar Grupo"
                                customClass="primary"
                                to="/gerente-cadastrar-grupo"
                                icon={
                                    <IconContext.Provider value={{ size: '1rem' }}>
                                        <IoMdAdd size={20} />
                                    </IconContext.Provider>
                                }
                            />
                        </section>

                        <h4 className='mb-0'>FILTROS RÁPIDOS</h4>
                        <section className="d-flex align-items-start gap-2 mb-3">
                            <SubmitButton text="Mais Recentes" style={{ opacity: '0.9' }} customClass="button_filtes_bar" onClick={() => setSortOrder('desc')} />
                            <SubmitButton text="Mais Antigos" customClass="button_filtes_bar" onClick={() => setSortOrder('asc')} />
                            <SubmitButton text="Grupos Internos" customClass="button_filtes_bar" onClick={() => setGroupType('interno')} />
                            <SubmitButton text="Grupos Externos" customClass="button_filtes_bar" onClick={() => setGroupType('externo')} />
                            <SubmitButton text="Mostrar Todos" customClass="button_filtes_bar" onClick={() => setGroupType('')} />
                        </section>
                        <TableGroups rota="gerente-detalhes-de-grupos" data={sortUsers()} setData={setData} />
                    </CCardBody>
                </CCard>
                {showMessage && <Message type={messageType} msg={message} setShowMessage={setShowMessage} />}
            </div>
        </Fragment>
    );
};

export default GroupsGerente;
