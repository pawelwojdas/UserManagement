import { makeStyles, createStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    grid: {
      margin: '0 auto',
      width: '100%',
      maxWidth: '1800px',
      height: '95vh',
      maxHeight: '700px',
    },
  })
);

export { useStyles };
