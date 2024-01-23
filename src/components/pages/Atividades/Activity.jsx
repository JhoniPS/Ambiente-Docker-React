import React, { Fragment, useEffect, useState } from 'react';
import MenuAppBar from '../../layout/AppBar/MenuAppBar';
import { CButton, CCard, CCardBody, CCollapse, CContainer, CFormCheck, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilBook } from '@coreui/icons';
import api from '../../../services/api';
import { useParams } from 'react-router-dom';

function Activity() {
    const { id } = useParams();
    const [activitys, setActivitys] = useState([]);
    const [openCards, setOpenCards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`group/${id}/activity`);
                setActivitys(response.data);
                setOpenCards(new Array(response.data.length).fill(false));
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    const toggleCard = (index) => {
        const updatedOpenCards = [...openCards];
        updatedOpenCards[index] = !updatedOpenCards[index];
        setOpenCards(updatedOpenCards);
    };

    return (
        <Fragment>
            <MenuAppBar />
            <div className="d-flex flex-column p-4 gap-2 h-100">
                <h2>Cadastrar Atividade</h2>
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
                <CCard className='container-fluid overflow-auto' style={{ maxHeight: '500px' }}>
                    <CCardBody className='p-0 mt-3 mb-3'>
                        <CContainer fluid>
                            <CRow className="d-flex p-0 flex-wrap gap-3">
                                {activitys.length !== 0 ? (
                                    activitys.map((activity, index) => (
                                        <CCard key={index} onClick={() => toggleCard(index)}>
                                            <CCardBody className='d-flex justify-content-between'>
                                                {activity.name}
                                                <div className='d-flex gap-3'>
                                                    <CFormCheck onClick={(e) => e.stopPropagation()} />
                                                    <CFormCheck onClick={(e) => e.stopPropagation()} />
                                                    <CFormCheck onClick={(e) => e.stopPropagation()} />
                                                </div>
                                            </CCardBody>
                                            <CCollapse visible={openCards[index]} className='mb-3'>
                                                <CCard className="mt-3">
                                                    <CCardBody>
                                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad
                                                        squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
                                                        sapiente ea proident.
                                                    </CCardBody>
                                                </CCard>
                                            </CCollapse>
                                        </CCard>
                                    ))
                                ) : null}
                            </CRow>
                        </CContainer>
                    </CCardBody>
                </CCard>
            </div>
        </Fragment>
    );
}

export default Activity;
