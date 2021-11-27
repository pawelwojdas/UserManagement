import React, { useContext, useState } from 'react';
import UserTableToolbar from './UserTableToolbar';
import UserActionCell from './UserActionCell';
import AlertDialog from '../shared/components/AlertDialog';
import { UsersContext } from '../context/users-context';
import { Hobby } from '../types/Hobby';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridSelectionModel,
  GridRowId,
  GridRenderCellParams,
  GridCallbackDetails,
} from '@mui/x-data-grid';

import getNamesById from '../utils/getNamesById';

const UserTable: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
  const [openedDialog, setOpenedDialog] = useState<boolean>(false);
  const [usersToDelete, setUsersToDelete] = useState<{
    title: string;
    content: string;
    usersId: GridRowId[];
  }>({ title: '', content: '', usersId: [] });
  const { users, deleteUsers } = useContext(UsersContext);

  const deleteHandler = (usersId: GridRowId[]) => {
    setUsersToDelete({
      title: 'Are you sure you want to delete?',
      content: getNamesById(users, usersId),
      usersId,
    });
    setOpenedDialog(true);
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 160,
    },
    { field: 'email', headerName: 'Email', width: 220 },
    {
      field: 'gender',
      headerName: 'Gender',
      filterable: false,
      sortable: false,
      disableColumnMenu: true,
      width: 80,
    },
    { field: 'address', headerName: 'Address', minWidth: 250, flex: 1 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 70,
    },
    {
      field: 'hobbies',
      headerName: 'Hobbies',
      valueGetter: (params: GridValueGetterParams) => {
        return params.value.map((hobby: Hobby) => hobby.name).join(', ');
      },
      sortable: false,
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'dateOfBirth',
      headerName: 'Date of birth',
      type: 'date',
      width: 110,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone number',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      width: 140,
    },
    {
      field: 'action',
      headerName: 'Action',
      filterable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <UserActionCell userData={params.row} onDelete={deleteHandler} />
        );
      },
      width: 200,
    },
  ];

  return (
    <div>
      {openedDialog && (
        <AlertDialog
          title={usersToDelete.title}
          content={usersToDelete.content}
          show={true}
          onConfirm={() => {
            console.log('dziala');
            deleteUsers(usersToDelete.usersId);
          }}
          onClose={() => {
            setOpenedDialog(false);
          }}
        />
      )}
      <DataGrid
        disableColumnSelector
        hideFooterSelectedRowCount
        checkboxSelection
        autoHeight
        disableSelectionOnClick
        columns={columns}
        rows={users}
        pageSize={10}
        components={{
          Toolbar: () => (
            <UserTableToolbar
              selectedUsers={selectedRows}
              onDelete={deleteHandler}
            />
          ),
        }}
        onSelectionModelChange={(
          selectionModel: GridSelectionModel,
          details: GridCallbackDetails
        ) => {
          setSelectedRows(selectionModel);
        }}
      />
    </div>
  );
};

export default UserTable;
