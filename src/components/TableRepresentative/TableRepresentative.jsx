import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useParams } from 'react-router-dom';
import style from './TableRepresentative.module.css'
import api from '../../services/api';

const columns = [
  {
    title: 'Nome',
    dataIndex: 'name',
    width: '20%',
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
    width: '20%',
  },
];


const TableRepresentative = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await api.get(`group/${id}`).then((response) => {
          const users = response.data.data.representatives;
          setData(users);
          setLoading(false);
        })
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

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

export default TableRepresentative;