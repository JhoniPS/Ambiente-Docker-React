import React from 'react';
import api from '../../services/api';
import Cookies from 'js-cookie'
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';

import ModalDeleteDocument from '../Modals/modal_delete_document/ModalDeleteDocument';
import { MaterialReactTable } from 'material-react-table';

const TableDocumentos = ({ data, setData }) => {
  const userRole = Cookies.get('userType');

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
      id: 'Nome',
      header: 'Nome',
      accessorKey: 'name',
      size: 200,
    },
    {
      id: 'Arquivo',
      header: 'Arquivo',
      accessorKey: 'file',
      size: 250,
      Cell: ({ row }) => (
        <div
          style={{ cursor: 'pointer', textDecoration: 'underline', color: '#2C74AC' }}
          onClick={() => handleDownload(row.original.id, row.original.file)}
        >
          {row.original.file}
        </div>
      ),
    },
    {
      id: 'Tamanho',
      header: 'Tamanho',
      accessorKey: 'file_size',
      size: 100,
      Cell: ({ row }) => (
        <>{row.original.file_size}MB</>
      ),
    },
    {
      id: 'Criado em',
      header: 'Criado em',
      accessorKey: 'created_at',
      size: 100,
      Cell: ({ row }) => (
        <>{formatarData(row.original.created_at)}</>
      ),
    },


  ];

  if (userRole === "representante") {
    columns.push({
      header: null,
      accessorKey: 'id',
      columnDefType: 'display',
      size: 50,
      Cell: ({ row }) => (
        <div className="d-flex justify-content-evenly">
          <ModalDeleteDocument docId={row.original.id} data={data} setData={setData} />
        </div>
      ),
    },);
  }

  return (
    <MaterialReactTable
      rowKey={(record) => record.id}
      columns={columns}
      data={data}
      enableColumnFilterModes
      enableColumnOrdering
      enableGlobalFilter
      paginationDisplayMode='pages'
      localization={MRT_Localization_PT_BR}
      muiTablePaperProps={{
        elevation: 0,
        sx: { borderRadius: '0', border: '1px solid #e0e0e0', boxShadow: 'none' },
      }}

      muiTableProps={{
        sx: {
          tableLayout: 'fixed',
        },
      }}
    />
  );
};

export default TableDocumentos;