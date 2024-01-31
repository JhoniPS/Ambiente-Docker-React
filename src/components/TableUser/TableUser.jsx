import React from 'react';
import { MaterialReactTable } from 'material-react-table';
import ModalDeleteUser from '../Modals/modal_delete_user/ModalDeleteUser';
import { CFormSwitch } from '@coreui/react';
import api from '../../services/api';

const TableUser = ({ data, setData }) => {

  const setManager = async (id) => {
    try {
      await api.put(`users/set-manager/${id}`);

    } catch (error) {
      console.log(error);
    }
  };

  const verificationTask = async (userId, type_user) => {
    try {
      if (type_user === 'gerente') {
        alert('xxxxxx')
      } else {
        await setManager(userId);
      }

      const updatedUser = data.map((item) => {
        if (item.id === userId) {
          return { ...item, type_user: type_user === 'gerente' ? null : 'gerente' };
        }
        return item;
      });

      setData(updatedUser);
    } catch (error) {
      console.log(error);
    }
  };

  const renderSwitchCell = ({ row }) => (
    <CFormSwitch
      size="lg"
      checked={row.original.type_user === 'gerente'}
      onChange={() => {
        verificationTask(row.original.id, row.original.type_user)
      }}
    />
  );

  const renderDeleteUserCell = ({ row }) => (
    <div className="d-flex justify-content-center">
      <ModalDeleteUser id={row.original.id} data={data} setData={setData} />
    </div>
  );

  const columns = [
    { header: 'Nome', accessorKey: 'name', size: 100 },
    { header: 'Tipo de usuario', accessorKey: 'type_user', size: 100 },
    { header: 'E-mail', accessorKey: 'email', size: 100 },
    { header: 'Gerente', size: 20, Cell: renderSwitchCell },
    { header: null, accessorKey: 'id', columnDefType: 'display', size: 20, Cell: renderDeleteUserCell },
  ];

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnFilterModes
      enableColumnOrdering
      enableGlobalFilter
      paginationDisplayMode="pages"
      muiTablePaperProps={{
        elevation: 0,
        sx: { borderRadius: '0', border: 'none', boxShadow: 'none' },
      }}
      muiTableProps={{ sx: { tableLayout: 'fixed' } }}
    />
  );
};

export default TableUser;
