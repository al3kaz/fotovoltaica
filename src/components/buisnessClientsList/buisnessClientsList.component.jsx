import React from 'react';

import {
  PDFDownloadLink,
  MyDocument,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  Button,
  Alert,
  StyledTableCell,
  StyledTableRow,
} from './index';

const BuisnessClientsList = ({ filteredClients }) => {
  const [moreInfo, setMoreInfo] = React.useState({});
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleInfoShow = (id) => {
    setMoreInfo((prevMoreInfo) => ({
      [id]: !prevMoreInfo[id],
    }));
  };
  const filteredBuisnessClients = filteredClients.filter(
    (client) => client.NIP
  );

  return filteredBuisnessClients.length === 0 ? (
    <Alert severity="warning">Brak wyników wyszukiwania</Alert>
  ) : (
    filteredBuisnessClients.map((client) => {
      return (
        <StyledTableRow
          onClick={() => {
            handleClickOpen();
            toggleInfoShow(client.id);
          }}
          key={client.id}
          className="row border-top"
        >
          <StyledTableCell component="th" scope="row">
            {client.companyName}
          </StyledTableCell>
          <StyledTableCell align="right">{client.NIP}</StyledTableCell>
          <StyledTableCell align="right">
            {client.contactPerson}
          </StyledTableCell>
          <StyledTableCell align="right">{client.email}</StyledTableCell>
          <StyledTableCell align="right">{client.phoneNumber}</StyledTableCell>

          {moreInfo[client.id] ? (
            <>
              <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">
                  {client.companyName}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    osoba kontaktowa: {client.contactPerson}
                  </DialogContentText>
                  <DialogContentText>
                    telefon: {client.phoneNumber}
                  </DialogContentText>
                  <DialogContentText>email: {client.email}</DialogContentText>
                  <DialogContentText>
                    ul.
                    {client.street}
                    {client.houseNumber} {client.postalCode}, {client.city}
                  </DialogContentText>
                  <DialogContentText>
                    skąd o nas wiesz ? :{client.contactSours}
                  </DialogContentText>
                </DialogContent>
                <DialogContent>
                  <DialogContentText>
                    moc instalacji :{client.power} kWp
                  </DialogContentText>
                  <DialogContentText>
                    Moduł: {client.module} kWp {client.moduleCount}szt.
                  </DialogContentText>
                  <DialogContentText>
                    falownik: {client.inverter} kWp
                  </DialogContentText>
                  <DialogContentText>
                    cena netto: {client.netPrice} zł
                  </DialogContentText>
                  <DialogContentText>vat: {client.vat} zł</DialogContentText>
                  <DialogContentText>
                    cena brutton: {client.grosPrice} zł
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    <PDFDownloadLink
                      className="card-link"
                      document={
                        <MyDocument
                          name={client.firstname}
                          surname={client.surname}
                        />
                      }
                      fileName="offer.pdf"
                    >
                      {({ blob, url, loading, error }) =>
                        loading ? 'Loading document...' : 'Pobierz ofertę'
                      }
                    </PDFDownloadLink>
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          ) : null}
        </StyledTableRow>
      );
    })
  );
};

export default BuisnessClientsList;
