import { Alert, Button } from '@mui/material';
import { Box, Container } from '@mui/system';
import React from 'react';
import { useHistory } from '../../hooks';
// import UpsertSubjectMutation from '../../mutations/UpsertSubject';

export default function LocalMainContent(props) {
  const {
    children,
    data,
    // relay
  } = props;
  const {
    next,
    err,
    setErr,
    status,
    prev,
    // subject,
    // expertise,
    // packages,
  } = data;

  const history = useHistory();

  function ready() {
    console.log(status);
    return status;
  }

  function onClickPrev() {
    history.push(prev);
  }
  function onClickNext() {
    if (ready()) {
      // UpsertSubjectMutation.commit(
      //   relay.environment,
      //   {
      //     name: subject
      //     expertise: expertise || '',
      //     packages: [...packages] || []
      //   },
      //   (errors, story) => {
      //     if (errors) {
      //       setErr(x => ({
      //         message:
      //           'Facing some errors, sending message to backend.  ' +
      //           err.message,
      //         show: true,
      //       }));
      //     } else {
      //       props.onClose();
      //       history.push(`/news/${story.slug}`);
      //     }
      //   },
      // );
      history.push(next);
    } else {
      setErr({ ...err, show: true });
    }
  }

  return (
    <Box
      flexBasis="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      {children}
      {err.show === true && (
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
            {err.message}
          </Alert>
        </Container>
      )}
      <Box sx={{ display: 'flex', width: '100%', p: 2 }}>
        {prev && (
          <Button
            variant="text"
            onClick={onClickPrev}
            sx={{ display: 'block', marginRight: 'auto' }}
          >
            Previous
          </Button>
        )}
        {next && (
          <Button
            variant="text"
            onClick={onClickNext}
            sx={{ display: 'block', marginLeft: 'auto' }}
          >
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
}
