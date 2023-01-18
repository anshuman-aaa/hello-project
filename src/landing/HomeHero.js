/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';

import LoginButton from '../common/LoginButton';

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

function HomeHero() {
  const s = useStyles();

  return (
    <div className={s.root}>
      <center>
        <Typography className={s.title} variant="h3">
          Hello Project
        </Typography>
        <Typography className={s.subTitle} variant="h5">
          Sign-in to explore the tutoring!!
        </Typography>
        <div className={s.actions}>
          <LoginButton className={s.button} provider="google" />
        </div>
      </center>
    </div>
  );
}

export default HomeHero;
