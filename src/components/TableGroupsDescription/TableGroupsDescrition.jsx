import React from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';


const TableGroupsDescription = ({ description }) => {

    const getMembersCount = (members) => {
        return members ? members.length : null;
    };

    const getRepresentativesCount = (representatives) => {
        return representatives ? representatives.length : null;
    };


    return (
        <CCard>
            <CRow>
                <CCol xs="12" lg="4" style={{ width: '100%' }}>
                    <CCardHeader component='h3'>Criado por</CCardHeader>
                    <CCardBody>
                        <CCol xs={{ span: 12, order: 'last' }}>{description.created_by?.name}</CCol>
                    </CCardBody>
                </CCol>
                <CCol xs="12" lg="4" style={{ width: '100%' }}>
                    <CCardHeader component='h3'>Membros do grupo</CCardHeader>
                    <CCardBody>
                        <CCol xs={{ span: 12 }}>{getMembersCount(description.members)}</CCol>
                    </CCardBody>
                </CCol>
                <CCol xs="12" lg="4" style={{ width: '100%' }}>
                    <CCardHeader component='h3'>Representantes do grupo</CCardHeader>
                    <CCardBody>
                        <CCol xs={{ span: 12, order: 'first' }}>{getRepresentativesCount(description.representatives)}</CCol>
                    </CCardBody>
                </CCol>
            </CRow>
        </CCard>


    );
};

export default TableGroupsDescription;