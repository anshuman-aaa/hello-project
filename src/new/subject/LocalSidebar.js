import React from 'react';
import {
  Dialog,
  Divider,
  Fab,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Box, Container } from '@mui/system';
import { useLocalContext } from './hooks/LocalContext';
import { Bolt, CloseOutlined } from '@mui/icons-material';

export default function LocalSidebar(props) {
  const { help, didyouknow, curr } = useLocalContext();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const smallScreen = useMediaQuery('(max-width:600px)');

  const mainContent = (
    <>
      {!smallScreen && <Divider orientation="vertical" variant="middle" />}
      <Box
        flexBasis={
          useMediaQuery('(max-width:764px)')
            ? '25%'
            : !smallScreen
            ? '40%'
            : '0'
        }
      >
        {help[curr] ? (
          <Container maxWidth="xs">
            <Typography align="left" variant="h5" sx={{ pt: 5 }}>
              Tips
            </Typography>
            <Typography align="justify" sx={{ py: 3 }}>
              {help[curr]}
            </Typography>
          </Container>
        ) : (
          ''
        )}
        {didyouknow[curr] ? (
          <Container maxWidth="xs">
            <Typography align="left" variant="h5" sx={{ pt: 5 }}>
              Did You Know ?
            </Typography>
            <Typography align="justify" sx={{ py: 3 }}>
              {didyouknow[curr]}
            </Typography>
          </Container>
        ) : (
          ''
        )}
      </Box>
    </>
  );

  if (!smallScreen) return mainContent;
  else
    return (
      <>
        <Fab
          variant="extended"
          color="primary"
          size="medium"
          sx={{ position: 'fixed', bottom: 50, right: 10 }}
          onClick={handleClickOpen}
        >
          <Bolt />
          <Typography variant="body1">Tips</Typography>
        </Fab>
        <Dialog fullScreen open={open} onClose={handleClose}>
          {mainContent}
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseOutlined />
          </IconButton>
        </Dialog>
      </>
    );
}

// TransitionComponent={Transition}
