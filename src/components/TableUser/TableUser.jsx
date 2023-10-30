import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Cookies from 'js-cookie'
import { Table } from 'antd';
import style from './TableUser.module.css'

import ModalDeleteUser from '../Modals/modal_delete_user/ModalDeleteUser';
import ModalEditUser from '../Modals/modal_edit_user/ModalEditUser'

const TableUser = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get('authToken');
      if (token) {
        try {
          setLoading(true);
          await api.get('users').then(resp => {
            setData(resp.data);
            setLoading(false);
          })
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      render: (name) => `${name}`,
    },
    {
      title: 'Tipo de usuario',
      dataIndex: 'type_user',
      render: (type) => `${type.name}`
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
    },
    {
      title: 'Operações',
      dataIndex: 'id',
      align: 'center',

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