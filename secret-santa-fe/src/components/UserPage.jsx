import React, { useEffect } from "react";
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
import {
  Divider,
  Grid,
  Drawer,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: `flex`,
    height: "100vh"
  },
  text: {
    padding: theme.spacing(2, 2, 0),
    textAlign: `left`,
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  listText: {
    padding: theme.spacing(0, 7, 0),
    textAlign: `left`,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  drawer: {
    width: 500,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 500,
    background: `#6d0202`
  },
  drawerContainer: {
    overflow: `auto`,
    margin: `auto`,
    color: `white`
  },
  content: {
    flexGrow: 3,
    padding: theme.spacing(3),
    width: `500vh`,
  },
  picture: {},
}));

export default function UserPage(props) {
  const classes = useStyles();
  useEffect(() => {
    console.log(`props changed`, props.data);
  }, [props.data]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant={`permanent`}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <Grid container spacing={0} justify={`center`}>
            <Avatar>
                <Face/>
            </Avatar>
          </Grid>
          <Grid container spacing={0} justify={`center`}>
            <Typography className={classes.text} variant={`h5`} gutterBottom>
              {props.data.first_name ? props.data.first_name : `No Name`} {props.data.last_name ? props.data.last_name : ` Surname`}
            </Typography>
          </Grid>
          <React.Fragment>
            <ListItem button>
              <ListItemAvatar>
                <PermIdentity />
              </ListItemAvatar>
              <ListItemText primary={props.data.email ? props.data.email : `No username available`} secondary={`Username`} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemAvatar>
                <VpnKey />
              </ListItemAvatar>
              <ListItemText
                primary={props.data.hometown ? props.data.hometown.name : `******`}
                secondary={`Password`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        </div>
      </Drawer>
      <main className={classes.content} style = {{backgroundImage: "url('https://www.littlestarsleotards.co.uk/wp-content/uploads/2019/11/blog_secret-santa-leotard-offer-f.png')"}}>
        <Toolbar />
        <Typography className={classes.text} variant={`h6`} gutterBottom>
          Secret pair for you...
        </Typography>
        <Divider />
        
      </main>
    </div>
  );
}
