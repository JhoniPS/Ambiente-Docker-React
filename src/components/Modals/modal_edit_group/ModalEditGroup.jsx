import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import useAuthContext from '../../contexts/Auth';

import { IconContext } from 'react-icons';
import { IoPencilSharp } from 'react-icons/io5';
import {
    CButton,
    CCol,
    CContainer,
    CFormCheck,
    CFormInput,
    CFormTextarea,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow
} from '@coreui/react';

export default function ModalEditGroup({ id, data, setData }) {
    const [open, setOpen] = useState(false);

    const [form, setForm] = useState({
        entity: '',
        organ: '',
        council: '',
        internal_concierge: '',
        acronym: '',
        team: '',
        status: '',
        name: '',
        type: '',
        email: '',
        observations: '',
        unit: '',
        office_requested: '',
        office_indicated: '',
    });

    const {
        setMessageType,
        setShowMessage,
        setMessage,
        setError,
        error,
        setMessageErrors,
        messageErrors,
    } = useAuthContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/groups/${id}`);
                const groupData = response.data.data;

                setForm({
                    entity: groupData.entity || '',
                    organ: groupData.organ || '',
                    council: groupData.council || '',
                    internal_concierge: groupData.internal_concierge || '',
                    acronym: groupData.acronym || '',
                    team: groupData.team || '',
                    name: groupData.type_group.name || '',
                    status: groupData.status || '',
                    type: groupData.type_group.type || '',
                    email: groupData.email || '',
                    observations: groupData.observations || '',
                    unit: groupData.unit || '',
                    office_requested: groupData.office_requested || '',
                    office_indicated: groupData.office_indicated || '',
                });
            } catch (error) {
                setMessage(error.response.data.errors);
                setMessageType('error');
                setShowMessage(true);
            }
        };

        if (open) {
            fetchData();
        }
    }, [id, open, setError, setMessageType, setShowMessage, setMessage]);

    const handleOpen = () => { setOpen(true) };
    const handleClose = () => { setOpen(false); setError(null); };

    const handleEdit = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await api.put(`/groups/${id}`, form);

            const updatedData = data.map((item) => {
                if (item.id === id) {
                    return { ...item, ...form };
                }
                return item;
            });

            setData(updatedData);
            setMessage('Grupo Editado com sucesso!');
            setMessageType('success');
            setShowMessage(true);
            handleClose();
        } catch (error) {
            setError(true);
            setMessageErrors(error.response.data.errors)
        }
    };

    return (
        <>
            <IconContext.Provider value={{ color: '#2C74AC', size: 25 }}>
                <CButton onClick={handleOpen} color='null'>
                    <IoPencilSharp />
                </CButton>
            </IconContext.Provider>
            <CModal
                alignment="center"
                size="xl"
                visible={open}
                onClose={handleClose}
                aria-labelledby="VerticallyCenteredScrollableExample"
            >
                <CModalHeader>
                    <CModalTitle id="editarGrupo">Editar Grupo</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CContainer>
                        <CRow>
                            <CCol md={6}>
                                <CFormInput
                                    type='text'
                                    label='Nome'
                                    variant='standard'
                                    name='name'
                                    value={form.name}
                                    onChange={handleEdit}
                                    feedbackInvalid={messageErrors.name}
                                    invalid={error}
                                />
                                <CFormInput
                                    type='text'
                                    label='Sigla'
                                    variant='standard'
                                    name='acronym'
                                    value={form.acronym}
                                    onChange={handleEdit}
                                    feedbackInvalid={messageErrors.acronym}
                                    invalid={error}
                                />
                                <CFormInput
                                    type='text'
                                    label='Unidade'
                                    name='unit'
                                    variant='standard'
                                    value={form.unit}
                                    onChange={handleEdit}
                                    feedbackInvalid={messageErrors.unit}
                                    invalid={error}
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormInput
                                    type='text'
                                    label='Orgão'
                                    variant='standard'
                                    name='organ'
                                    value={form.organ}
                                    onChange={handleEdit}
                                    feedbackInvalid={messageErrors.organ}
                                    invalid={error}
                                />
                                <CFormInput
                                    type='text'
                                    label='Equipe'
                                    variant='standard'
                                    name='team'
                                    value={form.team}
                                    onChange={handleEdit}
                                    feedbackInvalid={messageErrors.team}
                                    invalid={error}
                                />
                                <CFormInput
                                    type='text'
                                    label='Portaria'
                                    variant='standard'
                                    name='internal_concierge'
                                    value={form.internal_concierge}
                                    onChange={handleEdit}
                                    feedbackInvalid={messageErrors.internal_concierge}
                                    invalid={error}
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormInput
                                    type='text'
                                    label='Entidade'
                                    variant='standard'
                                    name='entity'
                                    value={form.entity}
                                    onChange={handleEdit}
                                    feedbackInvalid={messageErrors.entity}
                                    invalid={error}
                                />
                                <CFormInput
                                    type='text'
                                    label='E-mail'
                                    variant='standard'
                                    name='email'
                                    value={form.email}
                                    onChange={handleEdit}
                                    feedbackInvalid={messageErrors.email}
                                    invalid={error}
                                />
                                <CFormInput
                                    type='text'
                                    label='Oficio que solicitou'
                                    name='office_requested'
                                    variant='standard'
                                    value={form.office_requested}
                                    onChange={handleEdit}
                                    feedbackInvalid={messageErrors.office_requested}
                                    invalid={error}
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormInput
                                    type='text'
                                    label='Conselho'
                                    variant='standard'
                                    name='council'
                                    value={form.council}
                                    onChange={handleEdit}
                                    feedbackInvalid={messageErrors.council}
                                    invalid={error}
                                />
                                <CFormInput
                                    type='text'
                                    label='Tipo'
                                    variant='standard'
                                    name='type'
                                    value={form.type}
                                    onChange={handleEdit}
                                    feedbackInvalid={messageErrors.type}
                                    invalid={error}
                                />
                                <CFormInput
                                    type='text'
                                    label='Oficio que indicou'
                                    name='office_indicated'
                                    value={form.office_indicated}
                                    onChange={handleEdit}
                                    feedbackInvalid={messageErrors.office_indicated}
                                    invalid={error}
                                />
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol>
                                <h5 style={{ fontSize: '16px', marginTop: '10px', marginBottom: '5px' }}>Status do Grupo</h5>

                                <CFormCheck
                                    inline
                                    type="radio"
                                    name="status"
                                    value="EM ANDAMENTO"
                                    label="Em andamento"
                                    onChange={handleEdit}
                                    checked={(form.status === 'EM ANDAMENTO') ? true : false}
                                />
                                <CFormCheck
                                    inline
                                    type="radio"
                                    name="status"
                                    value="FINALIZADO"
                                    label="Finalizado"
                                    onChange={handleEdit}
                                    checked={(form.status === 'FINALIZADO') ? true : false}
                                />
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol>
                                <CFormTextarea
                                    label='Observações'
                                    name='observations'
                                    value={form.observations}
                                    onChange={handleEdit}
                                    rows={5}
                                    feedbackInvalid={messageErrors.observations}
                                    invalid={error}
                                />
                            </CCol>
                        </CRow>
                    </CContainer>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={handleClose}>
                        Fechar
                    </CButton>
                    <CButton style={{ background: '#548CA8', color: 'white' }} color="null" onClick={handleSubmit}>Editar</CButton>
                </CModalFooter>
            </CModal >
        </>
    );
}
