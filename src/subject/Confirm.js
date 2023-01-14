/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import { Card } from '@mui/material';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Chip } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { useHistory, useRelay } from '../hooks';
import UpsertSubjectMutation from '../mutations/UpsertSubject';
// import e from 'express';

// import { createFragmentContainer} from 'react-relay';

function Confirm(props) {
  console.log(props);
  // const { me } = props;
  const [state, setState] = React.useState({ ...props.data });
  const history = useHistory();
  const relay = useRelay();
  console.log(props);

  function handleSubmit(event) {
    event.preventDefault();
    UpsertSubjectMutation.commit(
      relay.environment,
      {
        sub: state.subject || '',
        price: parseInt(state.price || null),
        lesson: parseInt(state.lesson || null),
        expertise: state.expertise.join(',') || '',
      },
      (errors, story) => {
        if (errors) {
          setState(x => ({ ...x }));
        } else {
          // props.onClose();
          history.push(`/subject`);
        }
      },
    );
  }

  return (
    <Card
      variant="outlined"
      style={{
        height: '330px',
        width: '660px',
        marginLeft: '-30px',
        borderRadius: '10px',
      }}
    >
      <Typography
        style={{
          marginTop: '15px',
          fontSize: '28px',
          fontWeight: '600',
        }}
      >
        <b>Verify you data</b>
      </Typography>

      <Typography>
        <TextField
          label="Subject"
          defaultValue={props.data.subject}
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField
          label="price-per-lesson"
          defaultValue={props.data.price}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            readOnly: true,
          }}
        />

        <TextField
          label="Number of Lessons"
          defaultValue={props.data.lesson}
          InputProps={{
            readOnly: true,
          }}
        />
      </Typography>

      <Typography
        style={{
          marginTop: '15px',
          fontSize: '28px',
          fontWeight: '600',
        }}
      >
        <b>Expertise</b>
      </Typography>

      <Typography>
        {props.data.expertise.map(skill => (
          <Chip label={skill} />
        ))}
      </Typography>

      <Typography>
        <Button
          variant="contained"
          style={{
            position: 'absolute',
            marginTop: '60px',
          }}
          onClick={() => props.handlePage('previous')}
        >
          Pervious
        </Button>

        <Button
          variant="contained"
          type="submit"
          style={{
            position: 'absolute',
            marginTop: '60px',
            marginLeft: '-100px',
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Typography>
    </Card>
  );
}

export default Confirm;
