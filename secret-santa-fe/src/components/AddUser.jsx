import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#2E3B55",
  },
  alert: {
    margin: theme.spacing(3, 0, 2),
    justifyContent: "center",
  },
}));

export default function AddUser() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(false);

  const addNewUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    let header = "";
    if (user && user.accessToken)
      header = { "x-access-token": user.accessToken };

    let roles = ["user"];
    console.log(name, surname, username, password);
    axios
      .post(
        "http://localhost:8081/api/auth/signup",
        { name, surname, username, password, roles },
        { headers: header }
      )
      .then((response) => {
        setSuccess(true);
        setMessage(true);
        setTimeout(() => {
          setMessage(false);
        }, 2000);
        console.log("uspjesno dodano");
      })
      .catch((error) => {
        setSuccess(false);
        setMessage(true);
        setTimeout(() => {
          setMessage(false);
        }, 2000);
        console.log("Greska u post dodavanje usera!");
        console.log(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAdd />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add new user
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e) => {
                  setSurname(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              addNewUser();
            }}
          >
            submit
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          {message ? (
            <Alert
              fullWidth
              className={classes.alert}
              severity={success ? "success" : "error"}
            >
              {success ? "Successfully added user!" : "Something went wrong!"}
            </Alert>
          ) : (
            <div></div>
          )}
        </form>
      </div>
    </Container>
  );
}
