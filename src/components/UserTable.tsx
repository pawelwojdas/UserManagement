import React, { useContext, useState } from 'react';
import UserTableToolbar from './UserTableToolbar';
import UserActionCell from './UserActionCell';
import { UsersContext } from '../context/users-context';
import { Hobby } from '../types/Hobby';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridSelectionModel,
  GridRowId,
  GridRenderCellParams,
} from '@mui/x-data-grid';

const UserTable = () => {
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
  const usersContext = useContext(UsersContext);

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
        return <UserActionCell userData={params.row} />;
      },
      width: 200,
    },
  ];

  return (
    <div>
      <DataGrid
        disableColumnSelector
        hideFooterSelectedRowCount
        checkboxSelection
        autoHeight={true}
        disableSelectionOnClick
        columns={columns}
        rows={usersContext.users}
        pageSize={10}
        components={{
          Toolbar: () => <UserTableToolbar numSelected={selectedRows.length} />,
        }}
        onSelectionModelChange={(selectionModel: GridSelectionModel) => {
          setSelectedRows(selectionModel);
        }}
      />
    </div>
  );
};

export default UserTable;
