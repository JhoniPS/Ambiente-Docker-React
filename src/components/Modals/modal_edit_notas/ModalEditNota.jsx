import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../services/api'


import style from './ModalEditNota.module.css';
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

const ModalEditNota = ({ idNota, data, setData }) => {
    const [open, setOpen] = useState(false);
    const [nota, setNota] = useState({
        title: '',
        description: '',
        color: '',
    })

    const navigate = useNavigate();
    const { id } = useParams();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`notes/${idNota}`);
                const noteData = response.data;

                setNota({
                    title: noteData.title || '',
                    description: noteData.description || '',
                    color: noteData.color || '',
                });
            } catch (error) {
                console.error(error);
            }
        };

        if (open) {
            fetchData();
        }
    }, [idNota, open]);

    const handleColorButtonClick = (color) => {
        setNota({ ...nota, color: color });
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
            await api.put(`notes/${idNota}`, nota)

            const updatedData = data.map((item) => {
                if (item.id === idNota) {
                    return { ...item, ...nota };
                }
                return item;
            });

            setData(updatedData);
            navigate(`/detalhes-de-grupos-representante/${id}/notas`, {
                state: {
                    message: 'Atualizado com sucesso!',
                    messageType: 'success',
                    showMessage: true,
                }
            });
            handleClose();
        } catch (error) {
            navigate(`/detalhes-de-grupos-representante/${id}/notas`, {
                state: {
                    message: `Ops! algo deu errado ${error.response.data.errors}`,
                    messageType: 'error',
                    showMessage: true,
                }
            });
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
                                />
                                <CFormTextarea
                                    label="Descrição"
                                    placeholder="Insira aqui sua nota"
                                    value={nota.description}
                                    name='description'
                                    onChange={handleEdit}
                                    rows={5}
                                />
                                <p>Cor</p>
                                <div className='d-flex gap-3'>
                                    <button
                                        className={`d-flex rounded-circle`}
                                        style={{ width: '25px', height: '25px', background: "#BDF8C3", border: "1px solid rgba(0,0,0, 0.23)" }}
                                        onClick={() => handleColorButtonClick('green')}
                                    />
                                    <button
                                        className={`d-flex rounded-circle`}
                                        style={{ width: '25px', height: '25px', background: "#FFE08B", border: "1px solid rgba(0,0,0, 0.23)" }}
                                        onClick={() => handleColorButtonClick('yellow')}
                                    />
                                    <button
                                        className={`d-flex rounded-circle ${style.blue}`}
                                        style={{ width: '25px', height: '25px', background: "#2C74AC", border: "1px solid rgba(0,0,0, 0.23)" }}
                                        onClick={() => handleColorButtonClick('blue')}
                                    />
                                    <button
                                        className={`d-flex rounded-circle ${style.red}`}
                                        style={{ width: '25px', height: '25px', background: "#F2B8B5", border: "1px solid rgba(0,0,0, 0.23)" }}
                                        onClick={() => handleColorButtonClick('red')}
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
