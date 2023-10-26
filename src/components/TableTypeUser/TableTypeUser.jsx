import React, { Fragment, useEffect, useState } from 'react';
import api from '../../services/api';
import useAuthContext from '../contexts/Auth';

import { Table } from 'antd';
import { IoTrash } from "react-icons/io5";
import { IconContext } from 'react-icons';
import style from './TableTypeUser.module.css'
import EditTypeUser from '../Modals/modal_edit_type_user/EditTypeUser';


const TableTypeUser = () => {
  const { user, deleteTypeUser } = useAuthContext();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handlDelete = async (id) => {
    try {
      await deleteTypeUser({ id })
      const updatedData = data.filter(item => item.id !== id);
      setData(updatedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          setLoading(true);
          await api.get('type-user').then(resp => {
            setData(resp.data);
            setLoading(false);
          });
        } catch (error) {
          console.log(error);
        }
      }

    };

    fetchData();
  }, [user]);


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
      dataIndex: 'id',
      width: '10%',
      align: 'center',

      render: (id) => (
        <div className={style.operation}>
          <IconContext.Provider value={{ color: "#93000A", size: 20 }}>
            <button onClick={() => handlDelete(id)}>
              <IoTrash />
            </button>
          </IconContext.Provider>

          <IconContext.Provider value={{ color: "#2C74AC", size: 20 }}>
            <EditTypeUser />
          </IconContext.Provider>
        </div>
      ),
    },
  ];

  return (
    <Fragment>


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
    </Fragment>
  );
};

export default TableTypeUser;