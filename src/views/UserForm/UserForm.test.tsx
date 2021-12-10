import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import mockData from '../../shared/tests/helpers/mockData';
import { USERS, HOBBIES } from '../../shared/tests/testData';

import { User } from '../../shared/types/User';

import App from '../../App';

describe('<UserForm />', () => {
  beforeEach(() => {
    window.history.pushState({}, 'User Management', `/users/${USERS[1].id}`);
  });

  afterEach(() => {
    localStorage.removeItem('usersData');
  });

  describe('when API call returns empty array data', () => {
    test('should display "no data available" snackbar when no users and no hobbies', async () => {
      mockData([], []);

      render(<App />);

      expect(await screen.findByTestId('Snackbar')).toHaveTextContent(
        /no data available/i
      );
    });

    test('should display "no data available" snackbar when no users', async () => {
      mockData([], HOBBIES);

      render(<App />);

      expect(await screen.findByTestId('Snackbar')).toHaveTextContent(
        /no data available/i
      );
    });

    test('should display "no data available" snackbar when no hobbies', async () => {
      mockData(USERS as User[], []);

      render(<App />);

      expect(await screen.findByTestId('Snackbar')).toHaveTextContent(
        /no data available/i
      );
    });
  });

  describe('when API call returns complete data', () => {
    test('should switch to users table page when click on "back to users" button', async () => {
      mockData(USERS as User[], HOBBIES);

      render(<App />);

      userEvent.click(await screen.findByTestId('BackToUserBtn'));

      await waitFor(() => {
        expect(window.location.pathname).toEqual('/users');
      });
    });

    test('should show filled form with specified user', async () => {
      mockData(USERS as User[], HOBBIES);

      const { container } = render(<App />);

      const userHobbies = USERS[1].hobbies
        .map((hobbyId) => {
          return HOBBIES.find(({ id }) => id === hobbyId)!.name;
        })
        .join(',');

      await waitFor(() => {
        const inputNames = [
          'name',
          'lastName',
          'email',
          'address',
          'dateOfBirth',
          'age',
          'phoneNumber',
        ] as (keyof User)[];
        inputNames.forEach((fieldName) => {
          expect(
            container.querySelector<HTMLInputElement>(
              `input[name=${fieldName}]`
            )!.value
          ).toEqual(USERS[1][fieldName].toString());
        });
        expect(
          container.querySelector<HTMLInputElement>(`input[name=hobbies]`)!
            .value
        ).toEqual(userHobbies);

        expect(
          container.querySelector<HTMLInputElement>(`input[checked]`)!.value
        ).toEqual(USERS[1].gender);

        expect(screen.getByTestId('UpdateUserBtn')).toBeDisabled();
        expect(screen.getByTestId('ResetUserBtn')).toBeDisabled();
      });
    });

    test('should show input error message when provide no value for required field', async () => {
      mockData(USERS as User[], HOBBIES);

      const { container } = render(<App />);

      await waitFor(() => {
        const input =
          container.querySelector<HTMLInputElement>(`input[name=name]`)!;

        fireEvent.change(input, { target: { value: '' } });

        expect(input.value).toBe('');
        expect(screen.getByText(/name is required/i)).toBeInTheDocument();
        expect(screen.getByTestId('UpdateUserBtn')).toBeDisabled();
        expect(screen.getByTestId('ResetUserBtn')).toBeEnabled();
      });
    });

    test('should show input error message when provide invalid value', async () => {
      mockData(USERS as User[], HOBBIES);

      const { container } = render(<App />);

      await waitFor(() => {
        const input =
          container.querySelector<HTMLInputElement>(`input[name=name]`)!;

        fireEvent.change(input, { target: { value: '@123' } });

        expect(input.value).toBe('@123');
        expect(
          screen.getByText(/only letters are allowed for name/i)
        ).toBeInTheDocument();
        expect(screen.getByTestId('UpdateUserBtn')).toBeDisabled();
        expect(screen.getByTestId('ResetUserBtn')).toBeEnabled();
      });
    });

    test('should reset values when click on reset button', async () => {
      mockData(USERS as User[], HOBBIES);

      const { container } = render(<App />);

      await waitFor(() => {
        const input =
          container.querySelector<HTMLInputElement>(`input[name=name]`)!;

        fireEvent.change(input, { target: { value: '@123' } });

        userEvent.click(screen.getByTestId('ResetUserBtn'));

        expect(input.value).toBe(USERS[1].name);
      });
    });

    test('should update user values', async () => {
      mockData(USERS as User[], HOBBIES);

      const { container } = render(<App />);

      await waitFor(() => {
        const input =
          container.querySelector<HTMLInputElement>(`input[name=name]`)!;

        fireEvent.change(input, { target: { value: 'John' } });
      });

      userEvent.click(await screen.findByTestId('UpdateUserBtn'));

      await waitFor(() => {
        expect(window.location.pathname).toEqual('/users');
        expect(screen.getByText('John')).toBeInTheDocument();
        expect(screen.queryByText(USERS[1].name)).not.toBeInTheDocument();
      });
    });
  });
});
