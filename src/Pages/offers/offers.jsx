import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Navigation from '../../components/navigation/navigation.component';
import SearchBar from '../../components/searchBar/searchbar.component';
import Spinner from '../../components/spinner/spinner';
import { PDFViewer } from '@react-pdf/renderer';

import { PDFDownloadLink } from '@react-pdf/renderer';

import MyDocument from '../../components/pdfRender/pdfRender.component';

const db = firebase.firestore();

const Offers = () => {
  const [clients, setClients] = React.useState();
  const [moreInfo, setMoreInfo] = React.useState({});
  const [search, setSearch] = React.useState('');

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

  const filteredData = clients.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key].toLowerCase().includes(lowercasedFilter)
    );
  });

  const toggleInfoShow = (id) => {
    setMoreInfo((prevMoreInfo) => ({
      [id]: !prevMoreInfo[id],
    }));
  };
  const buisnessClientsList = filteredData
    .filter((client) => client.NIP)
    .map((client) => {
      return (
        <div
          onClick={() => {
            toggleInfoShow(client.id);
          }}
          key={client.id}
          className="row border-top"
        >
          <div className="col  my-2">{client.companyName}</div>
          <div className="col  my-2">{client.NIP}</div>
          <div className="col  my-2">{client.contactPerson}</div>
          <div className="col  my-2">{client.email}</div>
          <div className="col  my-2">{client.phoneNumber}</div>
          {moreInfo[client.id] ? (
            <>
              <div class="card">
                <div className="card-body">
                  <h5 className="card-title">{client.companyName}</h5>
                  <h6 className="card-subtitle mx-2 text-muted">
                    {client.NIP}
                  </h6>
                  <p className="card-text">
                    osoba kontaktowa :{client.contactPerson}
                  </p>
                  <p className="card-text">nr telefonu :{client.phoneNumber}</p>
                  <p className="card-text">kod pocztowy :{client.postalCode}</p>
                  <p className="card-text">miasto :{client.city}</p>
                  <p className="card-text">moc instalacji :{client.power}</p>
                  <p className="card-text">cena netto :{client.netPrice} pln</p>
                  <p className="card-text">vat :{client.vat} pln</p>
                  <p className="card-text">
                    cena brutto :{client.grosPrice} pln
                  </p>
                  <p className="card-text">model modułu :{client.module}</p>
                  <p className="card-text">
                    model falownika :{client.inverter}{' '}
                  </p>
                </div>
              </div>
              <PDFViewer>
                <MyDocument />
              </PDFViewer>
              <PDFDownloadLink
                className="card-link"
                document={<MyDocument />}
                fileName="offer.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading ? 'Loading document...' : 'Pobierz ofertę'
                }
              </PDFDownloadLink>
            </>
          ) : null}
        </div>
      );
    });

  const individualClientList = filteredData
    .filter((client) => client.pesel)
    .map((client) => {
      return (
        <div
          onClick={() => {
            toggleInfoShow(client.id);
          }}
          key={client.id}
          className="row border-top"
        >
          <div className="col  my-2">{client.firstname}</div>
          <div className="col  my-2">{client.surname}</div>
          <div className="col  my-2">{client.email}</div>
          <div className="col  my-2">{client.phoneNumber}</div>
          {moreInfo[client.id] ? (
            <>
              <div class="card">
                <div className="card-body">
                  <h5 className="card-title">{client.firstname}</h5>
                  <h6 className="card-subtitle mx-2 text-muted">
                    {client.surname}
                  </h6>
                  <p className="card-text">
                    ul.
                    {client.street}
                    {client.houseNumber}
                  </p>
                  <p className="card-text">kod pocztowy :{client.postalCode}</p>
                  <p className="card-text">{client.city}</p>
                  <p className="card-text">moc : {client.power}</p>
                  <p className="card-text">{client.grosPrice} pln</p>
                  <p className="card-text">{client.module}</p>
                  <p className="card-text">{client.inverter} </p>
                </div>
              </div>
              <PDFViewer>
                <MyDocument />
              </PDFViewer>
              <PDFDownloadLink
                className="card-link"
                document={<MyDocument />}
                fileName="offer.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading ? 'Loading document...' : 'Pobierz ofertę'
                }
              </PDFDownloadLink>
            </>
          ) : null}
        </div>
      );
    });

  return (
    <div>
      <Navigation />
      <SearchBar search={search} setSearch={setSearch} />
      <div className=" text-center mb-5">
        <h3 className="mt-3">Klient Indywidualny</h3>
        {individualClientList.length === 0 ? (
          <div className="alert alert-warning text-center" role="alert">
            "{search}"" nie istnieje
          </div>
        ) : (
          <div className="mb-3">
            <div className="row">
              <div className="col my-2 fw-bold">IMIE</div>
              <div className="col my-2 fw-bold">NAZWISKO</div>
              <div className="col my-2 fw-bold">EMAIL</div>
              <div className="col my-2 fw-bold">TELEFON</div>
            </div>
            <div>{individualClientList}</div>
          </div>
        )}
        <h3 className="mt-3">Klient Biznsowy</h3>
        {buisnessClientsList.length === 0 ? (
          <div className="alert alert-warning text-center" role="alert">
            "{search}"" nie istnieje
          </div>
        ) : (
          <div className="mb-3">
            <div className="row">
              <div className="col my-2 fw-bold">NAZWA FIRMY</div>
              <div className="col my-2 fw-bold">NIP</div>
              <div className="col my-2 fw-bold">OSOBA KONTAKTOWA</div>
              <div className="col my-2 fw-bold">EMAIL</div>
              <div className="col my-2 fw-bold">TELEFON</div>
            </div>
            <div>{buisnessClientsList}</div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Offers;
