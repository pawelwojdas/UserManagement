import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import './App.css';
import UserTable from './views/UserTable/UserTable';
import UserForm from './views/UserForm/UserForm';
import UserContextProvider from './shared/context/UsersContext';
import SnackbarContextProvider from './shared/context/SnackbarContext';
import Snackbar from './shared/components/UI/Snackbar';
import ErrorBoundary from './shared/components/ErrorBoundary/ErrorBoundary';

import { Grid } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material/styles';

function App() {
  const theme = createTheme();
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <Grid container>
          <SnackbarContextProvider>
            <UserContextProvider>
              <Router>
                <Routes>
                  <Route path="/users" element={<UserTable />} />
                  <Route path="/users/:userId" element={<UserForm />} />
                  <Route path="*" element={<Navigate to="/users" />} />
                </Routes>
              </Router>
              <Snackbar />
            </UserContextProvider>
          </SnackbarContextProvider>
        </Grid>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
