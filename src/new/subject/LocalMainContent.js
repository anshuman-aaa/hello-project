import { Alert, Button } from '@mui/material';
import { Box, Container } from '@mui/system';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { useHistory } from '../../hooks';
import UpsertSubjectMutation from '../../mutations/UpsertSubject';
import InsertPackageMutation from '../../mutations/InsertPackage';

function LocalMainContent(props) {
  const { children, localdata, relay } = props;
  const {
    next,
    err,
    setErr,
    status,
    prev,
    subject,
    expertise,
    packages,
  } = localdata;

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
      function errOrNext(errors, subject) {
        if (errors) {
          setErr(x => ({
            message:
              'Facing some errors, sending message to backend.  ' + err.message,
            show: true,
          }));
        } else {
          if (window.location.pathname.match(/subject/g))
            history.push(`/new/${subject.id}/expertise`);
          else if (window.location.pathname.match(/expertise/g))
            history.push(`/new/${subject.id}/packages`);
          else if (window.location.pathname.match(/packages/g))
            history.push(`/subjects`);
        }
      }
      if (packages)
        packages.forEach(pkg =>
          InsertPackageMutation.commit(
            relay.environment,
            {
              package: pkg,
            },
            errOrNext(),
          ),
        );
      else
        UpsertSubjectMutation.commit(
          relay.environment,
          {
            name: subject,
            expertise: expertise || '',
          },
          errOrNext(),
        );
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

export default createFragmentContainer(LocalMainContent, {
  subjectList: graphql`
    fragment LocalMainContent_subjectList on Subject {
      id
      name
      expertise
    }
  `,
});
