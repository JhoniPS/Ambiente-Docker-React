import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'antd';

import ModalDeleteMember from '../Modals/modal_delete_member/ModalDeleteMember';
import ModalEditMember from '../Modals/modal_edit_member/ModalEditMember';

import style from './TableMemberGroupRepresentante.module.css';

const TableMemberGroupRepresentante = ({ members, setMembers }) => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'user',
      width: '10%',
      render: (user) => user.name,
    },
    {
      title: 'Cargo',
      dataIndex: 'role',
      width: '10%',
    },
    {
      title: 'Telefone',
      dataIndex: 'phone',
      width: '10%',
    },
    {
      title: 'Data de entrada',
      dataIndex: 'created_at',
      width: '10%',
      render: (created_at) => formatarData(created_at),
    },
    {
      title: 'Data de saida',
      dataIndex: 'departure_date',
      width: '10%',
    },
    {
      title: 'E-mail',
      dataIndex: 'user',
      width: '10%',
      render: (user) => user.email,
    },
    {
      title: 'Operações',
      dataIndex: 'id',
      width: '0.5%',
      render: (memberId) => (
        <div className={style.operation}>
          <ModalDeleteMember memberId={memberId} groupId={id} data={members} setData={setMembers} />
          <ModalEditMember memberId={memberId} data={members} setData={setMembers} />
        </div>
      ),
    },
  ];

  function formatarData(created_at) {
    const dt = new Date(created_at);
    const ano = dt.getFullYear();
    const mes = String(dt.getMonth() + 1).padStart(2, '0');
    const dia = String(dt.getDate()).padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
  }

  return (
    <div className={style.tableContainer}>
      <Table
        rowKey={(record) => record.id}
        bordered
        columns={columns}
        dataSource={members}
        responsive={true}
        pagination={{
          current: page,
          pageSize: pageSize,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
      />
    </div>
  );
};

export default TableMemberGroupRepresentante;
