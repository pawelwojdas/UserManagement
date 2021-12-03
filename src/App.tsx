import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import './App.css';
import UserTable from './views/UserTable/UserTable';
import UserForm from './views/UserForm/UserForm';
import UserContextProvider from './shared/context/users-context';

import { Grid } from '@mui/material';

function App() {
  return (
    <Grid container>
      <UserContextProvider>
        <Router>
          <Routes>
            <Route path="*" element={<Navigate to="/users" />} />
            <Route path="/users" element={<UserTable />} />
            <Route path="/users/:userId" element={<UserForm />} />
          </Routes>
        </Router>
      </UserContextProvider>
    </Grid>
  );
}

export default App;
