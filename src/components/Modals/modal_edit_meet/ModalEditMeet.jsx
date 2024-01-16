import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../services/api';
import { format } from 'date-fns';
import { message } from 'antd';
import { IconContext } from 'react-icons';
import { IoPencilSharp } from 'react-icons/io5';
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

const ModalEditMeet = ({ data, setData }) => {
    const [open, setOpen] = useState(false);
    const [formulario, setFormulario] = useState({
        content: '',
        summary: '',
        date_meet: '',
    });

    const [file, setFile] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { id } = useParams();

    const handleUpload = async () => {
        try {
            const formData = new FormData();

            if (file) {
                if (formulario.date_meet) {
                    const parsedDate = new Date(formulario.date_meet);
                    if (isNaN(parsedDate.getTime())) {
                        throw new Error('Data de reunião inválida. Por favor, insira uma data válida.');
                    }
                    const formattedDate = format(parsedDate, 'yyyy-MM-dd');
                    formData.append('date_meet', formattedDate);
                }

                formData.append('ata', file);
                formData.append('content', formulario.content);
                formData.append('summary', formulario.summary);

                const response = await api.post(`/group/${id}/meeting-history`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                setFile(null);
                setFormulario({
                    content: '',
                    summary: '',
                    date_meet: '',
                });

                setData([...data, response.data]);
                message.success('Reunião criada/atualizada com sucesso.');
            } else {
                message.error('Por favor, selecione um único arquivo para enviar.');
            }
        } catch (error) {
            console.error('Erro ao criar/atualizar reunião:', error);
            message.error('Falha ao criar/atualizar reunião.');
        } finally {
            handleClose();
        }
    };

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
                    <CModalTitle id="editarReuniao">Editar Reunião</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CContainer>
                        <CRow>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    label="Conteúdo"
                                    variant="standard"
                                    name="content"
                                    value={formulario.content}
                                    onChange={(e) => setFormulario({ ...formulario, content: e.target.value })}
                                />
                                <CFormTextarea
                                    label="Resumo"
                                    placeholder="Insira aqui o resumo"
                                    value={formulario.summary}
                                    rows={2}
                                    onChange={(e) => setFormulario({ ...formulario, summary: e.target.value })}
                                />
                                <CFormInput
                                    type="date"
                                    label="Data da Reunião"
                                    variant="standard"
                                    name="date_meet"
                                    value={formulario.date_meet}
                                    onChange={(e) => setFormulario({ ...formulario, date_meet: e.target.value })}
                                />
                                <CFormInput
                                    type="file"
                                    id="formFile"
                                    label="Upload de arquivo"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </CCol>
                        </CRow>
                    </CContainer>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={handleClose}>
                        Fechar
                    </CButton>
                    <CButton color="primary" onClick={handleUpload}>
                        Editar
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    );
};

export default ModalEditMeet;
