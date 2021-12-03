import React, { useContext, useState, useEffect } from 'react';
import UserTableToolbar from './UserTableToolbar';
import UserActionCell from './UserActionCell';
import UserNameListToDelete from './UserNameListToDelete';
import AlertDialog from '../../shared/UI/AlertDialog';
import { UsersContext } from '../../shared/context/users-context';
import { User } from '../../shared/types/User';

import { Grid } from '@mui/material';

import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridSelectionModel,
  GridRowId,
  GridRenderCellParams,
} from '@mui/x-data-grid';

import findUsersById from '../../shared/utils/findUsersById';

const UserTable: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
  const [openedDialog, setOpenedDialog] = useState<boolean>(false);

  const [usersToDeleteId, setUsersToDelete] = useState<GridRowId[]>([]);

  const [deletedUsers, setDeletedUsers] = useState<User[]>([]);

  const { users, deleteUsers, addUsers } = useContext(UsersContext);

  useEffect(() => {
    if (
      deletedUsers.length === 0 &&
      localStorage.getItem('deletedUsers') !== null
    ) {
      setDeletedUsers(JSON.parse(localStorage.getItem('deletedUsers')!));
    }
  }, [deletedUsers]);

  const undoLastDeleteOperationHandler = () => {
    addUsers(deletedUsers);
    setDeletedUsers([]);
    localStorage.removeItem('deletedUsers');
  };

  const deleteHandler = (usersId: GridRowId[]) => {
    setUsersToDelete(usersId);
    setOpenedDialog(true);
  };

  const onDialogConfirm = () => {
    const deletedUsers = findUsersById(users, usersToDeleteId);
    setDeletedUsers(deletedUsers);
    deleteUsers(usersToDeleteId);
    localStorage.setItem('deletedUsers', JSON.stringify(deletedUsers));
  };

  const onDialogClose = () => {
    setOpenedDialog(false);
    setUsersToDelete([]);
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 80,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 100,
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
        return params.value.join(', ');
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
    <Grid item xs={12}>
      {openedDialog && (
        <AlertDialog
          title={'Are you sure you want to delete?'}
          confirmButtonText={'Delete'}
          show={true}
          onConfirm={onDialogConfirm}
          onClose={onDialogClose}
        >
          <UserNameListToDelete users={users} usersId={usersToDeleteId} />
        </AlertDialog>
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
        rowsPerPageOptions={[10]}
        components={{
          Toolbar: () => (
            <UserTableToolbar
              selectedUsers={selectedRows}
              numDeletedUsers={deletedUsers.length}
              onDelete={deleteHandler}
              undoDeleteOperation={undoLastDeleteOperationHandler}
            />
          ),
        }}
        onSelectionModelChange={(selectionModel: GridSelectionModel) => {
          setSelectedRows(selectionModel);
        }}
      />
    </Grid>
  );
};

export default UserTable;