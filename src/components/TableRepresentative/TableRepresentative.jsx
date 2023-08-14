import React from 'react';
import { NavLink } from 'react-router-dom';
import { Table } from 'antd';
import { IoTrash, IoPencilSharp } from "react-icons/io5";

import style from './TableRepresentative.module.css'
import { IconContext } from 'react-icons';

const handlDelete = () => {
  alert("Delete");
};

const columns = [
  {
    title: 'Nome',
    dataIndex: 'name',
    width: 150,
    align: 'center',
  },
  {
    title: 'Tipo de usuario',
    dataIndex: 'type',
    width: 150,
    align: 'center',
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
    width: 150,
    align: 'center',
  },
  {
    title: 'Operações',
    dataIndex: 'operation',
    width: 60,
    align: 'center',
    render: () => (
      <div className={style.operation}>
        <IconContext.Provider value={{ color: "#93000A", size: 20 }}>
          <button onClick={handlDelete}>
            <IoTrash />
          </button>
        </IconContext.Provider>

        <IconContext.Provider value={{ color: "#2C74AC", size: 20 }}>
          <NavLink to='/editRepresentante'>
            <IoPencilSharp />
          </NavLink>
        </IconContext.Provider>
      </div>
    ),
  },
];


const TableRepresentative = () => {

  const data = [];

  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Nome Exemplo ${i}`,
      type: `type ${i}`,
      email: `teste@teste.com`,
    });
  }

  return (
    <Table
      className={style.table}
      columns={columns}
      dataSource={data}
      responsive
      pagination={{
        defaultPageSize: 10,
      }}
    />
  );
};

export default TableRepresentative;