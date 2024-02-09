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

    const { setMessageType, setShowMessage, setMessage } = useAuthContext();

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
                console.error(error);
            }
        };

        if (open) {
            fetchData();
        }
    }, [id, open]);

    const handleOpen = () => { setOpen(true) };
    const handleClose = () => { setOpen(false) };

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
            console.error(error);
            setMessage('Grupo Editado com sucesso!');
            setMessageType('error');
            setShowMessage(true);
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
                            <CCol md={3}>
                                <CFormInput
                                    type='text'
                                    label='Nome'
                                    variant='standard'
                                    name='name'
                                    value={form.name}
                                    onChange={handleEdit}
                                />
                                <CFormInput
                                    type='text'
                                    label='Sigla'
                                    variant='standard'
                                    name='acronym'
                                    value={form.acronym}
                                    onChange={handleEdit}
                                />
                                <CFormInput
                                    type='text'
                                    label='Unidade'
                                    name='unit'
                                    variant='standard'
                                    value={form.unit}
                                    onChange={handleEdit}
                                />
                            </CCol>
                            <CCol md={3}>
                                <CFormInput
                                    type='text'
                                    label='Orgão'
                                    variant='standard'
                                    name='organ'
                                    value={form.organ}
                                    onChange={handleEdit}
                                />
                                <CFormInput
                                    type='text'
                                    label='Equipe'
                                    variant='standard'
                                    name='team'
                                    value={form.team}
                                    onChange={handleEdit}
                                />
                                <CFormInput
                                    type='text'
                                    label='Portaria'
                                    variant='standard'
                                    name='internal_concierge'
                                    value={form.internal_concierge}
                                    onChange={handleEdit}
                                />
                            </CCol>
                            <CCol md={3}>
                                <CFormInput
                                    type='text'
                                    label='Entidade'
                                    variant='standard'
                                    name='entity'
                                    value={form.entity}
                                    onChange={handleEdit}
                                />
                                <CFormInput
                                    type='text'
                                    label='E-mail'
                                    variant='standard'
                                    name='email'
                                    value={form.email}
                                    onChange={handleEdit}
                                />
                                <CFormInput
                                    type='text'
                                    label='Oficio que solicitou'
                                    name='office_requested'
                                    variant='standard'
                                    value={form.office_requested}
                                    onChange={handleEdit}
                                />
                            </CCol>
                            <CCol md={3}>
                                <CFormInput
                                    type='text'
                                    label='Conselho'
                                    variant='standard'
                                    name='council'
                                    value={form.council}
                                    onChange={handleEdit}
                                />
                                <CFormInput
                                    type='text'
                                    label='Tipo'
                                    variant='standard'
                                    name='type'
                                    value={form.type}
                                    onChange={handleEdit}
                                />
                                <CFormInput
                                    type='text'
                                    label='Oficio que indicou'
                                    name='office_indicated'
                                    value={form.office_indicated}
                                    onChange={handleEdit}
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
