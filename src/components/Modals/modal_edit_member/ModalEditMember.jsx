import React, { useState, useEffect } from 'react';
import useAuthContext from '../../contexts/Auth';
import api from '../../../services/api';

import { IconContext } from 'react-icons';
import { IoPencilSharp } from 'react-icons/io5';
import {
    CButton,
    CCol,
    CContainer,
    CFormInput,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow
} from '@coreui/react';

export default function ModalEditMember({ groupId, memberId, data, setData }) {
    const [open, setOpen] = useState(false);
    const [member, setMember] = useState({
        role: '',
        phone: '',
        email: '',
        departure_date: '',
        entry_date: '',
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { setShowMessage, setMessage, setMessageType } = useAuthContext();

    const handlEdit = async (e) => {
        e.preventDefault();

        try {
            await api.put(`group/${groupId}/members/${memberId}`, member);

            const updatedData = data.map((item) =>
                item.id === memberId ? member : item
            );
            setData(updatedData);
            setMessage('Membro editado com sucesso!');
            setMessageType('success');
            setShowMessage(true);
            handleClose();
        } catch (error) {
            setMessage('Ops!! algo deu errado');
            setMessageType('error');
            setShowMessage(true);
        }
    };

    useEffect(() => {
        const fetchMember = async () => {
            try {
                if (open) {
                    const response = await api.get(`members/${memberId}`);
                    const memberData = response.data.data;

                    if (memberData) {
                        setMember({
                            role: memberData.role || '',
                            phone: memberData.phone || '',
                            departure_date: memberData.departure_date || '',
                            email: memberData.email || '',
                            entry_date: memberData.entry_date,
                        });
                    } else {
                        console.error('Dados de membro não encontrados');
                    }
                }
            } catch (error) {
                console.error('Erro ao buscar membro:', error);
            }
        };

        fetchMember();
    }, [open, memberId]);

    return (
        <>
            <IconContext.Provider value={{ color: '#2C74AC', size: 20 }}>
                <CButton onClick={handleOpen} color='null'>
                    <IoPencilSharp />
                </CButton>
            </IconContext.Provider>
            <CModal
                alignment="center"
                size="lg"
                visible={open}
                onClose={handleClose}
                aria-labelledby="VerticallyCenteredScrollableExample"
            >
                <CModalHeader>
                    <CModalTitle component="h2">Editar Membro</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CContainer>
                        <CRow>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    label="Cargo"
                                    name="role"
                                    value={member.role}
                                    onChange={(e) => setMember({ ...member, role: e.target.value })}
                                />

                                <CFormInput
                                    type="text"
                                    label="Telefone"
                                    name="phone"
                                    value={member.phone}
                                    onChange={(e) => setMember({ ...member, phone: e.target.value })}
                                />

                                <CFormInput
                                    type="text"
                                    label="E-mail"
                                    name="email"
                                    value={member.email}
                                    onChange={(e) => setMember({ ...member, email: e.target.value })}
                                />

                                <CFormInput
                                    type='date'
                                    label="Data de saida"
                                    name="departure_date"
                                    value={member.departure_date.substring(0, 10)}
                                    onChange={(e) => setMember({ ...member, departure_date: e.target.value })}
                                />
                            </CCol>
                        </CRow>
                    </CContainer>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={handleClose}>
                        Fechar
                    </CButton>
                    <CButton color="primary" onClick={handlEdit} >
                        Editar
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    );
}
