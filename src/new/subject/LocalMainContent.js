import { Alert, Button } from '@mui/material';
import { Box, Container } from '@mui/system';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { useHistory } from '../../hooks';
import UpsertSubjectMutation from '../../mutations/UpsertSubject';

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
    subjectID,
    packages,
  } = localdata;

  const history = useHistory();

  function ready() {
    return status;
  }

  function onClickPrev() {
    history.push(prev);
  }
  function onClickNext() {
    if (ready()) {
      const localErrHandeler = (errors, story) => {
        if (errors) {
          console.log(errors);
          setErr(x => ({
            message:
              'Facing some errors, sending message to backend. ' + err.message,
            show: true,
          }));
        } else {
          if (next) history.push(`/new/${story.id}/${next}`);
          else history.push(`/subjects`);
        }
      };
      if (packages) {
        packages.array.forEach(pkg => {
          // UpsertPackageMutation.commit(
          //   relay.environment,
          //   {
          //     pkg,
          //     subjectId: subjectID,
          //   },
          //   localErrHandeler,
          // );
          console.log(pkg);
        });
      } else {
        UpsertSubjectMutation.commit(
          relay.environment,
          {
            id: subjectID,
            name: subject || undefined,
            expertise: expertise || undefined,
          },
          localErrHandeler,
        );
      }
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

// export default LocalMainContent;
export default createFragmentContainer(LocalMainContent, {
  subjectList: graphql`
    fragment LocalMainContent_subjectList on Query {
      subjects {
        id
        name
        expertise
      }
    }
  `,
});
