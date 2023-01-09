import React, { useState } from 'react';
//import { useRelay } from 'react-relay';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import Link from '../common/Link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

//import environment from '../relay';
//import { relay } from '../index';

import AddLessonMutation from '../mutations/AddLesson';
import { useRelay } from '../hooks';
//import { parseInt } from 'lodash';

const Subject = props => {
  const relay = useRelay();
  const [lesson, setLesson] = useState({
    subject: 'Maths',
    price: 5,
    numlesson: 12,
    duration: 30,
    expertise: 'Something New',
  });

  const lessonList = cnt => {
    let content = [];
    for (let i = 1; i <= cnt; i++) {
      content.push(
        <MenuItem key={i} value={i}>
          {i}
        </MenuItem>,
      );
    }
    return content;
  };

  const addLessonHandler = () => {
    AddLessonMutation.commit(
      relay.environment,
      {
        ...lesson,
        price: parseInt(lesson.price),
        id: parseInt(Math.floor(Math.random() * 300 + 8)),
      },
      (data, error) => {
        if (!error) {
          alert('Lesson Added Successfully');
        }
      },
    );
  };
  return (
    <div>
      <Box
        sx={{
          padding: '30px',
          width: '50%',
          ml: 'auto',
          mr: 'auto',
          backgroundColor: '#FFFBF2 ',
        }}
      >
        <Typography variant="h5">Choose Subject</Typography>
        <FormControl sx={{ mt: '10px', mb: '30px', width: '100%' }}>
          <InputLabel id="demo-simple-select-label">Subject</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={lesson.subject}
            label="Subject"
            onChange={e => {
              setLesson({ ...lesson, subject: e.target.value });
            }}
          >
            <MenuItem value="Maths">Maths</MenuItem>
            <MenuItem value="Physics">Physics</MenuItem>
            <MenuItem value="Chemistry">Chemistry</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="h5">Lesson Price</Typography>
        <FormControl
          fullWidth
          sx={{ mt: '10px', mb: '30px' }}
          variant="standard"
        >
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input
            id="standard-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            onChange={e => {
              setLesson({ ...lesson, price: e.target.value });
            }}
            value={lesson.price}
          />
        </FormControl>

        <Typography variant="h5">Lesson Package</Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridGap: '5px',
          }}
        >
          <FormControl sx={{ mt: '10px', mb: '30px' }}>
            <InputLabel id="demo-simple-select-label">
              Number of Lessons
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={lesson.numlesson}
              label="Lessons"
              onChange={e => {
                setLesson({ ...lesson, numlesson: parseInt(e.target.value) });
              }}
            >
              {lessonList(20)}
            </Select>
          </FormControl>

          <FormControl sx={{ mt: '10px', mb: '30px' }}>
            <InputLabel id="demo-simple-select-label">
              Each Lesson Duration
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={lesson.duration}
              label="Subject"
              onChange={e => {
                setLesson({ ...lesson, duration: parseInt(e.target.value) });
              }}
            >
              <MenuItem value={20}>20 mins</MenuItem>
              <MenuItem value={30}>30 mins</MenuItem>
              <MenuItem value={60}>60 mins</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Typography variant="h5">Describe your expertise</Typography>
        <TextField
          id="outlined-textarea"
          label="Expertise"
          placeholder="Example : Teaching is my passion and describte your academic achievements in this space to convince the student"
          multiline
          sx={{ width: '90%', mt: '20px' }}
          rows={20}
          onChange={e => {
            setLesson({ ...lesson, expertise: e.target.value });
          }}
        />
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', mt: '10px' }}
        >
          <Button variant="outlined" size="medium" onClick={addLessonHandler}>
            Add Lesson
          </Button>

          <Link href="/lessons">
            <Button variant="outlined" size="medium">
              View Added Lessons
            </Button>
          </Link>
        </Box>
      </Box>
    </div>
  );
};

export default Subject;
