import React, {useState } from 'react';
import style from './TableRepresentativeGroup.module.css'
import { useParams } from 'react-router-dom';
import { Table } from 'antd';

import ModalDeleteRepresentiveGroup from '../Modals/modal_delete_representive_group/ModalDeleteRepresentiveGroup';
import ModalEditRepresentativeGroup from '../Modals/modal_edit_representante_group/ModalEditRepresentativeGroup';

//Problemas com o edit representantes
const TableRepresentativeGroup = ({ data, setData}) => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      width: '10%',
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      width: '10%',
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
    <div className={style.tableContainer}>
      <Table
        rowKey={(record) => record.id}
        bordered
        columns={columns}
        dataSource={data}
        responsive={true}
        pagination={{
          current: page,
          pageSize: pageSize,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize)
          }
        }}
      />
    </div>
  );
};

export default TableRepresentativeGroup;