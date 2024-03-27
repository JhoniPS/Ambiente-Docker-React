import React, { Fragment, useState, useEffect } from 'react';

import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import MenuAppBar from '../../layout/AppBar/MenuAppBar';
import TableGroups from '../../TableGroups/TableGroups';
import Container from '../../layout/container/Container';
import { CCard, CCardBody } from '@coreui/react';
import ReportGroups from '../../report/ReportGroups';

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
            <MenuAppBar />
            <div className="d-flex flex-column p-4 gap-4 h-100">
                <CCard>
                    <CCardBody className="d-flex flex-column gap-3">
                        <div className='d-flex justify-content-between align-items-center'>
                            <h2>Grupos</h2>
                            <ReportGroups />
                        </div>
                        <h5 className='mb-0'>FILTROS RÁPIDOS</h5>
                        <Container customClass="start">
                            <SubmitButton text="Mais Recentes" customClass="button_filtes_bar" onClick={() => setSortOrder('desc')} />
                            <SubmitButton text="Mais Antigos" customClass="button_filtes_bar" onClick={() => setSortOrder('asc')} />
                            <SubmitButton text="Grupos Internos" customClass="button_filtes_bar" onClick={() => setGroupType('interno')} />
                            <SubmitButton text="Grupos Externos" customClass="button_filtes_bar" onClick={() => setGroupType('externo')} />
                            <SubmitButton text="Mostrar Todos" customClass="button_filtes_bar" onClick={() => setGroupType('')} />
                        </Container>

                        <TableGroups rota="visualizador-detalhes-de-grupos" data={sortUsers()} setData={setData} />
                    </CCardBody>
                </CCard>

            </div>
        </Fragment>
    );
}

export default GroupsVisualizador;
