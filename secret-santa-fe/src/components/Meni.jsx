import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AcUnitOutlined from '@material-ui/icons/AcUnitOutlined';
import {
  Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "white",
    textDecoration: "none"
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center'
    },
  },
  link: {
    textDecoration: "none"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#2E3B55'
  }
}));

export default function Meni({children}) {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position={`fixed`} className={classes.appBar}>
        <Toolbar>
          <Link className={classes.menuButton} to="/">
            <AcUnitOutlined/>
          </Link>
          <Typography className={classes.title} variant="h6" noWrap>
            Secret Santa 
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
                {children}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}