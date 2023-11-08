import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'antd';

import style from './TableMemberGroup.module.css'
import useAuthContext from '../contexts/Auth';
import api from '../../services/api';

const columns = [
  {
    title: 'Nome',
    dataIndex: 'name',
    width: '10%',
  },
  {
    title: 'Cargo',
    dataIndex: 'cargo',
    width: '10%',
  },
  {
    title: 'Telefone',
    dataIndex: 'fone',
    width: '10%',
  },
  {
    title: 'Data de entrada',
    dataIndex: 'fone',
    width: '10%',
  },
  {
    title: 'Data de saida',
    dataIndex: 'fone',
    width: '10%',
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
    width: '10%',
  },
];


const TableMemberGroup = () => {
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
          const response = await api.get(`group/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          const users = response.data.data.members;
          setData(users);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [token, id]);

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

export default TableMemberGroup;