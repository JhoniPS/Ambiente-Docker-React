import React, { useEffect, useState } from 'react';
// import api from '../../services/api';
import { Table } from 'antd';
import style from './TableDocumentos.module.css'

// import ModalDeleteUser from '../Modals/modal_delete_user/ModalDeleteUser';
// import ModalEditUser from '../Modals/modal_edit_user/ModalEditUser'

const TableDocumentos = ({ data, setData }) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // setLoading(true);
        // await api.get('users').then((response) => {
        //   const users = response.data.data;
        //   setData(users);
        //   setLoading(false);
        // });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [setData]);

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
    },
    {
      title: 'Arquivo',
      dataIndex: 'type_user',
    },
    {
      title: 'Tamanho',
      dataIndex: 'email',
    },
    {
      title: 'Criado em',
      dataIndex: '',
    }
  ];

  return (
    <Table
      className={style.table}
      bordered
      rowKey={(record) => record.id}
      columns={columns}
      dataSource={data}
      responsive
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

export default TableDocumentos;