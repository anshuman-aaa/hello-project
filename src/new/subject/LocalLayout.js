import { Box } from '@mui/material';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import LocalMainContent from './LocalMainContent';
import LocalSidebar from './LocalSidebar';

function LocalLayout(props) {
  const { children, backend_data, localdata } = props;
  return (
    <Box flexBasis="100%" display="flex" flexDirection="row">
      <LocalMainContent
        localdata={{ ...localdata }}
        err={{ ...localdata }}
        subjectList={backend_data.subjects}
      >
        {children}
      </LocalMainContent>
      <LocalSidebar help={localdata.help} didyouknow={localdata.didyouknow} />
    </Box>
  );
}

export default createFragmentContainer(LocalLayout, {
  backend_data: graphql`
    fragment LocalLayout_backend_data on Query {
      subjects {
        ...LocalMainContent_subjectList
      }
    }
  `,
});
