import React, {Fragment} from 'react';
import LogoutButton from './LogoutButton';
import ProfileMenu from './ProfileMenu';

export default function UserItems({logout}) {
  return (
    <Fragment>
        <LogoutButton logout={logout} />
        <ProfileMenu options={[
          {path: '/userPage', name: 'User Page'},
        ]}
        />
    </Fragment>
  );
}