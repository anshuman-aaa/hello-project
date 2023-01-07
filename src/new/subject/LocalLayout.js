import { Box } from '@mui/material';
import React from 'react';
import LocalMainContent from './LocalMainContent';
import LocalSidebar from './LocalSidebar';

export default function LocalLayout(props) {
  const { children, data } = props;
  return (
    <Box flexBasis="100%" display="flex" flexDirection="row">
      <LocalMainContent data={{ ...data }} err={{ ...data }}>
        {children}
      </LocalMainContent>
      <LocalSidebar help={data.help} didyouknow={data.didyouknow} />
    </Box>
  );
}
