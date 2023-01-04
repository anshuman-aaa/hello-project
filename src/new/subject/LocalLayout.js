import { Box } from '@mui/material';
import React from 'react';
import LocalMainContent from './LocalMainContent';
import LocalSidebar from './LocalSidebar';

export default function LocalLayout() {
  return (
    <Box flexBasis="100%" display="flex" flexDirection="row">
      <LocalMainContent />
      <LocalSidebar />
    </Box>
  );
}
