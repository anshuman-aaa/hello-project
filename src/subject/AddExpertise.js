import { Button, Typography } from '@mui/material';
import React from 'react';
import { useHistory } from '../hooks';
import TextField from '../common/TextField';
import { makeStyles } from '@mui/styles';
// import { NewSubjectContext } from '../hooks/useNewSubject';
import CreateLessonMutation from '../mutations/CreateLesson';
import { createFragmentContainer } from 'react-relay';
import { graphql } from 'relay-runtime';

const useStyles = makeStyles(theme => ({
  root: {
    ...theme.mixins.content,
    color: '#ff7f50',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nextbutton: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const AddExpertise = ({ relay }) => {
  const s = useStyles();
  const history = useHistory();

  const { subjectdetails } = history.location;

  // const initialState = {

  //   expertise: '',
  // };
  const initialState = subjectdetails;
  const [state, setState] = React.useState({ ...initialState });
  console.log('Expertise file \t:', state);
  // const [newSubject, setNewSubject] = React.useContext(NewSubjectContext)

  // console.log(newSubject)

  function handleSubmit(e) {
    e.preventDefault();
    setState(x => ({ ...x, loading: true, errors: null }));
    CreateLessonMutation.commit(
      relay.environment,
      {
        subject: subjectdetails.subject || '',
        expertise: state.expertise || '',
        price: parseFloat(subjectdetails.price) || 0,
        num_of_lessons: parseInt(subjectdetails.num_of_lessons) || 0,
      },
      errors => {
        if (errors) {
          setState(x => ({ ...x, loading: false, errors }));
        }
      },
      history.push({ pathname: 'subjects' }),
    );
  }

  return (
    <div className={s.root}>
      <Typography className={s.title} variant="h3" gutterBottom>
        Write about your Expertise in{' '}
        {subjectdetails && subjectdetails.subject
          ? subjectdetails.subject
          : 'Subject'}
      </Typography>
      <div>
        <TextField
          sx={{ my: 2 }}
          name="expertise"
          label="Expertise"
          value={state.expertise}
          state={[state, setState]}
          placeholder="Your Expertise in subject"
          maxLength={800}
          rows={20}
          multiline
          fullWidth
        />

        <div className={s.nextbutton}>
          <Button
            onClick={() =>
              history.push({ pathname: '/addsubject', subjectdetails: state })
            }
          >
            Previous
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default createFragmentContainer(AddExpertise, {
  data: graphql`
    fragment AddExpertise_data on Query {
      me {
        id
      }
    }
  `,
});
