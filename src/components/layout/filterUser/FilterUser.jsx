import React, { Fragment, useState } from 'react';

import SubmitButton from '../submitbuttun/SubmitButton';
import { IconContext } from 'react-icons';
import { HiXMark } from "react-icons/hi2";
import { IoIosFunnel } from "react-icons/io";
import style from './filter.module.css'
import api from '../../../services/api';
import {
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CFormLabel,
    CFormInput,
} from '@coreui/react';

const FilterUser = ({ setData }) => {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handlSubmit = async (e) => {
        e.preventDefault();
        await api.get(`users?email=${email}`).then((response) => {
            setData(response.data.data);
            handleClose();
            setEmail("");
        })
    }

    return (
        <Fragment>
            <IconContext.Provider value={{ size: 19 }}>
                <CButton onClick={handleOpen} className="button_filter btn d-flex align-items-center gap-3  rounded">
                    {<IoIosFunnel />}Filtro
                </CButton>
            </IconContext.Provider>
            <CModal
                visible={open}
                alignment="center"
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <CModalHeader onClose={handleClose}>
                    <CModalTitle id="LiveDemoExampleLabel">Filtrar</CModalTitle>
                </CModalHeader>
                <CModalBody className='d-flex flex-column gap-2'>
                    <CFormLabel>Usuário</CFormLabel>
                    <CFormInput
                        type="text"
                        id="Input1"
                        placeholder="nome completo"
                        aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormLabel>Email</CFormLabel>
                    <CFormInput
                        type="email"
                        id="Input2"
                        placeholder="name@example.com"
                        aria-describedby="exampleFormControlInputHelpInline"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={handleClose}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={handlSubmit}>Save changes</CButton>
                </CModalFooter>
            </CModal>
        </Fragment>
    )
}

export default FilterUser;