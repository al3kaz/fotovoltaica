import { Autocomplete } from '@material-ui/lab';
import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { auth } from '../../firebase';
import { UserContext } from '../../providers/UserProvider';
import logo from '../../image/unnamed_(3).png'


const Navigation = () => {
  const user = useContext(UserContext)
  return (
    <div className="sticky-top w-100">
      <div className='d-flex justify-content-center bg-light w-100 p-3'>
      <img src={logo} width='150px' height='auto'/>
      </div>
      <div className='d-flex justify-content-center bg-light w-100 '>
        <NavLink to='/profile'>{user.user.email}</NavLink>
      </div>
     
      <nav className="navbar nav-tabs navbar-expand-lg navbar-light bg-light ">
        <div className="container-fluid justify-content-center">
          <ul className="nav  justify-content-center">
            {/* <li className="nav-item">
              <NavLink className="nav-link" exact to="/">
                Start
              </NavLink>
            </li> */}
            <li>
              <NavLink className="nav-link" exact to="/">
                Kalkulator
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/offers">
                Klient
              </NavLink>
            </li> */}
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
