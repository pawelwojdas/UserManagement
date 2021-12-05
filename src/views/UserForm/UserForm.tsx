import { useContext } from 'react';
import { SnackbarContext } from '../../shared/context/SnackbarContext';
import { useNavigate, useParams } from 'react-router-dom';
import { UsersContext } from '../../shared/context/UsersContext';
import { useHttpClient } from '../../shared/hooks/useHttpClient';
import { User } from '../../shared/types/User';
import { Formik, Form } from 'formik';
import { FORM_VALIDATION } from './formValidation';

import {
  Grid,
  Container,
  Typography,
  Tooltip,
  IconButton,
  Button,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import TextField from '../../shared/components/FormElements/Textfield';
import Select from '../../shared/components/FormElements/Select';
import DatePickerInput from '../../shared/components/FormElements/DatePickerInput';
import RadioGroup from '../../shared/components/FormElements/RadioGroup';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';

const UserForm: React.FC = () => {
  const { users, hobbies, editUser } = useContext(UsersContext);
  const { setSnackbar } = useContext(SnackbarContext);
  const { isLoading } = useHttpClient();
  const { userId } = useParams();
  const navigate = useNavigate();

  const initialValues: User = {
    ...users.find((user) => user.id === userId)!,
  };

  const submitHandler = (user: User) => {
    setSnackbar(true, 'User updated');
    editUser(user);
    navigate('/users');
  };

  return (
    <Grid item xs={12}>
      {isLoading ? (
        <LoadingSpinner loading={isLoading} />
      ) : (
        users &&
        hobbies.length && (
          <Container maxWidth="md">
            <Formik
              initialValues={initialValues}
              onSubmit={submitHandler}
              validationSchema={FORM_VALIDATION}
            >
              {({ setFieldValue, handleReset, isValid, values }) => (
                <Form>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Tooltip title="Back to users">
                        <IconButton
                          onClick={() => {
                            navigate(-1);
                          }}
                        >
                          <ArrowBackIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="justify" variant="h5">
                        User details
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField name="name" label="Name" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField name="lastName" label="Last name" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField name="email" label="Email Address" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField name="address" label="Address" />
                    </Grid>
                    <Grid item xs={12}>
                      <DatePickerInput
                        name="dateOfBirth"
                        label="Date of Birth"
                        setValue={setFieldValue}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <RadioGroup
                        name="gender"
                        label="Gender"
                        options={[
                          { value: 'male', label: 'Male' },
                          { value: 'female', label: 'Female' },
                          { value: '', label: 'Not specified' },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        InputProps={{ inputProps: { min: 1, max: 120 } }}
                        name="age"
                        label="Age"
                        type="number"
                      ></TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name="phoneNumber"
                        label="Phone Number"
                        type="tel"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Select
                        name="hobbies"
                        label="Hobbies"
                        items={hobbies!.map((hobby) => hobby.name)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        size="large"
                        fullWidth
                        color="info"
                        variant="contained"
                        type="submit"
                        disabled={
                          !isValid ||
                          JSON.stringify(initialValues) ===
                            JSON.stringify(values)
                        }
                      >
                        Update
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        size="large"
                        color="warning"
                        fullWidth
                        variant="contained"
                        onClick={handleReset}
                        disabled={
                          JSON.stringify(initialValues) ===
                          JSON.stringify(values)
                        }
                      >
                        Reset
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Container>
        )
      )}
    </Grid>
  );
};

export default UserForm;
