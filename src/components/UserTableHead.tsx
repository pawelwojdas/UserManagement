import * as React from 'react';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { User } from '../types/User';
import { Order } from '../types/Order';

interface UserTableProps {
    numSelected: number;
    onRequestSort: (
        event: React.MouseEvent<unknown>,
        property: keyof User
    ) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

const UserTableHead = (props: UserTableProps) => {
    interface HeadCell {
        disablePadding: boolean;
        id: keyof User;
        label: string;
        numeric: boolean;
        sortable: boolean;
    }

    const headCells: readonly HeadCell[] = [
        {
            id: 'name',
            numeric: false,
            disablePadding: true,
            label: 'Name',
            sortable: true,
        },
        {
            id: 'email',
            numeric: true,
            disablePadding: false,
            label: 'Email',
            sortable: true,
        },
        {
            id: 'gender',
            numeric: true,
            disablePadding: false,
            label: 'Gender',
            sortable: false,
        },
        {
            id: 'address',
            numeric: true,
            disablePadding: false,
            label: 'Address',
            sortable: true,
        },
        {
            id: 'age',
            numeric: true,
            disablePadding: false,
            label: 'Age',
            sortable: true,
        },
        {
            id: 'hobbies',
            numeric: true,
            disablePadding: false,
            label: 'Hobbies',
            sortable: false,
        },
        {
            id: 'dateOfBirth',
            numeric: true,
            disablePadding: false,
            label: 'Date Of Birth',
            sortable: true,
        },
        {
            id: 'phoneNumber',
            numeric: true,
            disablePadding: false,
            label: 'Phone Number',
            sortable: false,
        },
    ];

    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;
    const createSortHandler =
        (property: keyof User) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.sortable ? (
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={
                                    orderBy === headCell.id ? order : 'asc'
                                }
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc'
                                            ? 'sorted descending'
                                            : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        ) : (
                            headCell.label
                        )}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default UserTableHead;
