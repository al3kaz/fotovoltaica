import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { auth } from '../../firebase';

const Navigation = () => {
  return (
    <div className="sticky-top m-3">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid justify-content-center">
          <ul className="nav nav-tabs justify-content-center">
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
      </nav>
    </div>
  );
};

export default Navigation;
