import React, { Fragment, useEffect, useState } from 'react'
import MenuAppBar from '../../layout/AppBar/MenuAppBar';
import { CButton, CCard, CCardBody, CCol, CContainer, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilBook } from '@coreui/icons';
import api from '../../../services/api';
import { useParams } from 'react-router-dom';

function Activity() {
    const { id } = useParams();
    const [activitys, setActivitys] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`group/${id}/activity`);
                setActivitys(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    console.log(activitys);

    return (
        <Fragment>
            <MenuAppBar />
            <div className="d-flex flex-column p-4 gap-2 h-100">
                <h2> Cadastrar Atividade</h2>
                <CCard className='container-fluid'>
                    <CCardBody>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilBook} />
                            </CInputGroupText>

                            <CFormInput
                                type='text'
                                name='name'
                                autoComplete="On"
                                placeholder='Nome da Atividade'
                            />
                        </CInputGroup>
                        <CButton className='w-100'>
                            Nova Atividade
                        </CButton>
                    </CCardBody>
                </CCard>

                <h2>Lista Atividades</h2>
                <CCard className='container-fluid'>
                    <CCardBody>
                        <CContainer>
                            <CRow>
                                {activitys.length !== 0 ? (
                                    activitys.map((activity, index) => (
                                      <CCard>
                                        <CCardBody>Teste</CCardBody>
                                      </CCard>
                                    ))
                                ) : null}
                            </CRow>
                        </CContainer>
                    </CCardBody>
                </CCard>
            </div>
        </Fragment>
    )
}

export default Activity;