import React from "react";
import style from './TableDetalhes.module.css';
import { Divider } from 'antd';

const TableDetalhe = ({ dados }) => {
    return (
        <>
            <table className={style.detalhes_tabela}>
                <tr>
                    <th>Portaria Interna</th>
                    <th>Conselho</th>
                    <th>Orgão</th>
                    <th>Unidade</th>
                </tr>
                <tr>
                    <td className={style.conteudo}>conteudo</td>
                    <td>conteudo</td>
                    <td>conteudo</td>
                    <td>conteudo</td>
                </tr>
            </table>
            <Divider />
            <table className={style.detalhes_tabela}>
                <tr>
                    <th>Entidade</th>
                    <th>Sigla</th>
                    <th>Time</th>
                    <th>Tipo de Grupo</th>
                </tr>
                <tr>
                    <td>conteudo</td>
                    <td>conteudo</td>
                    <td>conteudo</td>
                    <td>conteudo</td>
                </tr>
            </table>
            <Divider />
            <table className={style.detalhes_tabela}>
                <tr>
                    <th>Oficio Solicitado</th>
                    <th>Oficio Indicado</th>
                    <th>Email</th>
                    <th>Data de criação</th>
                </tr>
                <tr>
                    <td>conteudo</td>
                    <td>conteudo</td>
                    <td>conteudo</td>
                    <td>conteudo</td>
                </tr>
            </table>
        </>
    );
}

export default TableDetalhe;