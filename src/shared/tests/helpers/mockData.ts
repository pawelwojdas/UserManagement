import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { User } from '../../types/User';
import { Hobby } from '../../types/Hobby';

const mockData = (users: User[], hobbies: Hobby[]) => {
  const mock = new MockAdapter(axios);

  mock
    .onGet(`${process.env.REACT_APP_BASE_URL}/users.json`)
    .reply(200, users)
    .onGet(`${process.env.REACT_APP_BASE_URL}/hobbies.json`)
    .reply(200, hobbies);
};

export default mockData;
