import React, { Fragment, useState } from 'react';
import api from '../../../services/api';
import { useParams } from 'react-router-dom';

import { message } from 'antd';
import { IconContext } from 'react-icons';
import { IoMdAdd } from "react-icons/io";

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


const AddDocuments = ({ data, setData }) => {
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await api.post(`group/${id}/documents`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setFile(null);

            message.success('Upload feito com sucesso.');
            setData([...data, response.data]);
        } catch (error) {
            console.error('Erro no envio de arquivos:', error);
            message.error('Falha no upload de arquivo.');
        } finally {
            handleClose();
        }
    };

    return (
        <Fragment>
            <IconContext.Provider value={{ size: 22 }}>
                <CButton onClick={handleOpen} className="mb-3" color="null" style={{ background: '#545F66', color: 'white' }}>
                    <IoMdAdd /> Adicionar Documento
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
                    <CModalTitle component="h2">Cadastro de Documentos</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CContainer>
                        <CRow>
                            <CCol className='d-flex flex-column gap-1'>
                                <CFormInput
                                    type="file"
                                    size="lg"
                                    label="Upload de Arquivo"
                                    name='file'
                                    multiple
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
                    <CButton color="primary" onClick={handleUpload} >
                        Salvar
                    </CButton>
                </CModalFooter>
            </CModal>
        </Fragment >
    )
}

export default AddDocuments;