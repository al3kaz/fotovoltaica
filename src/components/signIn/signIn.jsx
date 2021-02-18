import React, { useState } from 'react';
import { auth } from '../../firebase';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      setError('Error signing in with password and email!');
      console.error('Error signing in with password and email', error);
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === 'userEmail') {
      setEmail(value);
    } else if (name === 'userPassword') {
      setPassword(value);
    }
  };

  return (
    <div className="container">
      <h1>Sign In</h1>
      <div className="">
        {error !== null && <div className="">{error}</div>}
        <form
          className="form-signin"
          onSubmit={(event) => {
            signInWithEmailAndPasswordHandler(event, email, password);
          }}
        >
          <div className="form-label-group">
            <label htmlFor="userEmail">Email:</label>
            <input
              type="email"
              className="form-control"
              name="userEmail"
              value={email}
              placeholder="Your Email"
              id="userEmail"
              onChange={(event) => onChangeHandler(event)}
            />
          </div>
          <div className="form-label-group">
            <label htmlFor="userPassword" className="">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              name="userPassword"
              value={password}
              placeholder="Your Password"
              id="userPassword"
              onChange={(event) => onChangeHandler(event)}
            />
          </div>
          <button
            className="btn btn-lg btn-primary btn-block text-uppercase mt-3"
            type="submit"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignIn;
