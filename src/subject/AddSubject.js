import {
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import React from 'react';
import TextField from '../common/TextField';
import { makeStyles } from '@mui/styles';
import { useHistory } from '../hooks';
// import Link from '../common/Link';
// import { NewSubjectContext } from '../hooks/useNewSubject';

const useStyles = makeStyles(theme => ({
  root: {
    ...theme.mixins.content,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nextbutton: {
    display: 'flex',
    alignItems: 'right',
    justifyContent: 'flex-end',
  },
}));

export default function AddSubject() {
  const s = useStyles();

  // const {newSubject, setNewSubject} = React.useContext(NewSubjectContext);

  // Array.isArray(newSubject) && newSubject.map();

  const handleChange = event => {
    setState({
      ...state,
      price: event.target.value,
    });
  };

  const history = useHistory();

  const { subjectdetails } = history.location;

  const initialState = {
    subject:
      subjectdetails && subjectdetails.subject ? subjectdetails.subject : '',
    price: subjectdetails && subjectdetails.price ? subjectdetails.price : null,
    num_of_lessons:
      subjectdetails && subjectdetails.num_of_lessons
        ? subjectdetails.num_of_lessons
        : null,
    expertise:
      subjectdetails && subjectdetails.expertise
        ? subjectdetails.expertise
        : '',
  };

  const [state, setState] = React.useState({ ...initialState });

  return (
    <Box className={s.root}>
      <Typography className={s.title} variant="h3" gutterBottom>
        Add a Subject {/*{newSubject.map((n) => {n})}*/}
      </Typography>
      <Box>
        <TextField
          sx={{ my: 2 }}
          name="subject"
          label="Subject"
          placeholder="Add a Subject"
          maxLength={80}
          // onChange={handleChange}
          state={[state, setState]}
          fullWidth
          required
        />
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            name="price"
            label="Price"
            placeholder="Enter the Price"
            type="number"
            onChange={handleChange}
            value={state.price}
            // state={[state, setState]}
            required
          />
        </FormControl>
        <TextField
          name="num_of_lessons"
          type="number"
          label="Number of Lessons"
          // onChange={handleChange}
          state={[state, setState]}
          placeholder="Enter the number of Lessons"
          fullWidth
          required
        />
        <Box className={s.nextbutton}>
          <Button
            onClick={() =>
              history.push({ pathname: 'addexpertise', subjectdetails: state })
            }
          >
            {/* <a href = '/addexpertise'>Next</a> */}
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
