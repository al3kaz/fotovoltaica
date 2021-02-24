import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { auth } from '../../firebase';

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="d-flex flex-column bd-highlight m-3">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/">
              Start
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/calculator">
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
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/"
              onClick={() => {
                auth.signOut();
              }}
            >
              wyloguj
            </Link>
          </li>
        </ul>
      </div>
    </nav >
  );
};

export default Navigation;
