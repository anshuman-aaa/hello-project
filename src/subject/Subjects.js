import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
// import {createBrowserHistory} from 'history'
import { useHistory } from '../hooks';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteLessonMutation from '../mutations/DeleteLesson';

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

  console.log(state);
  const handleDelete = id => {
    setState({ loading: true, errors: null });
    DeleteLessonMutation.commit(relay.environment, id, err => {
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
        <Button onClick={() => history.push({ pathname: '/addsubject' })}>
          Add new subject
        </Button>
      </Typography>
      {(data.getLessons || []).map((obj, ind) => {
        // const {
        //   subject,
        //   expertise,
        //   price,
        //   num_of_lessons,
        //   id,
        //   createdAt,
        // } = obj;
        return (
          <Box
            key={ind}
            sx={{ display: 'flex', flexDirection: 'column', m: '1em' }}
          >
            <Box sx={{ display: 'flex', color: '#ff7f50' }}>
              <Typography
                variant="h5"
                sx={{
                  textTransform: 'capitalize',
                  fontWeight: '500',
                }}
              >
                {obj.subject}
              </Typography>
              <IconButton
                sx={{ ml: 'auto', color: '#ff3d00' }}
                onClick={() => handleDelete(obj.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>

            <Box display={'flex'} sx={{ mt: '1em', alignItems: 'center' }}>
              <Typography variant="h6">
                {`${obj.num_of_lessons} Lesson${
                  obj.num_of_lessons > 1 ? 's' : ''
                }`}
              </Typography>
              <Typography
                sx={{ ml: 'auto', fontWeight: '500', fontSize: '1.1rem' }}
              >
                {`$ ${obj.price}`}
              </Typography>
            </Box>
            <Typography> {obj.expertise}</Typography>
            <Typography
              sx={{ mt: '.5em', ml: 'auto', color: 'rgba(0, 0, 0, 0.4)' }}
            >{`Added on: ${obj.createdAt}`}</Typography>
            {ind !== data.getLessons.length - 1 && (
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
      getLessons {
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
