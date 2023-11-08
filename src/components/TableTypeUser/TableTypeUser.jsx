import React, { useEffect, useState } from 'react';
import useAuthContext from '../contexts/Auth';
import api from '../../services/api';
import { Table } from 'antd';
import { IconContext } from 'react-icons';
import style from './TableTypeUser.module.css'
import ModalEditTypeUser from '../Modals/modal_edit_type_user/ModalEditTypeUser';
import ModalDeleteUser from '../Modals/modal_delete_type-user/ModalDeleteTypeUser';

const TableTypeUser = () => {
  const { token } = useAuthContext();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          setLoading(true);
          const response = await api.get('type-user', {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          setData(response.data);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [token]);


  const columns = [
    {
      title: 'Tipos de usuario',
      dataIndex: 'name',
      render: (name) => `${name}`
    },

    {
      title: 'Operação',
      dataIndex: 'id',
      width: '10%',
      align: 'center',

      render: (id) => (
        <div className={style.operation}>
          <ModalDeleteUser id={id} data={data} setData={setData} />

          <IconContext.Provider value={{ color: "#2C74AC", size: 20 }}>
            <ModalEditTypeUser
              id={id}
              data={data}
              setData={setData}
            />
          </IconContext.Provider>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      bordered
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
  );
};

export default TableTypeUser;