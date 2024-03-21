import React from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';


const TableGroupsDescription = ({ description }) => {

    console.log(description)

    const getMembersCount = (members) => {
        return members ? members.length : null;
    };

    return (
        <CRow>
            <CCol xs="12" sm="6" lg="4">
                <CCard style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <CCardHeader component='h3'>Criado por</CCardHeader>
                    <CCardBody style={{ color: '#677970' }}>
                        {description.created_by?.name}
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol xs="12" sm="6" lg="4">
                <CCard style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <CCardHeader component='h3'>Representante</CCardHeader>
                    <CCardBody style={{ color: '#677970' }}>
                        {description.representative?.email}
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol xs="12" sm="6" lg="4">
                <CCard style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <CCardHeader component='h3'>Membros do grupo</CCardHeader>
                    <CCardBody style={{ color: '#677970' }}>
                        {getMembersCount(description.members)}
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default TableGroupsDescription;