import React from 'react';
import { MaterialReactTable, } from 'material-react-table';

import ModalDeleteUser from '../Modals/modal_delete_user/ModalDeleteUser';
import ModalEditUser from '../Modals/modal_edit_user/ModalEditUser'

const TableUser = ({ data, setData }) => {

  const columns = [
    {
      header: 'Nome',
      accessorKey: 'name',
      size: 100,
    },
    {
      header: 'Tipo de usuario',
      accessorKey: 'type_user',
      size: 100,
    },
    {
      header: 'E-mail',
      accessorKey: 'email',
      size: 100,
    },

    {
      header: null,
      accessorKey: 'id',
      columnDefType: 'display',
      size: 20,
      Cell: ({ row }) => (
        <div className="d-flex justify-content-around">
          <ModalDeleteUser id={row.original.id} data={data} setData={setData} />
          <ModalEditUser id={row.original.id} data={data} setData={setData} />
        </div>
      ),
    },
  ]

  return (
    <MaterialReactTable
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

    />
  );
};

export default TableUser;
