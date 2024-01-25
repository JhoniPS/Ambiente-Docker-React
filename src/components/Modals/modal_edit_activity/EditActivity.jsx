import React, { Fragment, useState } from 'react';
import useAuthContext from '../../contexts/Auth';
import api from '../../../services/api'
import { CButton, CCol, CContainer, CFormInput, CFormTextarea, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from '@coreui/react';
import { AiFillEdit } from 'react-icons/ai';
import { useParams } from 'react-router-dom';


const EditActivity = ({ data, setData }) => {
    const [open, setOpen] = useState(false);
    const [Atividade, setAtividade] = useState({
        name: "string",
        description: "string",
        start_date: "string",
        end_date: "string"
    })

    const { id } = useParams();

    const { setMessageType, setShowMessage, setMessage } = useAuthContext();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const submit = async () => {
        try {
            const response = await api.put(`activity/${id}`)
            setData([...data, response.data]);
            setMessage('Nota criada com sucesso!')
            setMessageType('success');
            setShowMessage(true);
            handleClose();
        } catch (error) {
            setMessage(`Ops! algo deu errado ${error.response.data.errors}`)
            setMessageType('error');
            setShowMessage(true);
            handleClose();
        }
    }

    return (
        <Fragment>
            <CButton color='transparent' style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); }}>
                <AiFillEdit size={20} color='blue' />
            </CButton>
            <CModal
                alignment="center"
                visible={open}
                onClose={handleClose}
                aria-labelledby="VerticallyCenteredScrollableExample"
            >
                <CModalHeader>
                    <CModalTitle id="editarNota">Editar Reunião</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CContainer>
                        <CRow>
                            <CCol className='d-flex flex-column gap-2'>
                                <CFormInput
                                    type="text"
                                    label="Titulo"
                                    name="title"

                                />
                                <CFormTextarea
                                    label="Descrição"
                                    placeholder="Insira aqui sua nota"

                                    name='description'

                                    rows={5}
                                />
                                <p className='mb-0'>Cor</p>
                            </CCol>
                        </CRow>
                    </CContainer>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={handleClose}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={submit}>
                        Salvar
                    </CButton>
                </CModalFooter>
            </CModal>
        </Fragment>
    );
};

export default EditActivity;
