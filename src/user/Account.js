/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import { createFragmentContainer, graphql } from 'react-relay';

const useStyles = makeStyles({
  container: {
    maxWidth: 600,
    boxSizing: 'border-box',
    margin: '0 auto',
  },
  content: {
    padding: '1em 2em',
    margin: '2em 0',
  },
});

function Account(props) {
  const s = useStyles();
  //   console.log(props);
  return (
    <div className={s.container}>
      <Card className={s.content}>
        <Typography variant="h5" gutterBottom>
          My Account
        </Typography>
        <Typography paragraph>
          Welcome, {props.data.me && props.data.me.displayName}!
        </Typography>
      </Card>
    </div>
  );
}

export default createFragmentContainer(Account, {
  data: graphql`
    fragment Account_data on Query {
      me {
        id
        username
        displayName
        photoURL
      }
    }
  `,
});
