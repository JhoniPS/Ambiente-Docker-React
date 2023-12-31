import React from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react';


const TableGroupsDescription = ({ description }) => {

    const getMembersCount = (members) => {
        return members ? members.length : null;
    };

    const getRepresentativesCount = (representatives) => {
        return representatives ? representatives.length : null;
    };


    return (
        <CRow>
            <CCol>
                <CCard xs="12" sm="6" lg="3" className='mb-3'>
                    <CCardHeader component='h3'>Criado por</CCardHeader>
                    <CCardBody>
                        {description.created_by?.name}
                    </CCardBody>
                </CCard>
                <CCard xs="12" sm="6" lg="3" className='mb-3'>
                    <CCardHeader component='h3'>Membros do grupo</CCardHeader>
                    <CCardBody>
                        {getMembersCount(description.members)}
                    </CCardBody>
                </CCard>
                <CCard xs="12" sm="6" lg="3" className='mb-0'>
                    <CCardHeader component='h3'>Representantes</CCardHeader>
                    <CCardBody>
                        {getRepresentativesCount(description.representatives)}
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default TableGroupsDescription;