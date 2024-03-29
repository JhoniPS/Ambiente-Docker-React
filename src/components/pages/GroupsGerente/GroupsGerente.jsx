import React, { Fragment, useState, useEffect } from 'react';
import useAuthContext from '../../contexts/Auth';
import Message from '../../layout/Message/Message';
import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import LinkButton from '../../layout/linkbutton/LinkButton';
import TableGroups from '../../TableGroups/TableGroups';

import { IconContext } from 'react-icons';
import { IoMdAdd } from 'react-icons/io';
import { CCard, CCardBody } from '@coreui/react';
import ReportGroups from '../../report/ReportGroups';

const GroupsGerente = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [sortOrder, setSortOrder] = useState('desc');
    const [groupType, setGroupType] = useState("");

    const { message, messageType, showMessage, setShowMessage } = useAuthContext();

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
                        <section className='d-flex flex-wrap justify-content-between align-items-center gap-2'>
                            <h3 className='text-h3 mb-0'>Grupos</h3>

                            <div className='d-flex flex-wrap gap-2'>
                                <ReportGroups />

                                <LinkButton
                                    text="Adicionar Grupo"
                                    to="/gerente-cadastrar-grupo"
                                    icon={
                                        <IconContext.Provider value={{ size: '1rem' }}>
                                            <IoMdAdd size={20} />
                                        </IconContext.Provider>
                                    }
                                />
                            </div>

                        </section>

                        <h5 className='mb-0'>FILTROS RÁPIDOS</h5>
                        <section className="d-flex flex-wrap align-items-start gap-2 mb-3">
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
