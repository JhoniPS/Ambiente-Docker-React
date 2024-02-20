import React, { Fragment, useState, useEffect } from 'react';
import api from '../../../services/api'
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
import { useParams } from 'react-router-dom';

const ModalEditNota = ({ idNota, data, setData }) => {
    const { id } = useParams();
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

    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false); setError(null) };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`groups/${id}/notes/${idNota}`);
                const noteData = response.data;

                setNota({
                    title: noteData.title || '',
                    description: noteData.description || '',
                    color: noteData.color || '',
                });
            } catch (error) {
                setMessage(`Ops! algo deu errado ${error.response.data}`)
                setMessageType('error');
                setShowMessage(true);
            }
        };

        if (open) {
            fetchData();
        }
    }, [idNota, open, id, setMessage, setMessageType, setShowMessage]);

    const handleColorButtonClick = (event) => {
        const color = event.target.value;
        setNota({ ...nota, color: color });
        setSelectedColor(color);
    };

    const handleEdit = (event) => {
        const { name, value } = event.target;
        setNota({
            ...nota,
            [name]: value,
        });
    };

    const submit = async () => {
        try {
            await api.put(`groups/${id}/notes/${idNota}`, nota)

            const updatedData = data.map((item) => {
                if (item.id === idNota) {
                    return { ...item, ...nota };
                }
                return item;
            });

            setData(updatedData);
            setMessage('Nota atualizada com sucesso!')
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
            <IconContext.Provider value={{ color: '#2C74AC', size: 20 }}>
                <CButton onClick={handleOpen} color='null'>
                    <IoPencilSharp />
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
                                <div className='d-flex gap-3'>
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
                        Close
                    </CButton>
                    <CButton color="primary" onClick={submit}>
                        Editar
                    </CButton>
                </CModalFooter>
            </CModal>
        </Fragment>
    );
};

export default ModalEditNota;