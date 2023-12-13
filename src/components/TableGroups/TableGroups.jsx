import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import { useNavigate } from 'react-router-dom';
import { Table } from 'antd';
import style from './TableGroups.module.css'
import ModalDeleteGroup from '../Modals/modal_delete_group/ModalDeleteGroup';
import ModalEditGroup from '../Modals/modal_edit_group/ModalEditGroup';

const TableGroups = ({ rota, data, setData }) => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data } = await api.get('group');
                const groups = data.data;
                setData(groups);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [setData]);

    const baseColumns = [
        {
            title: 'Tipo do grupo',
            dataIndex: 'type_group',
            render: (type_group) => type_group.type
        },
        {
            title: 'Nome',
            dataIndex: 'type_group',
            render: (type_group) => type_group.name
        },
        {
            title: 'Equipe',
            dataIndex: 'team',
        },
        {
            title: 'Orgão',
            dataIndex: 'organ',
        },
        {
            title: 'Conselho',
            dataIndex: 'council',
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
        },
    ];

    // Condicionalmente adiciona a coluna 'Operações' se a rota for diferente de 'groups-representante'
    if (rota === 'detalhes-de-grupos-gerente') {
        baseColumns.push({
            title: 'Operações',
            dataIndex: 'id',
            align: 'center',
            width: '0.1%',
            render: (id) => (
                <div className={style.operation}>
                    <ModalDeleteGroup id={id} data={data} setData={setData} />
                    <ModalEditGroup id={id} data={data} setData={setData} />
                </div>
            ),
        });
    }

    const handleRowClick = (record) => {
        navigate(`/${rota}/${record.id}`);
    };

    return (
        <Table
            bordered={true}
            rowKey={(record) => record.id}
            columns={baseColumns}
            dataSource={data}
            responsive={true}
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