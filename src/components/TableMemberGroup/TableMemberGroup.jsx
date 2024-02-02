import React from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie'
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';

import ModalDeleteMember from '../Modals/modal_delete_member/ModalDeleteMember';
import ModalEditMember from '../Modals/modal_edit_member/ModalEditMember';

import { MaterialReactTable } from 'material-react-table';

const TableMemberGroup = ({ members, setMembers }) => {
  const { id } = useParams();
  const userRole = Cookies.get('userType');

  const columns = [
    {
      id: 'E-mail',
      header: 'E-mail',
      accessorKey: 'email',
    },
    {
      id: 'Cargo',
      header: 'Cargo',
      accessorKey: 'role',
    },
    {
      id: 'Telefone',
      header: 'Telefone',
      accessorKey: 'phone',
    },
    {
      id: 'Data de entrada',
      header: 'Data de entrada',
      accessorFn: (row) => formatarData(row.entry_date),
    },
    {
      id: 'Data de saida',
      header: 'Data de saida',
      accessorFn: (row) => formatarData(row.departure_date),
    },
  ];

  if (userRole === 'representante') {
    columns.push({
      id: "Operações",
      header: null,
      columnDefType: 'display',
      Cell: ({ row }) => (
        <div className="d-flex">
          <ModalDeleteMember memberId={row.original.id} groupId={id} data={members} setData={setMembers} />
          <ModalEditMember memberId={row.original.id} groupId={id} data={members} setData={setMembers} />
        </div>
      ),
    });

  }

  function formatarData(entry_date) {
    const dt = new Date(entry_date);
    const ano = dt.getFullYear();
    const mes = String(dt.getMonth() + 1).padStart(2, '0');
    const dia = String(dt.getDate()).padStart(2, '0');

    return `${dia}/${mes}/${ano}`;
  }

  return (
    <MaterialReactTable
      rowKey={(record) => record.id}
      columns={columns}
      data={members}
      enableColumnFilterModes
      enableColumnOrdering
      enableGlobalFilter
      paginationDisplayMode='pages'
      localization={MRT_Localization_PT_BR}
      muiTablePaperProps={{
        elevation: 0,
        sx: { borderRadius: '0', border: '1px solid #e0e0e0', boxShadow: 'none' },
      }}

      muiTableProps={{
        sx: {
          tableLayout: 'fixed',
        },
      }}
    />
  );
};

export default TableMemberGroup;
