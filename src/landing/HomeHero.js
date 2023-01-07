/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';

import LoginButton from '../common/LoginButton';
import { Link } from '@mui/material';
import { graphql } from 'relay-runtime';
import { createFragmentContainer } from 'react-relay';

const useStyles = makeStyles(theme => ({
  root: {
    ...theme.mixins.content,
    paddingTop: '2rem',
    paddingBottom: '3rem',
    [theme.breakpoints.up('sm')]: {
      paddingTop: '3rem',
      paddingBottom: '4rem',
    },
  },
  title: {
    paddingBottom: '1rem',
    fontWeight: 300,
    fontSize: '1.75rem',
    color: theme.palette.common.white,
    [theme.breakpoints.up('sm')]: {
      fontSize: '2.5rem',
    },
  },
  subTitle: {
    paddingBottom: '1rem',
    color: theme.palette.common.white,
    fontWeight: 300,
    fontSize: '1.125rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.5rem',
    },
  },
  actions: {
    paddingTop: '1rem',
  },
  button: {
    boxShadow: 'none',
    backgroundColor: '#555',
    '&:hover': {
      backgroundColor: '#666',
    },
  },
}));

function HomeHero(props) {
  const { me } = props;
  const s = useStyles();
  console.log(me);
  return (
    <div className={s.root}>
      <Typography className={s.title} variant="h3">
        Jagteshver's Assignment
      </Typography>
      <Typography className={s.subTitle} variant="h5">
        Bootstrapped from{' '}
        <Link href="https://github.com/kriasoft/react-firebase-starter">
          Kriasoft's React Firebase Starter Kit
        </Link>
      </Typography>
      {!me && (
        <div className={s.actions}>
          <LoginButton className={s.button} provider="google" />
        </div>
      )}
    </div>
  );
}

export default createFragmentContainer(HomeHero, {
  data: graphql`
    fragment HomeHero_data on Query {
      me {
        ...AppBar_me
        ...AutoUpdater_me
        ...UserSettingsDialog_me
      }
    }
  `,
});
