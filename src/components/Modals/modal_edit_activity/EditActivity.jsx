import React, { Fragment, useEffect, useState } from 'react';
import useAuthContext from '../../contexts/Auth';
import api from '../../../services/api'

import {
    CButton,
    CContainer,
    CForm,
    CFormInput,
    CFormTextarea,
    CInputGroup,
    CInputGroupText,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle
} from '@coreui/react';

import { AiFillEdit } from 'react-icons/ai';
import CIcon from '@coreui/icons-react';
import { cilBook, cilCalendar, cilColorBorder } from '@coreui/icons';
import { useParams } from 'react-router-dom';


const EditActivity = ({ idActivity, data, setData }) => {
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const [activity, setActivity] = useState({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
    });

    const { setMessageType, setShowMessage, setMessage } = useAuthContext();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`groups/${id}/activity/${idActivity}`);
                const activityData = response.data;

                setActivity({
                    name: activityData.name || '',
                    description: activityData.description || '',
                    start_date: activityData.start_date || '',
                    end_date: activityData.end_date || '',
                })
            } catch (error) {
                console.error(error);
            }
        };

        if (open) {
            fetchData();
        }
    }, [id, open, idActivity]);

    const submit = async () => {
        try {
            await api.put(`groups/${id}/activity/${idActivity}`, activity)

            const updatedData = data.map((item) => {
                if (item.id === idActivity) {
                    return { ...item, ...activity };
                }
                return item;
            });
            setData(updatedData);
            setActivity({
                name: '',
                description: '',
                start_date: '',
                end_date: '',
            });

            setMessage('Atividade atualizada com sucesso!')
            setMessageType('success');
            setShowMessage(true);
            handleClose();
        } catch (error) {
            setMessage(`Ops! algo deu errado ${error.response.data.errors}`)
            setMessageType('error');
            setShowMessage(true);
            handleClose();
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
            <CButton color='transparent' style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); handleOpen() }}>
                <AiFillEdit size={20} color='blue' />
            </CButton>
            <CModal
                alignment="center"
                visible={open}
                size='lg'
                onClose={handleClose}
                aria-labelledby="VerticallyCenteredScrollableExample"
            >
                <CModalHeader>
                    <CModalTitle id="editarNota">Editar Atividade</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CContainer>
                        <CForm>
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
                                />

                                <CFormInput
                                    type='date'
                                    name='end_date'
                                    value={activity.end_date}
                                    onChange={handleEdit}
                                />
                                <CInputGroupText>
                                    <CIcon icon={cilCalendar} />
                                </CInputGroupText>
                            </CInputGroup>
                        </CForm>
                    </CContainer>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={handleClose}>
                        Fechar
                    </CButton>
                    <CButton style={{ background: '#548CA8', color: 'white' }} color='null' onClick={submit}>
                        Salvar
                    </CButton>
                </CModalFooter>
            </CModal>
        </Fragment>
    );
};

export default EditActivity;
