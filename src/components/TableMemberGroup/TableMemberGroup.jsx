import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'antd';
import Cookies from 'js-cookie'

import ModalDeleteMember from '../Modals/modal_delete_member/ModalDeleteMember';
import ModalEditMember from '../Modals/modal_edit_member/ModalEditMember';

import { MaterialReactTable } from 'material-react-table';

const TableMemberGroup = ({ members, setMembers }) => {
  const { id } = useParams();
  const userRole = Cookies.get('userType');

  const columns = [
    {
      id: 'Nome',
      header: 'Nome',
      accessorFn: (row) => row.user.name,
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
      accessorFn: (row) => formatarData(row.created_at),
    },
    {
      id: 'Data de saida',
      header: 'Data de saida',
      accessorFn: (row) => formatarData(row.departure_date),
    },
    {
      id: 'E-mail',
      header: 'E-mail',
      accessorFn: (row) => row.user.email,
    },
  ];

  if (userRole === 'representante') {
    columns.push({
      id: "Operações",
      header: null,
      accessorKey: 'id',
      columnDefType: 'display',
      Cell: ({ row }) => (
        <div className="d-flex">
          <ModalDeleteMember memberId={row.original.id} groupId={id} data={members} setData={setMembers} />
          <ModalEditMember memberId={row.original.id} data={members} setData={setMembers} />
        </div>
      ),
    });
  }

  function formatarData(created_at) {
    const dt = new Date(created_at);
    const ano = dt.getFullYear();
    const mes = String(dt.getMonth() + 1).padStart(2, '0');
    const dia = String(dt.getDate()).padStart(2, '0');

    return `${dia}/${mes}/${ano}`;
  }

  return (
    // <Table
    //   rowKey={(record) => record.id}
    //   bordered
    //   columns={columns}
    //   dataSource={members}
    //   responsive={true}
    //   pagination={{
    //     current: page,
    //     pageSize: pageSize,
    //     onChange: (page, pageSize) => {
    //       setPage(page);
    //       setPageSize(pageSize);
    //     },
    //   }}
    // />
    <MaterialReactTable
      rowKey={(record) => record.id}
      columns={columns}
      data={members}
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

export default TableMemberGroup;
