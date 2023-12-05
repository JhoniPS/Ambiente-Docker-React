import React, { useState } from 'react';
import { Table } from 'antd';

import style from './TableRepresentative.module.css'

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
];


const TableRepresentative = ({ data }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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

export default TableRepresentative;