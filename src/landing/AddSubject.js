/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
// import { createFragmentContainer, graphql } from 'react-relay';
import { FormControlLabel, Switch } from '@mui/material';
import TextField from '../common/TextField';
import CreateSubjectMutation from '../mutations/CreateSubject';
import { useHistory, useAuth } from '../hooks';
//is expert is not workig
const initialState = {
  name: '',
  description: '',
  numlesson: 0,
  price: 0,
  isexpert: false,
};

function SubmitDialog(props) {
  const { me, relay } = props;
  const [state, setState] = React.useState({ ...initialState });
  const history = useHistory();
  const auth = useAuth();

  function handleSubmit(event) {
    event.preventDefault();
    setState(x => ({ ...x, loading: true, errors: null }));
    CreateSubjectMutation.commit(
      relay.environment,
      {
        name: state.name || '',
        description: state.description || '',
        price: parseInt(state.price) || 0,
        numlesson: parseInt(state.numlesson) || 0,
        isexpert: state.isexpert || false,
      },
      (errors, subject) => {
        if (errors) {
          setState(x => ({ ...x, loading: false, errors }));
        } else {
          props.onClose();
          history.push(`/listsubjects`);
        }
      },
    );
  }

  function signIn(event) {
    event.preventDefault();
    auth.signIn();
  }
  function switchExpert() {
    setState({ ...state, isexpert: !state.isexpert });
  }
  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add a new Subject</DialogTitle>
      <DialogContent>
        <DialogContentText>Add a subject</DialogContentText>
        <form id="subject-form" onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="name of subject"
            state={[state, setState]}
            maxLength={80}
            fullWidth
          />
          <TextField
            name="description"
            label="description"
            state={[state, setState]}
            fullWidth
            multiline
          />
          <TextField
            name="price"
            label="Price"
            state={[state, setState]}
            fullWidth
            multiline
          />
          <TextField
            name="numlesson"
            label="number of lesson"
            state={[state, setState]}
            fullWidth
            multiline
          />
          <FormControlLabel
            value="start"
            control={
              <Switch name="isexpert" onChange={switchExpert} color="primary" />
            }
            label="Expert"
            labelPlacement="start"
          />
          {!me && (
            <FormHelperText>
              Before posting a Subject you need to{' '}
              <a href={history.location.pathname} onClick={signIn}>
                sign in
              </a>
              .
            </FormHelperText>
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button
          variant="contained"
          color="success"
          type="submit"
          form="story-form"
          disabled={!me}
          onClick={handleSubmit}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SubmitDialog;
