import React, { useEffect, useState } from 'react';
import useAuthContext from '../contexts/Auth';
import api from '../../services/api';
import style from './TableRepresentativeGroup.module.css'
import { useParams } from 'react-router-dom';
import { Table } from 'antd';

import ModalDeleteRepresentiveGroup from '../Modals/modal_delete_representive_group/ModalDeleteRepresentiveGroup';
import ModalEditRepresentativeGroup from '../Modals/modal_edit_representante_group/ModalEditRepresentativeGroup';

//Problemas com o edit representantes
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
          const response = await api.get(`group/${id}`);
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


  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      width: '20%',
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      width: '20%',
    },
    {
      title: 'Operações',
      dataIndex: 'id',
      width: '1%',
      align: 'center',
      render: (representativeId) => (
        <div className={style.operation}>
          <ModalDeleteRepresentiveGroup
            GroupId={id}
            RepresentativeId={representativeId}
            data={data}
            setData={setData}
          />

          <ModalEditRepresentativeGroup
            GroupId={id}
            RepresentativeId={representativeId}
            data={data}
            setData={setData}
          />
        </div>
      ),
    },
  ];

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