import teal from '@material-ui/core/colors/teal';

export const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  error: {
    backgroundColor: theme.palette.error.dark,
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing.unit * 2,
    },
  },
  success: {
    backgroundColor: teal[700],
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing.unit * 2,
    },
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },

  icon: {
    marginRight: theme.spacing.unit,
  },

});
