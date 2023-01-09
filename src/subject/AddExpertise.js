import { Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { createFragmentContainer } from 'react-relay';
import { graphql } from 'relay-runtime';
import TextField from '../common/TextField';
import { useHistory } from '../hooks';
import AddSubjectMutation from '../mutations/AddSubject';

const useStyles = makeStyles(theme => ({
  root: {
    ...theme.mixins.content,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

const initialState = {
  expertise: '',
  loading: false,
  errors: null,
};

const AddExpertise = ({ relay }) => {
  const s = useStyles();

  const history = useHistory();

  const { subjectdetails } = history.location;

  // console.log(props);
  const [state, setState] = React.useState({ ...initialState });

  function handleSubmit(e) {
    e.preventDefault();
    setState(x => ({ ...x, loading: true, errors: null }));
    AddSubjectMutation.commit(
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
        } else {
          history.push({ pathname: '/subjects' });
        }
      },
    );
  }

  return (
    <div className={s.root}>
      <Typography className={s.title} variant="h3" gutterBottom>
        Add Expertise
      </Typography>
      <TextField
        name="expertise"
        label="Expertise"
        state={[state, setState]}
        placeholder={`Describe Your qualifications in ${
          subjectdetails && subjectdetails.subject
            ? subjectdetails.subject
            : 'Subject'
        }`}
        fullWidth
        rows={10}
        multiline
      />
      <Button onClick={handleSubmit}>Submit</Button>
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
