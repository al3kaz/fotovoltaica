import BuisnessClientsList from '../../components/buisnessClientsList/buisnessClientsList.component';
import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Navigation from '../../components/navigation/navigation.component';
import SearchBar from '../../components/searchBar/searchbar.component';
import Spinner from '../../components/spinner/spinner';
import IndividualClientList from '../../components/individualClientList/individualClientList.component';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const db = firebase.firestore();

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const Offers = () => {
  const [clients, setClients] = React.useState();
  const [search, setSearch] = React.useState('');

  const classes = useStyles();

  React.useEffect(() => {
    const clientsRef = db.collection('clients');

    clientsRef.get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClients(data);
    });
  }, []);

  if (clients === undefined) return <Spinner />;

  const lowercasedFilter = search.toLowerCase();

  const filteredClients = clients.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key].toLowerCase().includes(lowercasedFilter)
    );
  });

  return (
    <div>
      <Navigation />
      <SearchBar search={search} setSearch={setSearch} />
      <div className=" text-center mb-5">
        <h3 className="mt-3">Klient Indywidualny</h3>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>IMIE</StyledTableCell>
                <StyledTableCell>NAZWISKO</StyledTableCell>
                <StyledTableCell>EMAIL</StyledTableCell>
                <StyledTableCell>TELEFON</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <IndividualClientList filteredClients={filteredClients} />
            </TableBody>
          </Table>
        </TableContainer>
        <h3 className="mt-3">Klient Biznsowy</h3>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>NAZWA FIRMY</StyledTableCell>
                <StyledTableCell>NIP</StyledTableCell>
                <StyledTableCell>OSOBA KONTAKTOWA</StyledTableCell>
                <StyledTableCell>EMAIL</StyledTableCell>
                <StyledTableCell>TELEFON</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <BuisnessClientsList filteredClients={filteredClients} />
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
export default Offers;
