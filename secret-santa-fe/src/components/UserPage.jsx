import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import VpnKey from "@material-ui/icons/VpnKey";
import PermIdentity from "@material-ui/icons/PermIdentity";
import Face from "@material-ui/icons/Face";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import axios from "axios";
import {
  Divider,
  Grid,
  Drawer,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh"
  },
  text: {
    padding: theme.spacing(2, 2, 0),
    textAlign: "center",
  },
  textMain: {
    marginLeft: theme.spacing(50),
    padding: theme.spacing(2, 2, 0),
    textAlign: "center",
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  listText: {
    padding: theme.spacing(0, 7, 0),
    textAlign: "left",
  },
  drawer: {
    width: 500,
    flexShrink: 0,
    background: "#fff7f8"
  },
  drawerPaper: {
    width: 500,
  },
  drawerContainer: {
    overflow: "auto",
    margin: "auto",
  },
  content: {
    flexGrow: 3,
    padding: theme.spacing(5),
    width: "500vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundImage: "url('https://image.freepik.com/free-vector/secret-santa-claus-invitation-background-standing-blank-sign-showing-big-blank-sign_209425-431.jpg')"
  },
}));

export default function UserPage(props) {
  const classes = useStyles();
  const [connection, setConnection] = useState(null);

  const getMyMatch = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  let header = "";
  if (user && user.accessToken)
    header = { "x-access-token": user.accessToken };
  let username = user.username;
  axios
    .post(
      "http://localhost:8081/api/getUserMatch",
      { username },
      { headers: header }
    )
    .then((response) => {
      if(response.data.connectedPerson[0].username != username)
        setConnection(response.data.connectedPerson[0].name + " " + response.data.connectedPerson[0].surname)
      else
        setConnection("Person is not selected yet!")
    })
    .catch((error) => {
      console.log("Greska pri dobavljanju matcha");
      console.log(error);
    });
  }
  useEffect(() => {
    console.log(`props changed`, props.data);
    getMyMatch();
  }, [props.data]);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant={"permanent"}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <Grid container spacing={0} justify={"center"}>
            <Avatar>
                <Face/>
            </Avatar>
          </Grid>
          <Grid container spacing={0} justify={"center"}>
            <Typography className={classes.text} variant={"h5"} gutterBottom>
              {props.data.name ? props.data.name : "No Name"} {props.data.surname ? props.data.surname : "Surname"}
            </Typography>
          </Grid>
          <React.Fragment>
            <ListItem button>
              <ListItemAvatar>
                <PermIdentity />
              </ListItemAvatar>
              <ListItemText primary={props.data.username ? props.data.username : "No username available"} secondary={"Username"} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemAvatar>
                <VpnKey />
              </ListItemAvatar>
              <ListItemText
                primary={props.data.password ? props.data.hometown.password : "*******"}
                secondary={"Password"}
              />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemAvatar>
                <VerifiedUser />
              </ListItemAvatar>
              <ListItemText
                primary={props.data.roles ? props.data.roles : ""}
                secondary={"Role"}
              />
            </ListItem>
          </React.Fragment>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Typography className={classes.textMain} variant={"h6"} gutterBottom>
          Secret pair for you is...
        </Typography>
        <Typography className={classes.textMain} variant={"h6"} gutterBottom>
          {connection}
        </Typography>
      </main>
    </div>
  );
}
