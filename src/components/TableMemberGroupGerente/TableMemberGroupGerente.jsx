import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'antd';

import style from './TableMemberGroupGerente.module.css'
import useAuthContext from '../contexts/Auth';
import api from '../../services/api';

const TableMemberGroupGerente = () => {
  const { token } = useAuthContext();
  const { id } = useParams();
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          setLoading(true);
          const response = await api.get(`group/${id}/`);
          const users = response.data.data.members;
          console.log(users)
          setData(users);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [token, id]);

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
    <Table
      className={style.table}
      rowKey={(record) => record.id}
      bordered
      columns={columns}
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
    />
  );
};

export default TableMemberGroupGerente;