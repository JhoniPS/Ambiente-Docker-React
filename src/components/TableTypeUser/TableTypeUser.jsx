import React from 'react';
import { Table } from 'antd';
import { IoTrash } from "react-icons/io5";

import style from './TableTypeUser.module.css'
import { IconContext } from 'react-icons';

const handlDelete = () => {
  alert("Delete");
};

const columns = [
  {
    title: 'Tipos de usuario',
    dataIndex: 'type',
    width: 150,
    align: 'center',
    render: (type) => `${type}`,
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

  const data = [];

  for (let i = 0; i < 3; i++) {
    data.push({
      key: i,
      type: `type ${i}`,
    });
  }

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        defaultPageSize: 10,
      }}
    />
  );
};

export default TableTypeUser;