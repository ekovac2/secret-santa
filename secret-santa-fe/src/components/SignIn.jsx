import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
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
  menuButton: {
    marginRight: theme.spacing(2),
    color: "white",
    textDecoration: "none",
  },
  alert: {
    margin: theme.spacing(3, 0, 2),
    justifyContent: "center",
  },
}));

export default function SignIn(props) {
  useEffect(() => {
    console.log(`props changed`, props);
  }, [props.logStatus]);

  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(false);

  const history = useHistory();

  const signInToAccount = (username, password) => {
    console.log(username, password);
    axios
      .post("http://localhost:8081/api/auth/signin", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        props.logStatus();
        history.push("/");
        setSuccess(true);
        setMessage(true);
        setTimeout(() => {
          setMessage(false);
        }, 2000);
        return response.data;
      })
      .catch((error) => {
        setSuccess(false);
        setMessage(true);
        setTimeout(() => {
          setMessage(false);
        }, 2000);
        console.log("Greska u post sign in!");
        console.log(error);
      });
  };
  return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="Username"
                  autoComplete="Username"
                  onChange={(e) => setUsername(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {
                signInToAccount(username, password);
              }}
            >
              Submit
            </Button>
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
