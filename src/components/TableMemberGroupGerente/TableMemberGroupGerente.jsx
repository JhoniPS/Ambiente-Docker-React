import React, { useState } from 'react';
import { Table } from 'antd';

import style from './TableMemberGroupGerente.module.css'

const TableMemberGroupGerente = ({ members }) => {
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
            setPageSize(pageSize)
          }
        }}
      />
    </div>
  );
};

export default TableMemberGroupGerente;