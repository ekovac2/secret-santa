import React, {Fragment, useState} from 'react';
import LogoutButton from './LogoutButton';
import ProfileMenu from './ProfileMenu';

export default function AdminItems({logout}) {
  return (
    <Fragment>
        <LogoutButton logout={logout} />
        <ProfileMenu options={[
          {path: '/addUser', name: 'Add User'},
          {path: '/userPage', name: 'User Page'},
          {path: '/allUsers', name: 'All Users'}
        ]}
        />
    </Fragment>
  );
}