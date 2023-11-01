import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import useAuthContext from '../contexts/Auth';
import { Table } from 'antd';

const TableGroupsDescription = () => {
    const { token } = useAuthContext();
    const [data, setData] = useState([]);
    // const [members, setMembers] = useState([]);
    // const [representatives, setRepresentatives] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    const { data } = await api.get('group', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const groups = data.data;
                    setData(groups);
                    // setMembers(data.data.members)
                    // setRepresentatives(data.data.representatives)
                } catch (error) {
                    console.log(error);
                }
            }
        };

        fetchData();
    }, [token]);

    const getMembersCount = (members) => {
        return members ? members.length : null;
    };
    
    // Função para mostrar a quantidade de representantes
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
                            lineHeight: '36px',
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
                            lineHeight: '36px',
                            letterSpacing: '0px',
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