import React, { Fragment, useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
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

export default function ProfileMenu({options}) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';

  return (
    <Fragment>
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
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >         
            {options.map((option) => {
                return (
                    <Link className={classes.link} to={option.path} onClick={handleMenuClose}>
                      <MenuItem >
                        {option.name}
                      </MenuItem>
                    </Link>
                )
            })}   

        </Menu>
    </Fragment>
  );
}