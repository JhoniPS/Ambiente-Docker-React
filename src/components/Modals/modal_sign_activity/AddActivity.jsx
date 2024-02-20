import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../services/api'
import useAuthContext from '../../contexts/Auth';

import { IconContext } from 'react-icons';
import { IoMdAdd } from 'react-icons/io';
import { CButton, CCol, CContainer, CFormInput, CFormTextarea, CInputGroup, CInputGroupText, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilBook, cilCalendar, cilColorBorder } from '@coreui/icons';

const AddActivity = ({ activitys, setActivitys }) => {
    const [open, setOpen] = useState(false);
    const [activity, setActivity] = useState({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
    });

    const {
        setMessageType,
        setShowMessage,
        setMessage,
        error,
        setError,
        messageErrors,
        setMessageErrors,
    } = useAuthContext();

    const { id } = useParams();

    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false); setError(null) };

    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post(`groups/${id}/activity`, activity);
            setActivitys([...activitys, response.data]);
            setActivity({
                name: '',
                description: '',
                start_date: '',
                end_date: '',
            });
            setMessage('Atividade criada com sucesso!');
            setMessageType('success');
            setShowMessage(true);
        } catch (error) {
            setError(true);
            setMessageErrors(error.response.data.errors);
        }
    };

    const handleEdit = (event) => {
        const { name, value } = event.target;

        setActivity({
            ...activity,
            [name]: value,
        });
    };

    return (
        <Fragment>
            <IconContext.Provider value={{ size: 22 }}>
                <CButton onClick={handleOpen} className="mb-0" color="null" style={{ background: '#2978A0', color: 'white' }}>
                    <IoMdAdd /> Registrar Atividades
                </CButton>
            </IconContext.Provider>
            <CModal
                alignment="center"
                visible={open}
                size='xl'
                onClose={handleClose}
                aria-labelledby="VerticallyCenteredScrollableExample"
            >
                <CModalHeader>
                    <CModalTitle id="cadastroNotas">Registrar Atividades</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CContainer>
                        <CRow>
                            <CCol className='d-flex flex-column gap-2'>
                                <>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilBook} />
                                        </CInputGroupText>

                                        <CFormInput
                                            type='text'
                                            name='name'
                                            value={activity.name}
                                            onChange={handleEdit}
                                            autoComplete="On"
                                            placeholder='Nome da Atividade'
                                            feedbackInvalid={messageErrors.name}
                                            invalid={error}
                                        />
                                    </CInputGroup>

                                    <CInputGroup className='mb-3'>
                                        <CInputGroupText>
                                            <CIcon icon={cilColorBorder} />
                                        </CInputGroupText>
                                        <CFormTextarea
                                            placeholder='Descrição da Atividade'
                                            name='description'
                                            value={activity.description}
                                            onChange={handleEdit}
                                            feedbackInvalid={messageErrors.description}
                                            invalid={error}
                                        />
                                    </CInputGroup>

                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilCalendar} />
                                        </CInputGroupText>

                                        <CFormInput
                                            type='date'
                                            name='start_date'
                                            value={activity.start_date}
                                            onChange={handleEdit}
                                            feedbackInvalid={messageErrors.start_date}
                                            invalid={error}
                                        />

                                        <CFormInput
                                            type='date'
                                            name='end_date'
                                            value={activity.end_date}
                                            onChange={handleEdit}
                                            feedbackInvalid={messageErrors.end_date}
                                            invalid={error}
                                        />
                                    </CInputGroup>
                                </>
                            </CCol>
                        </CRow>
                    </CContainer>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={handleClose}>
                        Fechar
                    </CButton>
                    <CButton style={{ background: '#2978A0', color: 'white' }} onClick={submit}>
                        Nova Atividade
                    </CButton>
                </CModalFooter>
            </CModal>
        </Fragment>
    );
};

export default AddActivity;
