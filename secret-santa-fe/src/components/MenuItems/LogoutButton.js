import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import {
  Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    color: "white",
    textDecoration: "none"
  },
}));

export default function LogoutButton({logout}) {
  const classes = useStyles();

  return (
    <Link to="/" onClick = {()=>{logout();}} style={{ textDecoration: 'none' }}>
      <Button color="secondary" className={classes.menuButton}>
        Logout
      </Button>
    </Link>
  );
}