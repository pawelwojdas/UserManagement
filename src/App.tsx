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
import SnackbarContextProvider from './shared/context/snackbar-context';
import Snackbar from './shared/UI/Snackbar';
import ErrorBoundary from './shared/components/ErrorBoundary/ErrorBoundary';

import { Grid } from '@mui/material';

function App() {
  return (
    <ErrorBoundary>
      <Grid container>
        <SnackbarContextProvider>
          <UserContextProvider>
            <Router>
              <Routes>
                <Route path="*" element={<Navigate to="/users" />} />
                <Route path="/users" element={<UserTable />} />
                <Route path="/users/:userId" element={<UserForm />} />
              </Routes>
            </Router>
            <Snackbar />
          </UserContextProvider>
        </SnackbarContextProvider>
      </Grid>
    </ErrorBoundary>
  );
}

export default App;
