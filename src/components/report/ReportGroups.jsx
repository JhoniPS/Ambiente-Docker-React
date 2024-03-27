import React, { useState } from 'react';
import api from '../../services/api';
import useAuthContext from '../contexts/Auth';

import {
    CButton,
    CCol,
    CFormInput,
    CFormSelect,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow
} from '@coreui/react';

import { BsFileEarmarkArrowDownFill } from "react-icons/bs";
import Message from '../layout/Message/Message';


function ReportGroup() {
    const [visible, setVisible] = useState(false);

    const [filters, setFilters] = useState({
        status: '',
        start_date: '',
        end_date: '',
        withFiles: 0,
    });

    const {
        message,
        messageType,
        showMessage,
        setShowMessage,
        setError,
        setMessage,
        setMessageType
    } = useAuthContext();

    const downloadFile = async (data, fileType, fileExtension) => {
        const blob = new Blob([new Uint8Array(data)], { type: fileType });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `relatorio.${fileExtension}`);
        document.body.appendChild(link);
        link.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
    };

    const reportGroup = async () => {
        try {
            const response = await api.get(`groups/download/`, {
                params: {
                    filters: {
                        status: filters.status,
                        start_date: filters.start_date,
                        end_date: filters.end_date,
                        withFiles: filters.withFiles,
                    },
                },
                responseType: 'arraybuffer',
            });

            if (response.data && response.data.byteLength > 0) {
                const fileType = filters.withFiles ? 'application/zip' : 'application/pdf';
                const fileExtension = filters.withFiles ? 'zip' : 'pdf';

                await downloadFile(response.data, fileType, fileExtension);
            } else {
                setError(true);
                setMessage('A resposta da API não contém dados do arquivo solicitado.');
                setMessageType('error');
                setShowMessage(true);
            }
        } catch (error) {
            setError(true);
            setMessage(`${error.response.errors}`);
            setMessageType('error');
            setShowMessage(true);
        }
    };

    return (
        <>
            <CButton color='null' style={{ background: '#2978A0', color: 'white' }} className='d-flex justify-content-center align-items-center gap-2 px-5' onClick={() => setVisible(!visible)}>
                <BsFileEarmarkArrowDownFill size={20} />
                Relatório
            </CButton>
            <CModal
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="LiveDemoExampleLabel"
            >
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle id="LiveDemoExampleLabel">Relatório de Grupos</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow
                        className='d-flex justify-content-between w-auto gap-4 p-0'
                        xs={{ cols: 1 }}
                        sm={{ cols: 1 }}
                        md={{ cols: 1 }}
                        lg={{ cols: 1 }}
                        xl={{ cols: 1 }}
                        xxl={{ cols: 1 }}
                    >
                        <CCol>
                            <CFormSelect
                                aria-label='Status'
                                value={filters.status}
                                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                            >
                                <option value=''>-- selecione o status --</option>
                                <option value='EM ANDAMENTO'>EM ANDAMENTO</option>
                                <option value='FINALIZADO'>FINALIZADO</option>
                            </CFormSelect>
                        </CCol>

                        <CCol>
                            <CFormInput
                                type='date'
                                id='start_date'
                                placeholder='Data de Início'
                                value={filters.start_date}
                                onChange={(e) => setFilters({ ...filters, start_date: e.target.value })}
                            />
                        </CCol>

                        <CCol>
                            <CFormInput
                                type='date'
                                id='end_date'
                                placeholder='Data de Fim'
                                value={filters.end_date}
                                onChange={(e) => setFilters({ ...filters, end_date: e.target.value })}
                            />
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Fechar
                    </CButton>
                    <CButton onClick={async () => await reportGroup()}>Baixar</CButton>
                </CModalFooter>
            </CModal>
            {showMessage && <Message type={messageType} msg={message} setShowMessage={setShowMessage} />}
        </>
    );
}

export default ReportGroup;
