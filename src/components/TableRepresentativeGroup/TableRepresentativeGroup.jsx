import React from 'react';
import { MaterialReactTable } from 'material-react-table';
import Cookies from 'js-cookie'
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';

import ModalDeleteRepresentiveGroup from '../Modals/modal_delete_representive_group/ModalDeleteRepresentiveGroup';
import ModalEditRepresentativeGroup from '../Modals/modal_edit_representante_group/ModalEditRepresentativeGroup';

//Problemas com o edit representantes
const TableRepresentativeGroup = ({ data, setData }) => {
  const userRole = Cookies.get('userType');

  const columns = [
    {
      id: 'Nome',
      header: 'Nome',
      accessorKey: 'name',
    },
    {
      id: 'E-mail',
      header: 'E-mail',
      accessorKey: 'email',
    },
  ];

  if (userRole === 'gerente') {
    columns.push({
      id: "Operações",
      header: null,
      accessorKey: 'id',
      columnDefType: 'display',
      Cell: ({ row }) => (
        <div className="d-flex">
          <ModalDeleteRepresentiveGroup id={row.original.id} data={data} setData={setData} />
          <ModalEditRepresentativeGroup id={row.original.id} data={data} setData={setData} />
        </div>
      ),
    });
  }

  return (
    <MaterialReactTable
      rowKey={(record) => record.id}
      columns={columns}
      data={data}
      enableColumnFilterModes
      enableColumnOrdering
      enableGlobalFilter
      paginationDisplayMode='pages'
      localization={MRT_Localization_PT_BR}
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

export default TableRepresentativeGroup;