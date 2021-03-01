import { withStyles, makeStyles, TableCell } from './index';

export const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
