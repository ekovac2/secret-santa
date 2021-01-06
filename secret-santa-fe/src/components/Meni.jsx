import React, {Fragment, useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AcUnitOutlined from '@material-ui/icons/AcUnitOutlined';
import { Button } from '@material-ui/core';
import {
  BrowserRouter as 
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
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
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

export default function Meni({logStatus, isLoggedIn}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.removeItem("user");
    logStatus();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >            
      <MenuItem onClick={handleMenuClose}>
        <Link className={classes.link} to="/addUser">Add User</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link className={classes.link} to="/userPage">User Page</Link>
      </MenuItem>
    </Menu>
  );

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
                { isLoggedIn ?
                <Fragment>

                    <Button color="secondary" onClick = {()=>{logout();}}>
                      <Link className={classes.menuButton} to="/">Logout</Link>
                    </Button>
                    <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                    {renderMenu}
                  </Fragment>
                  :
                  <Button color="secondary">
                    <Link className={classes.menuButton} to="/signIn">Login</Link>
                  </Button>
                }
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}