import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import useAuthContext from '../contexts/Auth';

import { useNavigate } from 'react-router-dom';
import { Table } from 'antd';
import style from './TableGroups.module.css'
import ModalDeleteGroup from '../Modals/modal_delete_group/ModalDeleteGroup';
import ModalEditGroup from '../Modals/modal_edit_group/ModalEditGroup';

const TableGroups = () => {
    const { token } = useAuthContext();
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    setLoading(true);
                    const { data } = await api.get('group', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const groups = data.data;
                    setData(groups);
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                }
            }
        };

        fetchData();
    }, [token]);

    const columns = [
        {
            title: 'Tipo do grupo',
            dataIndex: 'type_group',
            width: '20%',
            render: (type_group) => type_group.type
        },
        {
            title: 'Nome',
            dataIndex: 'type_group',
            width: '20%',
            render: (type_group) => type_group.name
        },
        {
            title: 'Equipe',
            dataIndex: 'team',
            width: '20%',
        },
        {
            title: 'Orgão',
            dataIndex: 'organ',
            width: '20%',
        },
        {
            title: 'Conselho',
            dataIndex: 'council',
            width: '20%',
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            width: '20%',
        },
        {
            title: 'Operações',
            dataIndex: 'id',
            width: 60,
            align: 'center',
            render: (id) => (
                <div className={style.operation}>
                    <ModalDeleteGroup id={id} data={data} setData={setData} />
                    <ModalEditGroup id={id} data={data} setData={setData} />
                </div>
            ),
        },
    ];

    const handleRowClick = (record) => {
        navigate(`/detalhes-de-grupos/${record.id}`);
    };

    return (
        <Table
            bordered
            className={style.table}
            rowKey={(record) => record.id}
            columns={columns}
            dataSource={data}
            responsive
            loading={loading}
            pagination={{
                current: page,
                pageSize: pageSize,
                onChange: (page, pageSize) => {
                    setPage(page);
                    setPageSize(pageSize)
                }
            }}
            onRow={(record) => {
                return {
                    onClick: () => handleRowClick(record),
                };
            }}
        />
    );
};

export default TableGroups;