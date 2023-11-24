import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Table } from 'antd';
import style from './TableUser.module.css'

import ModalDeleteUser from '../Modals/modal_delete_user/ModalDeleteUser';
import ModalEditUser from '../Modals/modal_edit_user/ModalEditUser'

const TableUser = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await api.get('users').then((response) => {
          const users = response.data.data;
          setData(users);
          setLoading(false);
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
    },
    {
      title: 'Tipo de usuario',
      dataIndex: 'type_user',
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
    },
    {
      title: 'Operações',
      dataIndex: 'id',
      align: 'center',
      width: '5%',
      render: (id) => (
        <div className={style.operation}>
          <ModalDeleteUser id={id} data={data} setData={setData} />
          <ModalEditUser id={id} data={data} setData={setData} />
        </div>
      ),
    },
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

export default TableUser;