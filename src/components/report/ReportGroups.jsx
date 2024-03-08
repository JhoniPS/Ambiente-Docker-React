import { CButton, CCol, CFormCheck, CFormInput, CFormSelect, CRow } from '@coreui/react'
import React from 'react'
import api from '../../services/api';

function ReportGroups() {

    const reportGroups = async () => {
        try {
            const response = await api.get('groups/download/', {
                filters: {
                    status: 'EM ANDAMENTO',
                    start_date: '2024-03-06',
                    end_date: '2024-03-10',
                    withFiles: false
                }
            });

            console.log('Resposta da API:', response.data);
        } catch (error) {
            console.error('Erro na solicitação:', error.response.errors);
        }
    }

    return (
        <div className='border p-2'>
            <CRow className='d-flex justify-content-between w-auto gap-4 p-0' xs={{ cols: 1 }} sm={{ cols: 1 }} md={{ cols: 1 }} lg={{ cols: 4 }} xl={{ cols: 4 }} xxl={{ cols: 4 }}>
                <CCol>
                    <CFormInput
                        type='date'
                        label="Data de inicio:"
                        size="sm"
                    />
                </CCol>

                <CCol>
                    <CFormInput
                        type='date'
                        label="Data de encerramento:"
                        size="sm"
                    />
                </CCol>

                <CCol>
                    <CFormSelect size="sm" label="Status:">
                        <option>-- selecione --</option>
                        <option value="EM ANDAMENTO">EM ANDAMENTO</option>
                        <option value="FINALIZADO">FINALIZADO</option>
                    </CFormSelect>
                </CCol>

                <CRow className='d-flex justify-content-center w-100' xs={{ cols: 1 }} sm={{ cols: 1 }} md={{ cols: 2 }} lg={{ cols: 2 }} xl={{ cols: 2 }} xxl={{ cols: 2 }}>
                    <CCol>
                        <CFormCheck id="checkRelatorio" label="Obter relatório com arquivos dos grupos?" />
                    </CCol>

                    <CCol className='w-auto'>
                        <CButton size="sm" onClick={async () => await reportGroups()}>Baixar Relatório</CButton>
                    </CCol>
                </CRow>
            </CRow>
        </div>
    )
}

export default ReportGroups