import React, { useState } from 'react';
import { useStyles } from './sineIn.style';
import {
  auth,
  Alert,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Container,
  logo,
} from './index';

const SignIn = () => {
  const classes = useStyles();

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
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <img className={classes.logo} src={logo} alt="Logo" />
          <Typography component="h1" variant="h5">
            Logowanie
          </Typography>
          <form
            className={classes.form}
            onSubmit={(event) => {
              signInWithEmailAndPasswordHandler(event, email, password);
            }}
            noValidate
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userEmail"
              label="Email"
              name="userEmail"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(event) => onChangeHandler(event)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="userPassword"
              label="Hasło"
              type="password"
              id="userPassword"
              autoComplete="current-password"
              value={password}
              onChange={(event) => onChangeHandler(event)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Zapamiętaj mnie"
            />
            {error !== null && (
              <Alert severity="error">Zły login lub hasło</Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Zaloguj się
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};
export default SignIn;
