import React, { useState, useEffect } from 'react';
import { useParams} from "react-router-dom";
import api from '../../services/api';
import useAuthContext from '../contexts/Auth';
import { Table } from 'antd';

const TableGroupsDescription = () => {
    const { token } = useAuthContext();
    const { id } = useParams();
    const [data, setData] = useState([]);

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
                    setData([group]);
                } catch (error) {
                    console.log(error);
                }
            }
        };

        fetchData();
    }, [token, id]);

    const getMembersCount = (members) => {
        return members ? members.length : null;
    };

    const getRepresentativesCount = (representatives) => {
        return representatives ? representatives.length : null;
    };


    const columns = [
        {
            title: 'Criado por',
            dataIndex: 'created_by',
            width: '1%',
            render: (created_by) => created_by.name
        },
        {
            title: 'Membros do grupo',
            dataIndex: 'members',
            width: '1%',
            render: (members) => getMembersCount(members)
        },
        {
            title: 'Representantes do grupo',
            dataIndex: 'representatives',
            width: '2%',
            render: (representatives) => getRepresentativesCount(representatives)
        },
    ];

    return (
        <Table
            rowKey={(record) => record.id}
            columns={columns}
            dataSource={data}
            components={{
                header: {
                    cell: (props) => (
                        <th style={{
                            background: 'none',
                            border: 'none',
                            color: '#000000B5',
                            fontFamily: 'Roboto',
                            fontSize: '20px',
                            fontWeight: '700',
                            lineHeight: '30px',
                            letterSpacing: '0px',
                            textAlign: 'left',
                        }}>
                            {props.children}
                        </th>
                    ),
                },

                body: {
                    cell: (props) => (
                        <td style={{
                            border: 'none',
                            fontFamily: 'Roboto',
                            fontSize: '30px',
                            fontWeight: '700',
                            lineHeight: '20px',
                            textAlign: 'left',
                        }}>{props.children}</td>
                    ),
                },
            }}
            pagination={false}
            responsive
        />
    );
};

export default TableGroupsDescription;