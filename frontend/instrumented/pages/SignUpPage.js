import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MuiAlert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { firebaseAuth } from '../Firebase';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://holind-a4624.web.app/">
        HOLIND
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme();

export default function LoginPage() {
  let history = useHistory();

  const [errorAlert, setErrorAlert] = React.useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    const email = data.get('email');
    const password = data.get('password');
    // eslint-disable-next-line no-console

    firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then(async (userCredential) => {
      // Signed in 
      const uid = userCredential.user.uid;

      await fetch(`${process.env.REACT_APP_API}/api/createUser`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              uid,
              firstName,
              lastName
          })
      }).then((res) => console.log("User Document Created"))
      .catch((err) => console.log(err))

      console.log('Account Created: ' + email)
      history.push('/home')
    })
    .catch((error) => {
      // Remove the text 'Firebase:' from the beginning of the error message 
      setErrorAlert(String(error.message).slice(10));
      console.log(error)
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{paddingTop: "50px"}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#293020' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {errorAlert ? <Alert severity="error" sx={{marginTop: "10px"}}>{errorAlert}</Alert> : ''}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Account
            </Button>
          </Box>
        </Box>
        <Grid container justifyContent="flex-end">
            <Grid item xs={4}/>
            <Grid container item justifyContent="flex-end">
                <Link href="/login" variant="body2">
                    Already have an account? Sign In
                </Link>
            </Grid>
        </Grid>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}