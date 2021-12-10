import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import mockData from '../../shared/tests/helpers/mockData';
import { USERS, HOBBIES } from '../../shared/tests/testData';

import { User } from '../../shared/types/User';

import App from '../../App';

describe('<UserTable />', () => {
  afterEach(() => {
    localStorage.removeItem('usersData');
  });

  describe('when API call returns empty array data', () => {
    test('should show "no rows" when no users and no hobbies', async () => {
      mockData([], []);

      render(<App />);

      expect(await screen.findByText(/no rows/i)).toBeInTheDocument();
    });

    test('should show "no rows" when no users', async () => {
      mockData([], HOBBIES);

      render(<App />);

      expect(await screen.findByText(/no rows/i)).toBeInTheDocument();
    });

    test('should show "no rows" when no hobbies', async () => {
      mockData(USERS as User[], []);

      render(<App />);

      expect(await screen.findByText(/no rows/i)).toBeInTheDocument();
    });
  });

  describe('when API call returns complete data', () => {
    test('should show users in datagrid', async () => {
      mockData(USERS as User[], HOBBIES);

      render(<App />);

      await waitFor(() => {
        //expected length is USERS.length + 1, because 1 row in DataGrid describes columns, the rest are users rows
        expect(screen.getAllByRole('row')).toHaveLength(USERS.length + 1);
        expect(screen.queryByText('Kaufman')).toBeInTheDocument();
      });
    });

    test('should render alert dialog when click delete button', async () => {
      mockData(USERS as User[], HOBBIES);

      render(<App />);

      await waitFor(() => {
        userEvent.click(
          screen.getByTestId('DeleteUser6193ce0799647b845f24e587')
        );

        expect(screen.getByTestId('AlertDialog')).toBeInTheDocument();
      });
    });

    test('should delete user when click delete button in alert dialog', async () => {
      mockData(USERS as User[], HOBBIES);

      render(<App />);

      await waitFor(() => {
        userEvent.click(
          screen.getByTestId('DeleteUser6193ce0799647b845f24e587')
        );

        userEvent.click(screen.getByTestId('AlertDialogConfirmBtn'));

        //expected length is USERS.length, because 1 row in DataGrid describes columns, the rest are users rows
        expect(screen.getAllByRole('row')).toHaveLength(USERS.length);
        expect(screen.queryByText('Kaufman')).not.toBeInTheDocument();
      });
    });

    test('should delete all users when select all rows checkbox, then click delete icon button and click delete button in alert dialog', async () => {
      mockData(USERS as User[], HOBBIES);

      render(<App />);

      await waitFor(() => {
        userEvent.click(screen.getByLabelText(/select all rows checkbox/i));

        userEvent.click(screen.getByTestId('DeleteUsersBtn'));

        userEvent.click(screen.getByTestId('AlertDialogConfirmBtn'));

        expect(screen.getAllByRole('row')).toHaveLength(1);
      });
    });

    test('should restore users when click restore deleted users button', async () => {
      mockData(USERS as User[], HOBBIES);

      render(<App />);

      await waitFor(() => {
        userEvent.click(screen.getByLabelText(/select all rows checkbox/i));

        userEvent.click(screen.getByTestId('DeleteUsersBtn'));

        userEvent.click(screen.getByTestId('AlertDialogConfirmBtn'));

        expect(screen.getAllByRole('row')).toHaveLength(1);

        userEvent.click(screen.getByTestId('RestoreUsersBtn'));

        expect(screen.getAllByRole('row')).toHaveLength(5);
      });
    });

    test('should switch to form page when click details button', async () => {
      mockData(USERS as User[], HOBBIES);

      render(<App />);

      userEvent.click(
        await screen.findByTestId('UserDetails6193ce0799647b845f24e587')
      );

      expect(window.location.pathname).toEqual(
        '/users/6193ce0799647b845f24e587'
      );
    });
  });
});
