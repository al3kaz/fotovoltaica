import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Navigation from '../../components/navigation/navigation.component';
import SearchBar from '../../components/searchBar/searchbar.component';
import Spinner from '../../components/spinner/spinner';
const db = firebase.firestore();

const Offers = () => {
  const [search, setSearch] = React.useState('');

  const [clients, setClients] = React.useState();

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

  const buisnessClientsList = filteredData
    .filter((client) => client.NIP)
    .map((client) => {
      return (
        <tr key={client.id}>
          <td>{client.companyName}</td>
          <td>{client.NIP}</td>
          <td>{client.contactPerson}</td>
          <td>{client.email}</td>
          <td>{client.phoneNumber}</td>
        </tr>
      );
    });

  const individualClientList = filteredData
    .filter((client) => client.pesel)
    .map((client) => {
      return (
        <tr key={client.id}>
          <td>{client.firstname}</td>
          <td>{client.surname}</td>
          <td>{client.email}</td>
          <td>{client.phoneNumber}</td>
        </tr>
      );
    });

  return (
    <div>
      <Navigation />
      <SearchBar search={search} setSearch={setSearch} />
      <table className="table table-striped table-hover">
        <h3>Klient Indywidualny</h3>
        <tr className="table-active">
          <th scope="col">Imie</th>
          <th scope="col">Nazwisko</th>
          <th scope="col">Email</th>
          <th scope="col">Telefon</th>
        </tr>
        <tbody>{individualClientList}</tbody>
      </table>
      <table className="table table-striped table-hover">
        <h3>Klient Biznsowy</h3>
        <tr className="table-active">
          <th scope="col">Nazwa Firmy</th>
          <th scope="col">NIP</th>
          <th scope="col">osoba kontaktowa</th>
          <th scope="col">email</th>
          <th scope="col">telefon</th>
        </tr>
        <tbody>{buisnessClientsList}</tbody>
      </table>
    </div>
  );
};
export default Offers;
