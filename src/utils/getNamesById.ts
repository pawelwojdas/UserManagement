import {User} from '../types/User'
import { GridRowId } from '@mui/x-data-grid';

const getNamesById = (users: User[], usersId: GridRowId[]) => {
    const names: string[] = [];

    usersId.forEach(userId => {
        names.push(users.find(user => user.id === userId)!.name);
    })

    return names.join(', ');
};

export default getNamesById;