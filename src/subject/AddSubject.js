import { Button, Typography } from '@mui/material';
// import { createBrowserHistory } from 'history';
import React from 'react';
import { useHistory } from '../hooks';
import TextField from '../common/TextField';
import { makeStyles } from '@mui/styles';

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
  subject: '',
  price: 0,
  num_of_lessons: 0,
};

const AddSubject = props => {
  const s = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState({ ...initialState });
  // console.log();
  // console.log(props);
  // const history = createBrowserHistory();

  // function handleSubmit(e) {
  //     e.preventDefault();
  //     setState(x => ({ ...x, loading: true, errors: null }));
  //     AddSubjectMutation.commit(
  //         relay.environment,
  //         {
  //             subject: state.subject || '',
  //             expertise: state.expertise || '',
  //             price:parseFloat(state.price) || 0,
  //             num_of_lessons:parseInt(state.num_of_lessons) || 0
  //         },
  //         (errors) => {
  //             if (errors) {
  //                 setState(x => ({ ...x, loading: false, errors }));
  //             } else {
  //                 onClose();
  //             }
  //         },
  //     );
  // }

  return (
    <div className={s.root}>
      <Typography className={s.title} variant="h3" gutterBottom>
        Add a Subject
      </Typography>
      <div>
        <TextField
          sx={{ my: 2 }}
          name="subject"
          label="Subject"
          state={[state, setState]}
          placeholder="Add a Subject"
          maxLength={80}
          fullWidth
        />
        <TextField
          sx={{ my: 2 }}
          name="price"
          type="number"
          label="Price"
          state={[state, setState]}
          placeholder="Add a Price"
          fullWidth
        />
        <TextField
          name="num_of_lessons"
          type="number"
          label="Number of Lessons"
          state={[state, setState]}
          placeholder="Add the number of Lessons"
          fullWidth
        />
        <Button
          onClick={() =>
            history.push({ pathname: '/add-expertise', subjectdetails: state })
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
  // return <div>Hello</div>
};

export default AddSubject;
