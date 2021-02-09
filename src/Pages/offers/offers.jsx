import React from 'react';
import Navigation from '../../components/navigation/navigation.component';
import SearchBar from '../../components/searchBar/searchbar.component';

const Offers = () => {
  return (
    <div>
      <Navigation />
      <SearchBar />
      <table className="table table-secondary table-bordered">
        <tr className="table-active">
          <th>#</th>
          <th>Oferta nr</th>
          <th>Klient</th>
          <th>moc</th>
        </tr>
        <tr>
          <td>1</td>
          <td>123</td>
          <td>Smith</td>
          <td>50</td>
        </tr>
        <tr>
          <td>2</td>
          <td>321</td>
          <td>Jackson</td>
          <td>94</td>
        </tr>
      </table>
    </div>
  );
};

export default Offers;
