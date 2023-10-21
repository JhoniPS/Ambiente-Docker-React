import React, { useEffect, useState } from 'react';
import useAuthContext from '../contexts/Auth';
import api from '../../services/api';

import { NavLink } from 'react-router-dom';
import { Table } from 'antd';
import { IoTrash, IoPencilSharp } from "react-icons/io5";
import style from './TableUser.module.css'
import { IconContext } from 'react-icons';



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
        <IconContext.Provider value={{ color: "#93000A", size: 20 }}>
          <button onClick={() => handlDelete(id)}>
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


const handlDelete = async (id) => {
  try {
    await api.delete(`users/${id}`);
  } catch (error) {
    console.error(error);
  }
};

const TableUser = () => {
  const { user } = useAuthContext();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
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
  }, [user]);

  return (
    <Table
      className={style.table}
      rowKey={(record) => record.id}
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

export default TableUser;