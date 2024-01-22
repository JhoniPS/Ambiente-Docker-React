import React, { useEffect } from 'react';
import api from '../../services/api';
import Cookies from 'js-cookie'

import { MaterialReactTable, } from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { BsFolderFill } from "react-icons/bs";
import { CButton } from '@coreui/react';

import ModalDeleteGroup from '../Modals/modal_delete_group/ModalDeleteGroup';
import ModalEditGroup from '../Modals/modal_edit_group/ModalEditGroup';

const TableGroups = ({ rota, data, setData }) => {
    const userRole = Cookies.get('userType');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await api.get('group');
                const groups = data.data;
                setData(groups);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [setData]);

    const handleRowClick = (record) => {
        navigate(`/${rota}/${record.id}`);
    };

    const columns = [
        {
            id: 'Tipo do grupo',
            header: 'Tipo do grupo',
            accessorFn: (row) => row.type_group.type,
        },
        {
            id: 'situacao',
            header: 'Situação',
            accessorFn: (row) => row.status,
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
            id: 'Unidade',
            header: 'Unidade',
            accessorKey: 'unit',
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
            header: null,
            accessorKey: 'id',
            columnDefType: 'display',
            Cell: ({ row }) => (
                <div className='d-flex align-items-center'>
                    <IconContext.Provider value={{ color: '#1e212b', size: 25 }}>
                        <CButton onClick={() => handleRowClick(row.original)} color='null'>
                            <BsFolderFill />
                        </CButton>
                    </IconContext.Provider>

                    {userRole === 'gerente' && (
                        <div className="d-flex">
                            <ModalDeleteGroup id={row.original.id} data={data} setData={setData} />
                            <ModalEditGroup id={row.original.id} data={data} setData={setData} />
                        </div>
                    )}
                </div>
            ),
        },
    ];

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