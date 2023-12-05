import React from 'react';
import { Table } from 'antd';


const TableGroupsDescription = ({ description }) => {
    const data = [description]

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
            render: (created_by) => created_by ? created_by.name : 'N/A'
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