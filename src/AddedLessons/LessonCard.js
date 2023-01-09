import React from 'react';
//import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

const LessonCard = props => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          ID : {props.data.id}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Subject : {props.data.subject}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Price : $ {props.data.price}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Lessons : {props.data.numlesson}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Duration : {props.data.duration}
        </Typography>
        <Typography variant="body2">{props.data.expertise}</Typography>
      </CardContent>
    </Card>
  );
};

export default LessonCard;
