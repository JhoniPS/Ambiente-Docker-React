import React, { useEffect, useState } from 'react';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
import api from '../../services/api';

import { MaterialReactTable, } from 'material-react-table';
import { IconContext } from 'react-icons';

import ModalEditTypeUser from '../Modals/modal_edit_type_user/ModalEditTypeUser';
import ModalDeleteUser from '../Modals/modal_delete_type-user/ModalDeleteTypeUser';

const TableTypeUser = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get('type-user');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


  const columns = [
    {
      header: 'Tipos de usuario',
      accessorKey: 'name',
      size: 1000,
    },

    {
      header: null,
      accessorKey: 'id',
      columnDefType: 'display',

      Cell: ({ row }) => (
        <div className="d-flex justify-content-center">
          <ModalDeleteUser id={row.original.id} data={data} setData={setData} />
          <IconContext.Provider value={{ color: "#2C74AC", size: 20 }}>
            <ModalEditTypeUser id={row.original.id} data={data} setData={setData} />
          </IconContext.Provider>
        </div>
      ),
    },
  ];

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnFilterModes
      enableColumnOrdering
      enableGlobalFilter
      paginationDisplayMode='pages'
      state={
        loading
      }
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

export default TableTypeUser;