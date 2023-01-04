import { Alert, Button } from '@mui/material';
import { Box, Container } from '@mui/system';
import React from 'react';
import { useLocalContext } from './hooks/LocalContext';
import { useHistory } from '../../hooks';

export default function LocalMainContent() {
  const { children, curr, setCurr, err, setErr, status } = useLocalContext();
  const child = children[curr];

  const history = useHistory();

  function ready() {
    if (status.subject && curr === 0) {
      return true;
    } else if (status.expertise && curr === 1) {
      return true;
    } else if (status.packages && curr === 2) {
      return true;
    }
  }

  return (
    <Box
      flexBasis="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      {child}
      {err[curr].show === true && (
        <Container
          maxWidth="sm"
          sx={{
            flexBasis: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'start',
          }}
        >
          <Alert severity="error" sx={{ flexBasis: '100%' }}>
            {err[curr].message}
          </Alert>
        </Container>
      )}
      <Box sx={{ display: 'flex', width: '100%', p: 2 }}>
        {curr > 0 && (
          <Button
            variant="text"
            onClick={() => setCurr(curr - 1)}
            sx={{ display: 'block', marginRight: 'auto' }}
          >
            Previous
          </Button>
        )}
        {curr < children.length && (
          <Button
            variant="text"
            onClick={() => {
              if (ready()) {
                if (curr !== children.length - 1) {
                  setCurr(curr + 1);
                } else {
                  history.push('/subjects');
                }
              } else {
                let newerr = [...err];
                newerr[curr].show = true;
                setErr(newerr);
              }
            }}
            sx={{ display: 'block', marginLeft: 'auto' }}
          >
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
}
