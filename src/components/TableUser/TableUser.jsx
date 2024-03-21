import React, { useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
import ModalDeleteUser from '../Modals/modal_delete_user/ModalDeleteUser';
import { CFormSwitch } from '@coreui/react';
import api from '../../services/api';

const TableUser = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('users');
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [setData]);

  const setManager = async (id) => {
    try {
      await api.put(`users/set-user/${id}`, { isManager: true });
      updateTable(id, 'gerente');
    } catch (error) {
      console.log("teste");
    }
  };

  const offManager = async (id) => {
    try {
      await api.put(`users/set-user/${id}`, { isManager: false });
      updateTable(id, 'visualizador');
    } catch (error) {
      console.log("teste2");
    }
  }

  const updateTable = (userId, type_user) => {
    const updatedUser = data.map((item) => {
      if (item.id === userId) {
        return { ...item, type_user };
      }
      return item;
    });

    setData(updatedUser);
  };

  const verificationTask = async (userId, type_user) => {
    try {
      if (type_user === 'gerente') {
        await offManager(userId);
      } else {
        await setManager(userId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderSwitchCell = ({ row }) => (
    <CFormSwitch
      size="lg"
      style={{ backgroundColor: `${(row.original.type_user === 'gerente') ? '#548CA8' : '#FFF'}` }}
      checked={row.original.type_user === 'gerente'}
      onChange={() => verificationTask(row.original.id, row.original.type_user)}
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
    { header: 'E-mail', accessorKey: 'email', size: 90 },
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
      localization={MRT_Localization_PT_BR}
      muiTablePaperProps={{
        elevation: 0,
        sx: { borderRadius: '0', border: '1px solid #e0e0e0', boxShadow: 'none' },
      }}
      muiTableProps={{ sx: { tableLayout: 'fixed' } }}
    />
  );
};

export default TableUser;
