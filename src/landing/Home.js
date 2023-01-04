/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
// import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';

// import HomeSponsors from './HomeSponsors';
import HomeStack from './HomeStack';

const useStyles = makeStyles(theme => ({
  content: {
    ...theme.mixins.content,
  },
  title: {
    textAlign: 'center',
  },
  subTitle: {
    textAlign: 'center',
  },
  code: {
    padding: theme.spacing(2),
    color: theme.palette.common.white,
    backgroundColor: '#555',
    fontFamily: '"Roboto Mono"',
    fontWeight: 100,
    fontSize: '0.875rem',
    marginBottom: theme.spacing(3),
  },
  block: {},
}));

function Home() {
  const s = useStyles();

  return (
    <React.Fragment>
      {/* <HomeSponsors /> */}
      <Typography className={s.title} variant="h4" gutterBottom>
        Removing Sponsors
      </Typography>
      <div className={s.content}>
        <Typography className={s.title} variant="h4" gutterBottom>
          Removing Getting Started
        </Typography>
        {/* <Typography className={s.title} variant="h4" gutterBottom>
          Getting Started
        </Typography>
        <Typography paragraph>
          Just clone the{' '}
          <a
            href="https://github.com/kriasoft/react-firebase-starter"
            target="_blank"
            rel="noopener noreferrer"
          >
            repository
          </a>
          , tweak environment variables found in .env.* files in the root of the
          project and start hacking.
        </Typography>
        <Paper className={s.code} elevation={2}>
          $ git clone https://github.com/kriasoft/react-firebase-starter.git
          example
          <br />
          $ cd ./example
          <br />
          $ yarn setup
          <br />$ yarn start
        </Paper> */}
        <Typography className={s.title} variant="h4" gutterBottom>
          Tech Stack
        </Typography>
        {/* <Typography className={s.subTitle} paragraph>
          Save time. Create with confidence.
        </Typography> */}
        <HomeStack />
      </div>
    </React.Fragment>
  );
}

export default Home;
