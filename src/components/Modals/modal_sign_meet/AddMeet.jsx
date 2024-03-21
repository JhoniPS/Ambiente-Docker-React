import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuthContext from '../../contexts/Auth';
import api from '../../../services/api';

import { message } from 'antd';
import { IconContext } from 'react-icons';
import { IoMdAdd } from 'react-icons/io';

import {
    CButton,
    CCol,
    CContainer,
    CFormInput,
    CFormTextarea,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow
} from '@coreui/react';

const AddMeet = ({ data, setData }) => {
    const [open, setOpen] = useState(false);
    const [formulario, setFormulario] = useState({
        content: '',
        summary: '',
        date_meet: '',
        file: null,
    });

    const {
        error,
        setError,
        messageErrors,
        setMessageErrors,
    } = useAuthContext();

    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false); setError(null); };
    const { id } = useParams();

    const handleUpload = async () => {
        const formData = new FormData();

        formData.append('ata', formulario.file);
        formData.append('content', formulario.content);
        formData.append('summary', formulario.summary);
        formData.append('date_meet', formulario.date_meet);

        try {
            const response = await api.post(`/groups/${id}/meeting-history`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setFormulario({
                content: '',
                summary: '',
                date_meet: '',
                file: null
            });

            message.success('Reunião criada com sucesso.');
            setData([...data, response.data]);
        } catch (error) {
            message.error('Falha ao criar reunião.');
            setError(true);
            setMessageErrors(error.response.data.errors);
        }
    };

    return (
        <>
            <IconContext.Provider value={{ size: 22 }}>
                <CButton onClick={handleOpen} className="mb-3" color="null" style={{ background: '#2978A0', color: 'white' }}>
                    <IoMdAdd /> Adicionar Reunião
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
                    <CModalTitle component="h2">Registrar Reunião</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CContainer>
                        <CRow>
                            <CCol className='d-flex flex-column gap-1'>
                                <CFormInput
                                    type="text"
                                    label="Conteúdo"
                                    name="content"
                                    value={formulario.content}
                                    onChange={(e) => setFormulario({ ...formulario, content: e.target.value })}
                                    feedbackInvalid={messageErrors.content}
                                    invalid={error}
                                />

                                <CFormTextarea
                                    placeholder="Digite aqui as observações"
                                    label="Resumo"
                                    value={formulario.summary}
                                    text="Limite de 255 caracteres"
                                    rows={4}
                                    onChange={(e) => {
                                        const inputText = e.target.value;
                                        (inputText.length <= 255) ? setFormulario({ ...formulario, summary: inputText }) : alert("Limite de caracteres atingido");
                                    }}
                                    feedbackInvalid={messageErrors.summary}
                                    invalid={error}
                                />

                                <CFormInput
                                    type="date"
                                    label="Data da Reunião"
                                    name="date_meet"
                                    value={formulario ? formulario.date_meet : ''}
                                    onChange={(e) => setFormulario({ ...formulario, date_meet: e.target.value })}
                                    feedbackInvalid={messageErrors.date_meet}
                                    invalid={error}
                                />

                                <CFormInput
                                    type="file"
                                    label="Upload de Ata"
                                    name='file'
                                    onChange={(e) => setFormulario({ ...formulario, file: e.target.files[0] })}
                                    feedbackInvalid={messageErrors.ata}
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
                    <CButton style={{ background: '#548CA8', color: 'white' }} color="null" onClick={handleUpload} >
                        Salvar
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    );
};

export default AddMeet;
