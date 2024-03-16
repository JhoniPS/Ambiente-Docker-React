import { CButton, CCol, CRow, CFormSwitch } from '@coreui/react';
import React, { useState } from 'react';
import api from '../../services/api';
import { useParams } from 'react-router-dom';

function ReportGroup() {
    const { id } = useParams();

    const [withFiles, setWithFiles] = useState(true); // Inicializa com true

    const reportGroup = async () => {
        try {
            const params = {
                filters: {
                    withFiles: withFiles ? 1 : 0 // Converte booleano para 1 (true) ou 0 (false)
                }
            };

            const responseType = withFiles ? 'arraybuffer' : 'blob'; // Altera a resposta para arraybuffer ou blob dependendo do valor de withFiles

            const response = await api.get(`groups/${id}/download/`, {
                params,
                responseType,
            });

            if (response.data) {
                const contentType = withFiles ? 'application/zip' : 'application/pdf'; // Altera o tipo de conteúdo do blob dependendo do valor de withFiles

                const blob = new Blob([response.data], { type: contentType });

                const url = window.URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `relatorio.${withFiles ? 'zip' : 'pdf'}`); // Nome do arquivo dependendo do valor de withFiles
                document.body.appendChild(link);
                link.click();

                window.URL.revokeObjectURL(url);
                document.body.removeChild(link);
            } else {
                console.error('A resposta da API não contém dados do arquivo.');
            }
        } catch (error) {
            console.error('Erro na solicitação:', error.response ? error.response.errors : error.message);
        }
    };

    return (
        <div>
            <CRow
                className='d-flex justify-content-between align-items-center w-auto gap-4 p-0'
                xs={{ cols: 1 }}
                sm={{ cols: 1 }}
                md={{ cols: 1 }}
                lg={{ cols: 2 }}
                xl={{ cols: 2 }}
                xxl={{ cols: 2 }}
            >
                <CCol className='w-auto'>
                    <div>
                        <CFormSwitch
                            label={(withFiles) ? 'ZIP' : 'PDF'}
                            color="primary"
                            size="lg"
                            checked={withFiles}
                            onChange={() => setWithFiles(!withFiles)}
                        />
                    </div>
                </CCol>

                <CCol className='w-auto'>
                    <CButton size='sm' onClick={reportGroup}>
                        Baixar Relatório
                    </CButton>
                </CCol>
            </CRow>
        </div>
    );
}

export default ReportGroup;
