import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
// import {createBrowserHistory} from 'history'
import { useHistory } from '../hooks';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteSubjectMutation from '../mutations/DeleteSubject';
const useStyles = makeStyles(theme => ({
  root: {
    ...theme.mixins.content,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItem: {
    paddingRight: 0,
    paddingLeft: 0,
  },
  listItemText: {
    paddingRight: 0,
    '&& a': {
      color: 'rgba(0, 0, 0, 0.8)',
      textDecoration: 'none',
    },
    '&& > p > a': {
      paddingLeft: '1em',
      textDecoration: 'none',
    },
    '&& a:hover': {
      textDecoration: 'underline',
    },
    '&& > p > a:hover': {
      color: 'rgba(0, 0, 0, 0.8)',
      textDecoration: 'none',
    },
    '&& > p': {
      display: 'flex',
    },
    '&& > p > span:first-child': {
      flexGrow: 1,
    },
    '&& > p svg': {
      width: 18,
      height: 18,
      marginRight: 4,
      verticalAlign: 'bottom',
    },
  },
}));

function Subjects({ data, relay }) {
  const s = useStyles();
  // console.log(relay);
  // eslint-disable-next-line

  const history = useHistory();

  const [state, setState] = React.useState({ loading: false, errors: null });

  // console.log(state);
  const handleDelete = id => {
    setState({ loading: true, errors: null });
    DeleteSubjectMutation.commit(relay.environment, id, err => {
      if (err) {
        setState({ loading: false, errors: err });
      } else {
        setState({ loading: false, errors: null });
        window.location.reload();
      }
    });
  };

  return (
    <div className={s.root}>
      {state.errors && <Typography variant="h5">{state.errors}</Typography>}
      <Typography className={s.title} variant="h3" gutterBottom>
        <span className={s.grow}>Subjects</span>
        <Button onClick={() => history.push({ pathname: '/add-subject' })}>
          Add new subject
        </Button>
      </Typography>
      {(data.allsubject || []).map((obj, ind) => {
        const {
          subject,
          expertise,
          price,
          num_of_lessons,
          id,
          createdAt,
        } = obj;
        return (
          <Box
            key={id}
            sx={{ display: 'flex', flexDirection: 'column', m: '1em' }}
          >
            {/* <Typography>{subject}</Typography>
                        <Typography>{expertise}</Typography>
                        <Box display={'flex'}>
                            <Typography>{price}</Typography>
                            <Typography>{num_of_lessons}</Typography>
                        </Box>
                        <Divider /> */}
            <Box sx={{ display: 'flex' }}>
              <Typography
                variant="h5"
                sx={{
                  textTransform: 'capitalize',
                  fontWeight: '500',
                }}
              >
                {subject}
              </Typography>
              <IconButton sx={{ ml: 'auto' }} onClick={() => handleDelete(id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
            <Typography>{expertise}</Typography>
            <Box display={'flex'} sx={{ mt: '1em', alignItems: 'center' }}>
              <Typography variant="h6">
                {`${num_of_lessons} Lesson${num_of_lessons > 1 ? 's' : ''}`}
              </Typography>
              <Typography
                sx={{ ml: 'auto', fontWeight: '500', fontSize: '1.1rem' }}
              >
                {`$ ${price}`}
              </Typography>
            </Box>
            <Typography
              sx={{ mt: '.5em', ml: 'auto', color: 'rgba(0, 0, 0, 0.8)' }}
            >{`Added on: ${createdAt}`}</Typography>
            {ind !== data.allsubject.length - 1 && (
              <Divider sx={{ mt: '1em' }} />
            )}
          </Box>
        );
      })}
    </div>
  );
}

export default createFragmentContainer(Subjects, {
  data: graphql`
    fragment Subjects_data on Query {
      allsubject {
        id
        subject
        expertise
        price
        num_of_lessons
        createdAt(format: "MMM Do, YYYY")
      }
    }
  `,
});
