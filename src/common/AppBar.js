/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import clsx from 'clsx';
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import makeStyles from '@mui/styles/makeStyles';
import { createFragmentContainer, graphql } from 'react-relay';
import { Typography } from '@mui/material';
import AddSubject from '../landing/AddSubject';
import Link from './Link';
import UserMenu from './UserMenu';
import { useConfig, useHistory, useAuth } from '../hooks';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#3f51b5',
    backgroundImage: 'linear-gradient(-225deg, #3db0ef, #5e5bb7)',
  },
  title: {
    fontFamily: theme.typography.monoFamily,
    fontWeight: 300,
    fontSize: '1.25rem',
  },
  titleLink: {
    color: 'inherit',
    textDecoration: 'none',
  },
  avatarButton: {
    padding: theme.spacing(0.5),
    marginLeft: theme.spacing(1),
  },
  avatar: {
    width: 32,
    height: 32,
  },
}));

function AppBar(props) {
  const {
    className,
    me,
    relay,
    close,
    children,
    onOpenSettings,
    ...other
  } = props;
  const [userMenuEl, setUserMenuEl] = React.useState(null);
  const { app } = useConfig();
  const history = useHistory();
  const auth = useAuth();
  const s = useStyles();

  function handleAddSub() {
    setDstate(true);
  }

  function handleClose() {
    history.replace('/');
  }

  function openUserMenu(event) {
    setUserMenuEl(event.currentTarget);
  }

  function closeUserMenu() {
    setUserMenuEl(null);
  }

  function signIn() {
    closeUserMenu();
    auth.signIn();
  }
  const [dstate, setDstate] = useState(false);
  function closeDiag() {
    setDstate(false);
  }
  return (
    <MuiAppBar className={clsx(s.root, className)} elevation={0} {...other}>
      <Toolbar>
        <AddSubject me={me} relay={relay} open={dstate} onClose={closeDiag} />
        {me && (
          <Button variant="contained" onClick={handleAddSub}>
            Add Subject
          </Button>
        )}
        <Typography className={s.title} variant="h1">
          <Link className={s.titleLink} href="/">
            {app.name + ' Hello'}
          </Link>
        </Typography>
        <span style={{ flexGrow: 1 }} />
        {close ? (
          <IconButton onClick={handleClose} color="inherit" size="large">
            <CloseIcon />
          </IconButton>
        ) : (
          <React.Fragment>
            <Button color="inherit" component={Link} href="/news">
              News
            </Button>
            {children}
            {me && (
              <IconButton
                className={s.avatarButton}
                onClick={openUserMenu}
                aria-owns={userMenuEl ? 'user-menu' : null}
                aria-haspopup="true"
                size="large"
              >
                <Avatar
                  className={s.avatar}
                  src={me.photoURL}
                  alt={me.displayName}
                />
              </IconButton>
            )}
            {me && (
              <UserMenu
                id="user-menu"
                role="menu"
                open={Boolean(userMenuEl)}
                anchorEl={userMenuEl}
                onClose={closeUserMenu}
                onOpenSettings={onOpenSettings}
              />
            )}
            {!me && (
              <Button className={s.button} color="inherit" onClick={signIn}>
                Log In / Sign Up
              </Button>
            )}
          </React.Fragment>
        )}
      </Toolbar>
    </MuiAppBar>
  );
}

export default createFragmentContainer(AppBar, {
  me: graphql`
    fragment AppBar_me on User {
      id
      photoURL
      displayName
    }
  `,
});
