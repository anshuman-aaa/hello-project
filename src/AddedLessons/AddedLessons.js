import React from 'react';
import Box from '@mui/material/Box';
import Link from '../common/Link';
import Button from '@mui/material/Button';
import LessonCard from './LessonCard';

const AddedLessons = props => {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridGap: '20px',
          padding: '20px',
        }}
      >
        {props.data.getLessons.map(lesson => {
          return <LessonCard data={lesson} />;
        })}
      </Box>
      <Link href="/subject">
        <Button variant="outlined" size="medium">
          Add New Lesson
        </Button>
      </Link>
    </Box>
  );
};

export default AddedLessons;
