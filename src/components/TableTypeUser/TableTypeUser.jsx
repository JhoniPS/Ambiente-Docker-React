import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { IoTrash } from "react-icons/io5";
import { IconContext } from 'react-icons';
import api from '../../services/api'

import style from './TableTypeUser.module.css'

const TableTypeUser = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTypeUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        '/group/type-user'
      );

      const types = response.data.map((type) => ({
        ...type,
        key: type.id,
      }));

      setData(types);
      setLoading(false);

    } catch (error) {
      console.log(error);
    }
  };

  const deleteType = async(id) => {
    try {
      await api.delete(`/group/type-user/${id}`);
      const updateDate = data.filter((type) => type.id !== id);
      setData(updateDate);
    } catch (error) {
      console.error('Error ao excluir o tipo de usário:', error);
    }
  };

  useEffect(() => {
    getTypeUsers();
  }, [])

  const columns = [
    {
      title: 'Tipos de usuario',
      dataIndex: 'name',
      width: 150,
      align: 'center',
      render: (name) => `${name}`,
    },

    {
      title: 'Operação',
      dataIndex: 'operation',
      width: '10%',
      align: 'center',
      render: (_, record) => (
        <div className={style.operation}>
          <IconContext.Provider value={{ color: "#93000A", size: 20 }}>
            <button onClick={() => deleteType(record.id)}>
              <IoTrash />
            </button>
          </IconContext.Provider>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{
        defaultPageSize: 10,
      }}
    />
  );
};

export default TableTypeUser;