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
import { InputAdornment } from '@mui/material';

// import { createFragmentContainer} from 'react-relay';

function Subject({ data, setData, handlePage }) {
  // const [backAlert, setBackAlert] = useState(0);

  const funcNext = () => {
    if (data.subject === '') {
      alert('Fill subject');
    } else if (data.price === '') {
      alert('Fill Price');
    } else if (data.lesson === '') {
      alert('Fill Lessons');
    } else {
      handlePage('next');
    }
  };

  // const manageBackAlert = () => {
  //   if(!(data.subject==="" && data.price===null && data.lesson===null && data.expertise.length===0)){

  //   }
  // }

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
        <b>Select you Subject</b>
      </Typography>

      <form action="">
        <Typography
          style={{
            marginTop: '15px',
          }}
        >
          <TextField
            label="Subject"
            type="dropdown"
            style={{
              width: '550px',
            }}
            defaultValue={data.subject}
            onChange={e =>
              setData(data => ({ ...data, subject: e.target.value }))
            }
          />

          <TextField
            label="price-per-lesson"
            type="number"
            style={{
              width: '550px',
              marginTop: '15px',
            }}
            defaultValue={data.price}
            onChange={e =>
              setData(data => ({ ...data, price: e.target.value }))
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />

          <TextField
            label="Number of lessons"
            type="number"
            style={{
              width: '550px',
              marginTop: '15px',
            }}
            defaultValue={data.lesson}
            onChange={e =>
              setData(data => ({ ...data, lesson: e.target.value }))
            }
            // onChange={ e => setLessons(e.target.value)}
          />
          <center>
            <Button
              variant="contained"
              style={{
                position: 'absolute',
                marginTop: '10px',
                marginLeft: '-40px',
              }}
              onClick={() => funcNext()}
            >
              Next
            </Button>
          </center>
        </Typography>
      </form>
    </Card>
  );
}

export default Subject;
