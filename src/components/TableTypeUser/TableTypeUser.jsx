import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Table, ConfigProvider } from 'antd';
import { IoTrash } from "react-icons/io5";

import style from './TableTypeUser.module.css'
import { IconContext } from 'react-icons';

const handlDelete = () => {
  alert("Delete");
};

const columns = [
  {
    title: 'Tipos de usuario',
    dataIndex: 'name',
    width: 150,
    align: 'center',
    render: (name) => `${name}`
  },

  {
    title: 'Operação',
    dataIndex: 'operation',
    width: '10%',
    align: 'center',
    render: () => (
      <div className={style.operation}>
        <IconContext.Provider value={{ color: "#93000A", size: 20 }}>
          <button onClick={handlDelete}>
            <IoTrash />
          </button>
        </IconContext.Provider>
      </div>
    ),
  },
];

const TableTypeUser = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchData = async () => {
    try {
      setLoading(true);
      await api.get('type-user').then(resp => {
        setData(resp.data);
        setLoading(false);
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorIconHover:"#000"
        },
      }}
    >
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        reponsive={true}
        loading={loading}
        pagination={{
          current: page,
          pageSize: pageSize,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize)
          },
        }}
      />
    </ConfigProvider>
  );
};

export default TableTypeUser;