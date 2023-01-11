import React from 'react';
import { Box } from '@mui/system';
import { createFragmentContainer, graphql } from 'react-relay';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Edit } from '@mui/icons-material';

function SubjectList(props) {
  const { backend_data } = props;
  return (
    <Box flexBasis="100%">
      <List>
        {backend_data.map(sub => (
          <ListItem disablePadding>
            <ListItemText primary={sub.name} />
            <ListItemButton>
              <ListItemIcon>
                <Edit />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default createFragmentContainer(SubjectList, {
  backend_data: graphql`
    fragment SubjectList_backend_data on Query {
      subjects {
        id
        name
        expertise
      }
    }
  `,
});
