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
// import e from 'express';

// import { createFragmentContainer} from 'react-relay';

function Confirm({ data, setData, handlePage }) {
  // const [skills, setSkills] = useState(data.expertise);
  // const handleDelete = (chip) => {
  //   var array = data.expertise
  //   var chip_array = array.filter((data) => data !== chip  );
  //   setSkills(chip_array)
  //   data.expertise = chip_array
  //   console.log(chip)
  //   console.log(chip_array)
  // }

  // const [exp, setExp] = useState();

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
          defaultValue={data.subject}
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField
          label="price-per-lesson"
          defaultValue={data.price}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            readOnly: true,
          }}
        />

        <TextField
          label="Number of Lessons"
          defaultValue={data.lesson}
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
        {data.expertise.map(skill => (
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
          onClick={() => handlePage('previous')}
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
        >
          Submit
        </Button>
      </Typography>
    </Card>
  );
}

export default Confirm;
