import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../services/api'
import useAuthContext from '../../contexts/Auth';

import { IconContext } from 'react-icons';
import { IoMdAdd } from 'react-icons/io';
import { CButton, CCol, CContainer, CFormCheck, CFormInput, CFormTextarea, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from '@coreui/react';

const AddNotas = ({ data, setData }) => {
    const [open, setOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState('');
    const [nota, setNota] = useState({
        title: '',
        description: '',
        color: '',
    })

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
    const handleClose = () => {setOpen(false); setError(null)};

    const handleColorButtonClick = (event) => {
        const color = event.target.value;
        setNota({ ...nota, color: color });
        setSelectedColor(color);
    };

    const handleEdit = (event) => {
        const { name, value } = event.target;

        (value.length <= 255) ? setNota({
            ...nota,
            [name]: value,
        }) : alert("Limite de caracteres atingido");
    };

    const submit = async () => {
        try {
            const response = await api.post(`groups/${id}/notes`, nota)
            setData([...data, response.data]);
            setMessage('Nota criada com sucesso!')
            setMessageType('success');
            setShowMessage(true);
            handleClose();
        } catch (error) {
            setError(true);
            setMessageErrors(error.response.data)
        }
    }

    return (
        <Fragment>
            <IconContext.Provider value={{ size: 22 }}>
                <CButton onClick={handleOpen} className="mb-3" color="null" style={{ background: '#2978A0', color: 'white' }}>
                    <IoMdAdd /> Adicionar Notas
                </CButton>
            </IconContext.Provider>
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
                                    value={nota.title}
                                    onChange={handleEdit}
                                    feedbackInvalid={messageErrors.title}
                                    invalid={error}
                                />
                                <CFormTextarea
                                    label="Descrição"
                                    placeholder="Insira aqui sua nota"
                                    value={nota.description}
                                    name='description'
                                    onChange={handleEdit}
                                    rows={5}
                                    feedbackInvalid={messageErrors.description}
                                    invalid={error}
                                />
                                <p className='mb-0'>Cor</p>
                                <div className='d-flex gap-3 mt-0'>
                                    <CFormCheck
                                        type='radio'
                                        name='color'
                                        style={{ width: '30px', height: '30px', backgroundColor: "#a3e645" }}
                                        value='green'
                                        checked={selectedColor === 'green'}
                                        onChange={handleColorButtonClick}
                                        feedbackInvalid={messageErrors.color}
                                        invalid={error}
                                    />

                                    <CFormCheck
                                        type='radio'
                                        name='color'
                                        style={{ width: '30px', height: '30px', backgroundColor: "#fae332" }}
                                        value='yellow'
                                        checked={selectedColor === 'yellow'}
                                        onChange={handleColorButtonClick}
                                        feedbackInvalid={messageErrors.color}
                                        invalid={error}
                                    />

                                    <CFormCheck
                                        type='radio'
                                        name='color'
                                        style={{ width: '30px', height: '30px', backgroundColor: "#38ccf5" }}
                                        value='blue'
                                        checked={selectedColor === 'blue'}
                                        onChange={handleColorButtonClick}
                                        feedbackInvalid={messageErrors.color}
                                        invalid={error}
                                    />

                                    <CFormCheck
                                        type='radio'
                                        name='color'
                                        style={{ width: '30px', height: '30px', backgroundColor: "#FD5E53" }}
                                        value='red'
                                        checked={selectedColor === 'red'}
                                        onChange={handleColorButtonClick}
                                        feedbackInvalid={messageErrors.color}
                                        invalid={error}
                                    />
                                </div>
                            </CCol>
                        </CRow>
                    </CContainer>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={handleClose}>
                        Fechar
                    </CButton>
                    <CButton style={{ background: '#548CA8', color: 'white' }} onClick={submit}>
                        Salvar
                    </CButton>
                </CModalFooter>
            </CModal>
        </Fragment>
    );
};

export default AddNotas;
