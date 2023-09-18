import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Table } from 'antd';
import { IoTrash, IoPencilSharp } from "react-icons/io5";
import { IconContext } from 'react-icons';
import api from '../../services/api'

import style from './TableUser.module.css'


const handlDelete = () => {
  alert("Delete");
};


const columns = [
  {
    title: 'Nome',
    dataIndex: 'name',
    render: (name) => `${name}`,
  },
  {
    title: 'Tipo de usuario',
    dataIndex: 'type_user_id',
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
  },
  {
    title: 'Operações',
    dataIndex: 'operation',
    align: 'center',
    render: () => (
      <div className={style.operation}>
        <IconContext.Provider value={{ color: "#93000A", size: 20 }}>
          <button onClick={handlDelete}>
            <IoTrash />
          </button>
        </IconContext.Provider>

        <IconContext.Provider value={{ color: "#2C74AC", size: 20 }}>
          <NavLink to='/editUser'>
            <IoPencilSharp />
          </NavLink>
        </IconContext.Provider>
      </div>
    ),
  },
];

const TableUser = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        '/users/'
      );

      const users = response.data.map((user) => ({
        ...user,
        key: user.id,
      }));

      setData(users);
      setLoading(false);
      setTableParams(state => ({
        ...state,
        pagination: {
          ...state.pagination,
        },
      }));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <Table
      className={style.table}
      rowKey={(record) => (record.login && record.login.uuid) || record.key}
      columns={columns}
      dataSource={data}
      responsive
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};

export default TableUser;