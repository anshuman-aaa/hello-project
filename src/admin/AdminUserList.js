/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { createFragmentContainer, graphql } from 'react-relay';

function AdminUserList(props) {
  return (
    <React.Fragment>
      <Typography variant="h3">Users</Typography>
      <List>
        <ListItem>User A</ListItem>
        <ListItem>User B</ListItem>
        <ListItem>User C</ListItem>
      </List>
    </React.Fragment>
  );
}

export default createFragmentContainer(AdminUserList, {
  data: graphql`
    fragment AdminUserList_data on Query {
      me {
        id
      }
    }
  `,
});
