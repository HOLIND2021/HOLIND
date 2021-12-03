import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
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
  const [pid, setPid] = React.useState(null);
  const [patient, setPatient] = React.useState(null);
  const [patientFound, setPatientFound] = React.useState(true);

  let history = useHistory();
  const { search } = useLocation();
  let query = React.useMemo(() => new URLSearchParams(search), [search]);

  useEffect(() => {
    if (query.get("pid")) {
      setPid(query.get("pid"));
      async function getPatient() {
        const res = await fetch(`${process.env.REACT_APP_API}/api/getPatient/${query.get("pid")}`);
        const body = await res.json();
        if (res.status === 200) {
          setPatientFound(true);
          setPatient(body.body);
          if (body.body.registered) {
            setErrorAlert("Patient Already Registered, Please Sign In");
          }
        } else {
          setPatient(null);
          setPatientFound(false);
        }
      }
      getPatient();
    } else {
      setPatientFound(false);
    }
  }, [pid, query])

  const [errorAlert, setErrorAlert] = React.useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    const email = data.get('email');
    const password = data.get('password');
    const passwordConfirm = data.get('passwordConfirm');
    // eslint-disable-next-line no-console

    if (password === passwordConfirm) {
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
              firstName: patientFound ? patient.first : firstName,
              lastName: patientFound ? patient.last : lastName,
              role: patientFound ? 'patient' : 'clinical',
              pid: patientFound ? pid : null
            })
          }).then(async (res) => {
            console.log("User Document Created")
            if (patient) {
              await fetch(`${process.env.REACT_APP_API}/api/updatePatient`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  puid: pid,
                  registered: true
                })
              })
            }
          })
            .catch((err) => console.log(err))

          console.log('Account Created: ' + email)
          history.push('/home')
        })
        .catch((error) => {
          // Remove the text 'Firebase:' from the beginning of the error message 
          setErrorAlert(String(error.message).slice(10));
          console.log(error)
        });
    } else {
      setErrorAlert('Passwords do not match.')
    }
  };

  if (query.get("pid") && !patient && patientFound ) return null;

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ paddingTop: "50px" }}>
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
          {errorAlert ? <Alert severity="error" sx={{ marginTop: "10px" }}>{errorAlert}</Alert> : ''}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              defaultValue={patient?.first}
              autoFocus
              disabled={patientFound}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              defaultValue={patient?.last}
              disabled={patientFound}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="passwordConfirm"
              label="Confirm Password"
              type="password"
              id="passwordConfirm"
              autoComplete="new-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={patient?.registered}
            >
              Create Account
            </Button>
          </Box>
        </Box>
        <Grid container justifyContent="flex-end">
          <Grid item xs={4} />
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