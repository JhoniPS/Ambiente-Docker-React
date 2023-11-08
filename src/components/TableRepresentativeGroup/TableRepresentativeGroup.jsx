import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Table } from 'antd';
import { IoTrash, IoPencilSharp } from "react-icons/io5";
import { IconContext } from 'react-icons';
import style from './TableRepresentativeGroup.module.css'

import useAuthContext from '../contexts/Auth';
import api from '../../services/api';

const handlDelete = () => {
  alert("Delete");
};

const columns = [
  {
    title: 'Nome',
    dataIndex: 'name',
    width:'20%',
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
    width:'20%',
  },
  {
    title: 'Operações',
    dataIndex: 'operation',
    width: '1%',
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


const TableRepresentativeGroup = () => {
  const { token } = useAuthContext();
  const { id } = useParams();
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          setLoading(true);
          const response = await api.get(`group/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          const users = response.data.data.representatives;
          setData(users);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [token, id]);

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

export default TableRepresentativeGroup;