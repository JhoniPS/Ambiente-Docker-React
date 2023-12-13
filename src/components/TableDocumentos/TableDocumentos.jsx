import React, { useState } from 'react';
import api from '../../services/api';

import { Table } from 'antd';
import style from './TableDocumentos.module.css'

// import ModalDeleteUser from '../Modals/modal_delete_user/ModalDeleteUser';
// import ModalEditUser from '../Modals/modal_edit_user/ModalEditUser'

const TableDocumentos = ({ data, setData }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  function formatarData(dt) {
    const dataObj = new Date(dt);
    const ano = dataObj.getFullYear();
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const dia = String(dataObj.getDate()).padStart(2, '0');

    return `${dia}/${mes}/${ano}`;
  }

  const handleDownload = async (id, fileName) => {
    try {
      const response = await api.get(`documents/download/${id}`, { responseType: 'blob' });

      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
    },
    {
      title: 'Arquivo',
      dataIndex: 'file',
      render: (file, record) => (<p onClick={() => handleDownload(record.id, file)}>{file}</p>),
    },
    {
      title: 'Tamanho',
      dataIndex: 'file_size',
      render: (file_size) => (<>{file_size}MB</>),
    },
    {
      title: 'Criado em',
      dataIndex: 'created_at',
      render: (created_at) => (formatarData(created_at)),
    }
  ];

  return (
    <Table
      className={style.table}
      bordered
      rowKey={(record) => record.id}
      columns={columns}
      dataSource={data}
      responsive
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

export default TableDocumentos;