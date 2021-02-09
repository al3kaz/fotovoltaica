import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className="d-flex flex-column bd-highlight m-3">
      <ul className="nav nav-pills">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/calculator">
            Kalkulator
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/offers">
            Oferty
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/database">
            Baza Danych
          </NavLink>
        </li>
        <div>Admin</div>
      </ul>
    </div>
  );
};

export default Navigation;
