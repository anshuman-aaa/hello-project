import React from 'react';
// import Paper from '@mui/material/Paper';
// import makeStyles from '@mui/styles/makeStyles';

import {
  Card,
  Typography,
  Divider,
  Box,
  Chip,
  CardContent,
} from '@mui/material/';

function SubjectCard(props) {
  return (
    <Card
      sx={{
        minHeight: 275,
        width: 300,
        margin: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" sx={{ padding: 1 }}>
            {props.name}
          </Typography>
        </Box>
        <Box>{props.description}</Box>
        <Box sx={{ width: 'auto', marginTop: 10 }}>
          {props.isexpert && <Chip label="Expert" variant="outlined" />}
        </Box>

        <Box sx={{ width: 'auto', marginTop: 2 }}>
          <Divider></Divider>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            <Box>{props.numlesson + ' lessons'}</Box>
            <Box>{props.duration + ' mins each'}</Box>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ padding: 1 }}>
              {'Price: ' + props.price}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default SubjectCard;
