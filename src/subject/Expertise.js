/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React, { useState } from 'react';
import { Card } from '@mui/material';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Chip } from '@mui/material';
// import e from 'express';

// import { createFragmentContainer} from 'react-relay';

function Expertise({ data, setData, handlePage }) {
  const [skills, setSkills] = useState(data.expertise);
  const handleDelete = chip => {
    var array = data.expertise;
    var chip_array = array.filter(data => data !== chip);
    setSkills(chip_array);
    data.expertise = chip_array;
    console.log(chip);
    console.log(chip_array);
  };

  const [exp, setExp] = useState();

  const functNext = () => {
    if (data.expertise.length !== 0 && data.expertise.length <= 5) {
      handlePage('next');
    } else if (data.expertise.length > 5) {
      alert('You can add maximum 5 Expertise');
    } else {
      alert('Add your Experties');
    }
  };

  const functArray = () => {
    if (data.expertise.length <= 4) {
      data.expertise.push(exp);
    } else {
      alert('Max you can enter 5 Expertise');
    }
  };

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
        <b>Add your Expertise</b>
      </Typography>

      <Typography
        style={{
          marginTop: '15px',
        }}
      >
        <TextField
          label="Expertise"
          type="text"
          style={{
            width: '550px',
          }}
          value={exp}
          onChange={e => setExp(e.target.value)}
        />
        <Button
          variant="contained"
          style={{
            margin: '20px',
          }}
          onClick={() => {
            functArray();
            setExp('');
          }}
        >
          Contained
        </Button>
      </Typography>

      <Typography
        style={{
          position: 'absolute',
          marginLeft: '30px',
        }}
      >
        {skills.map(skill => (
          <Chip label={skill} onDelete={() => handleDelete(skill)} />
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
          style={{
            position: 'absolute',
            marginTop: '60px',
            marginLeft: '-110px',
            width: '100px',
          }}
          onClick={() => functNext()}
        >
          Next
        </Button>
      </Typography>
    </Card>
  );
}

export default Expertise;
