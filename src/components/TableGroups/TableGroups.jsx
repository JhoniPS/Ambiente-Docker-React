import React, { useState, useEffect } from 'react';
import { MaterialReactTable, } from 'material-react-table';
import api from '../../services/api';
import Cookies from 'js-cookie'

import { useNavigate } from 'react-router-dom';
import ModalDeleteGroup from '../Modals/modal_delete_group/ModalDeleteGroup';
import ModalEditGroup from '../Modals/modal_edit_group/ModalEditGroup';

const TableGroups = ({ rota, data, setData }) => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const userRole = Cookies.get('userType');

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

    const columns = [
        {
            id: 'Tipo do grupo',
            header: 'Tipo do grupo',
            accessorFn: (row) => row.type_group.type,
        },
        {
            id: 'Nome',
            header: 'Nome',
            accessorFn: (row) => row.type_group.name,
        },
        {
            id: 'Equipe',
            header: 'Equipe',
            accessorKey: 'team',
        },
        {
            id: 'Orgão',
            header: 'Orgão',
            accessorKey: 'organ',
        },
        {
            id: 'Conselho',
            header: 'Conselho',
            accessorKey: 'council',
        },
        {
            id: 'E-mail',
            header: 'E-mail',
            accessorKey: 'email',
        },
        {
            header: 'Detalhes',
            accessorKey: 'id',
            Cell: ({ row }) => (
                <div
                    style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}
                    onClick={() => handleRowClick(row.original)}
                >
                    Detalhes
                </div>
            ),
        },
    ];

    // Condicionalmente adiciona a coluna 'Operações' se o tipo de usuário for representante'
    if (userRole === 'gerente') {
        columns.push({
            id: "Operações",
            header: null,
            accessorKey: 'id',
            columnDefType: 'display',
            Cell: ({ row }) => (
                <div className="d-flex">
                    <ModalDeleteGroup id={row.original.id} data={data} setData={setData} />
                    <ModalEditGroup id={row.original.id} data={data} setData={setData} />
                </div>
            ),
        });
    }

    const handleRowClick = (record) => {
        navigate(`/${rota}/${record.id}`);
    };

    return (
        <MaterialReactTable
            rowKey={(record) => record.id}
            columns={columns}
            data={data}
            enableColumnFilterModes
            enableColumnOrdering
            enableGlobalFilter
            paginationDisplayMode='pages'

            muiTablePaperProps={{
                elevation: 0,
                sx: {
                    borderRadius: '0',
                    border: '1px solid #e0e0e0',
                    boxShadow: 'none',
                },
            }}

            muiTableProps={{
                sx: {
                    tableLayout: 'fixed',
                },
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