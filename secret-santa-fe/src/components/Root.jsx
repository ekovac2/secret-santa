import React, {useState, useEffect, Fragment} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AddUser from './AddUser';
import SignIn from './SignIn';
import HomePage from './HomePage';
import UserPage from './UserPage';
import AllUsersPage from './AllUsersPage'
import Meni from './Meni';

import NotLoggedInItems from './MenuItems/NotLoggedInItems';
import AdminItems from './MenuItems/AdminItems';
import UserItems from './MenuItems/UserItems';

export default function Root(props) {
  const [user, setUser] = useState(null);
  

  const logStatus = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    if(user && user.accessToken){
        setUser(user);
    }
    else {
        setUser(null);
    }
  }

  const logout = () => {
      localStorage.removeItem('user');
      logStatus();
  }

  useEffect(() => {
      logStatus();
  }, []);

  return (
    <Router>
        <Meni>
            {   !user && <NotLoggedInItems />  }
            {   user && user.roles[0] == "ROLE_ADMIN" && <AdminItems logout={logout} /> }
            {   user && user.roles[0] == "ROLE_USER" && <UserItems logout={logout} /> }
        </Meni>
        <Switch>
            {   !user && <NoLoginRoutes logStatus={logStatus} /> }
            {   user && user.roles[0] == "ROLE_ADMIN" && <AdminRoutes user={user} /> }
            {   user && user.roles[0] == "ROLE_USER" && <UserRoutes user={user} /> }
        </Switch>
    </Router>
  );
}

function NoLoginRoutes({logStatus}) {
    return (
        <Fragment>
            <Route exact path="/">
                <HomePage/>
            </Route>
            <Route exact path="/signIn">
                <SignIn logStatus={logStatus}></SignIn>
            </Route>
        </Fragment>
    )
}

function UserRoutes({user}) {
    return (
        <Fragment>
            <Route exact path="/">
                <HomePage/>
            </Route>
            <Route exact path="/userPage">
                <UserPage data={{first_name: user.name, last_name: user.surname}}/>
            </Route>
        </Fragment>
    )
}

function AdminRoutes({user}) {
    return (
        <Fragment>
            <Route exact path="/">
                <HomePage/>
            </Route>
            <Route exact path="/addUser">
                <AddUser/>
            </Route>
            <Route exact path="/userPage">
                <UserPage data={user}/>
            </Route>
            <Route exact path="/allUsers">
                <AllUsersPage />
            </Route>
        </Fragment>
    )
}