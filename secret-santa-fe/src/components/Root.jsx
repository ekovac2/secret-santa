import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AddUser from './AddUser';
import SignIn from './SignIn';
import HomePage from './HomePage';
import UserPage from './UserPage';
import Meni from './Meni';

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

export default function Root(props) {

  const classes = useStyles();
  const [loginStatus, setLoginStatus] = useState(false);
  

  const logStatus = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    if(user && user.accessToken){
        setLoginStatus(true);
        return true;
    }
    else {
        setLoginStatus(false);
        return false;
    }
  }

  useEffect(() => {
      logStatus();
  }, []);

  return (
    <Router>
        <Meni logStatus={logStatus} isLoggedIn={loginStatus}/>
    { loginStatus ?
            <Switch>
                <Route exact path="/">
                    <HomePage/>
                </Route>
                <Route exact path="/addUser">
                    <AddUser/>
                </Route>
                <Route exact path="/userPage">
                    <UserPage data={{first_name: "Edina", last_name: "Kovač"}}/>
                </Route>
            </Switch>
    : 
        <Switch>
            <Route exact path="/">
                <HomePage/>
            </Route>
            <Route exact path="/signIn">
                <SignIn logStatus={logStatus}></SignIn>
            </Route>
        </Switch>
    }
    </Router>
  );
}