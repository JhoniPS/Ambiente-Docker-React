import React from "react";
import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";

const TableDetalhe = ({ data }) => {

    function formatarData(dt) {
        const dataObj = new Date(dt);
        const ano = dataObj.getFullYear();
        const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
        const dia = String(dataObj.getDate()).padStart(2, '0');

        return `${dia}/${mes}/${ano}`;
    }

    return (
        <CTable responsive>
            <CTableHead>
                <CTableRow>
                    <CTableHeaderCell scope="col" style={{ padding: '15px', fontSize: 20 }}>Tipo de Grupo</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '15px', fontSize: 20 }}>Sigla</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '15px', fontSize: 20 }}>Orgão</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '15px', fontSize: 20 }}>Conselho</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                <CTableRow>
                    <CTableDataCell style={{ padding: '15px', color: '#677970' }}>{data.type_group?.type}</CTableDataCell>
                    <CTableDataCell style={{ padding: '15px', color: '#677970' }}>{data.acronym}</CTableDataCell>
                    <CTableDataCell style={{ padding: '15px', color: '#677970' }}>{data.organ}</CTableDataCell>
                    <CTableDataCell style={{ padding: '15px', color: '#677970' }}>{data.council}</CTableDataCell>
                </CTableRow>
            </CTableBody>

            <CTableHead>
                <CTableRow>
                    <CTableHeaderCell scope="col" style={{ padding: '15px', fontSize: 20 }}>Entidade</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '15px', fontSize: 20 }}>Unidade</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '15px', fontSize: 20 }}>Time</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '15px', fontSize: 20 }}>Portaria Interna</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                <CTableRow>
                    <CTableDataCell style={{ padding: '15px', color: '#677970' }}>{data.entity}</CTableDataCell>
                    <CTableDataCell style={{ padding: '15px', color: '#677970' }}>{data.unit}</CTableDataCell>
                    <CTableDataCell style={{ padding: '15px', color: '#677970' }}>{data.team}</CTableDataCell>
                    <CTableDataCell style={{ padding: '15px', color: '#677970' }}>{data.internal_concierge}</CTableDataCell>
                </CTableRow>
            </CTableBody>

            <CTableHead>
                <CTableRow>
                    <CTableHeaderCell scope="col" style={{ padding: '15px', fontSize: 20 }}>Oficio Solicitado</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '15px', fontSize: 20 }}>Oficio Indicado</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '15px', fontSize: 20 }}>Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '15px', fontSize: 20 }}>Data de criação</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                <CTableRow>
                    <CTableDataCell style={{ padding: '15px', color: '#677970' }}>{data.office_requested}</CTableDataCell>
                    <CTableDataCell style={{ padding: '15px', color: '#677970' }}>{data.office_indicated}</CTableDataCell>
                    <CTableDataCell style={{ padding: '15px', color: '#677970' }}>{data.email}</CTableDataCell>
                    <CTableDataCell style={{ padding: '15px', color: '#677970' }}>{formatarData(data.created_at)}</CTableDataCell>
                </CTableRow>
            </CTableBody>
        </CTable>
    );

}

export default TableDetalhe;
