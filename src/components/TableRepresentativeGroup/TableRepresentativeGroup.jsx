import React, { useState } from 'react';
import style from './TableRepresentativeGroup.module.css'
import { useParams } from 'react-router-dom';
import { MaterialReactTable } from 'material-react-table';

import ModalDeleteRepresentiveGroup from '../Modals/modal_delete_representive_group/ModalDeleteRepresentiveGroup';
import ModalEditRepresentativeGroup from '../Modals/modal_edit_representante_group/ModalEditRepresentativeGroup';

//Problemas com o edit representantes
const TableRepresentativeGroup = ({ data, setData }) => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // const columns = [
  //   {
  //     title: 'Nome',
  //     dataIndex: 'name',
  //     width: '10%',
  //   },
  //   {
  //     title: 'E-mail',
  //     dataIndex: 'email',
  //     width: '10%',
  //   },
  //   {
  //     title: 'Operações',
  //     dataIndex: 'id',
  //     width: '1%',
  //     align: 'center',
  //     render: (representativeId) => (
  //       <div className={style.operation}>
  //         <ModalDeleteRepresentiveGroup
  //           GroupId={id}
  //           RepresentativeId={representativeId}
  //           data={data}
  //           setData={setData}
  //         />

  //         <ModalEditRepresentativeGroup
  //           GroupId={id}
  //           RepresentativeId={representativeId}
  //           data={data}
  //           setData={setData}
  //         />
  //       </div>
  //     ),
  //   },
  // ];

  const columns = [
    {
      id: 'Nome',
      header: 'Nome',
      accessorKey: 'name',
    },
    {
      id: 'E-mail',
      header: 'E-mail',
      accessorKey: 'email',
    },
    {
      id: "Operações",
      header: null,
      accessorKey: 'id',
      columnDefType: 'display',
      Cell: ({ row }) => (
        <div className="d-flex">
          <ModalDeleteRepresentiveGroup id={row.original.id} data={data} setData={setData} />
          <ModalEditRepresentativeGroup id={row.original.id} data={data} setData={setData} />
        </div>
      ),
    }
  ];

  return (
    <MaterialReactTable
      rowKey={(record) => record.id}
      columns={columns}
      data={data}
      enableColumnFilterModes
      enableColumnOrdering
      enableGlobalFilter
      paginationDisplayMode='pages'

      muiTablePaperProps={{
        elevation: 0,
        sx: {
          borderRadius: '0',
          border: '1px solid #e0e0e0',
          boxShadow: 'none',
        },
      }}

      muiTableProps={{
        sx: {
          tableLayout: 'fixed',
        },
      }}
    />
  );
};

export default TableRepresentativeGroup;