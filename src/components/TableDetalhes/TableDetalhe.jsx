import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from '../../services/api';
import { Divider } from 'antd';
import useAuthContext from '../contexts/Auth';
import style from './TableDetalhes.module.css';

const TableDetalhe = () => {
    const { token } = useAuthContext();
    const { id } = useParams();

    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    const response = await api.get(`group/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const group = response.data.data;
                    setData(group);
                } catch (error) {
                    console.log(error);
                }
            }
        };

        fetchData();
    }, [token, id]);

    function formatarData() {
        const dt = new Date(data.created_at);
        const ano = dt.getFullYear();
        const mes = String(dt.getMonth() + 1).padStart(2, '0');
        const dia = String(dt.getDate()).padStart(2, '0');

        return `${ano}-${mes}-${dia}`;
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
                        <td>{formatarData(data)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default TableDetalhe;