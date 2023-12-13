import React from "react";
import { Divider } from 'antd';
import style from './TableDetalhes.module.css';

const TableDetalhe = ({ data }) => {

    function formatarData(dt) {
        const dataObj = new Date(dt);
        const ano = dataObj.getFullYear();
        const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
        const dia = String(dataObj.getDate()).padStart(2, '0');

        return `${dia}/${mes}/${ano}`;
    }

    return (
        <div className={style.detalhes}>
            <table className={style.detalhes_tabela}>
                <thead>
                    <tr>
                        <th>Portaria Interna</th>
                        <th>Conselho</th>
                        <th>Orgão</th>
                        <th>Unidade</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{data.internal_concierge}</td>
                        <td>{data.council}</td>
                        <td>{data.organ}</td>
                        <td>{data.unit}</td>
                    </tr>
                </tbody>
            </table>
            <Divider />
            <table className={style.detalhes_tabela}>
                <thead>
                    <tr>
                        <th>Entidade</th>
                        <th>Sigla</th>
                        <th>Time</th>
                        <th>Tipo de Grupo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{data.entity}</td>
                        <td>{data.acronym}</td>
                        <td>{data.team}</td>
                        <td>{data.type_group?.type}</td>
                    </tr>
                </tbody>
            </table>
            <Divider />
            <table className={style.detalhes_tabela}>
                <thead>
                    <tr>
                        <th>Oficio Solicitado</th>
                        <th>Oficio Indicado</th>
                        <th>Email</th>
                        <th>Data de criação</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{data.office_requested}</td>
                        <td>{data.office_indicated}</td>
                        <td>{data.email}</td>
                        <td>{formatarData(data.created_at)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default TableDetalhe;
