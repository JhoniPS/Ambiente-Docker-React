import { CButton, CCol, CFormCheck, CRow } from '@coreui/react'
import React from 'react'
import api from '../../services/api';
import { useParams } from 'react-router-dom';

function ReportGroup() {
    const { id } = useParams();

    const reportGroup = async () => {
        try {
            const response = await api.get(`groups/${id}/download/`, {
                filters: {
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
            <CRow className='d-flex justify-content-between w-auto gap-4 p-0' xs={{ cols: 1 }} sm={{ cols: 1 }} md={{ cols: 1 }} lg={{ cols: 2 }} xl={{ cols: 2 }} xxl={{ cols: 2 }}>
                <CCol>
                    <CFormCheck id="checkRelatorio" label="Obter relatório com arquivos dos grupos?" />
                </CCol>

                <CCol className='w-auto'>
                    <CButton size="sm" onClick={async () => await reportGroup()}>Baixar Relatório</CButton>
                </CCol>
            </CRow>
        </div>
    )
}

export default ReportGroup;