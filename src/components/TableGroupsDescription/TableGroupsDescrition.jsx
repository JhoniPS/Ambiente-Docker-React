import React from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';


const TableGroupsDescription = ({ description }) => {

    const getMembersCount = (members) => {
        return members ? members.length : null;
    };

    return (
        <CRow>
            <CCol xs="12" sm="6" lg="4">
                <CCard>
                    <CCardHeader component='h3'>Criado por</CCardHeader>
                    <CCardBody>
                        {description.created_by?.name}
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol xs="12" sm="6" lg="4">
                <CCard>
                    <CCardHeader component='h3'>Representante</CCardHeader>
                    <CCardBody>
                        {description.representative?.email}
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol xs="12" sm="6" lg="4">
                <CCard>
                    <CCardHeader component='h3'>Membros do grupo</CCardHeader>
                    <CCardBody>
                        {getMembersCount(description.members)}
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default TableGroupsDescription;