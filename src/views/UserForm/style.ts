import { makeStyles, createStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      margin: '10px 0',
      [theme.breakpoints.up('sm')]: {
        padding: '20px',
        border: `1px solid ${theme.palette.grey[400]}`,
        borderRadius: '5px',
      },
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  })
);

export { useStyles };
