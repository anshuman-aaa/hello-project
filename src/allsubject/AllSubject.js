/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import { Card, CardContent, Avatar } from '@mui/material';
import { Typography } from '@mui/material';
// import { TextField } from '@mui/material';
import { createFragmentContainer, graphql } from 'react-relay';
import './AllSubject.css';
// import { InputAdornment } from '@mui/material';

// import { createFragmentContainer} from 'react-relay';

function AllSubject(props) {
  console.log(props);
  const { data } = props;
  const { subjects } = data;
  console.log(subjects);

  return (
    <Card className="flex_box_ccontainer" style={{ padding: '50px' }}>
      {(subjects || []).map(x => (
        <Card
          className="allsubject_card"
          style={{ margin: '20px', padding: '20px', border: 'solid black' }}
        >
          <center>
            <Avatar src={x.user_id.photoURL}></Avatar>
            <b>{x.user_id.displayName}</b>
            <hr />
          </center>

          <CardContent>
            <Typography
              style={{ textAlign: 'center' }}
              variant="h4"
              component="div"
            >
              <b>{x.sub}</b>
            </Typography>

            <Typography
              style={{ textAlign: 'center', fontSize: '14px' }}
              color="text.secondary"
              component="div"
            >
              Charging per lesson:{' '}
              <span style={{ color: 'black' }}>${x.price}</span>
            </Typography>

            <Typography
              style={{ textAlign: 'center', fontSize: '14px' }}
              color="text.secondary"
              component="div"
            >
              Total lessons: <span style={{ color: 'black' }}>{x.lesson}</span>
            </Typography>
          </CardContent>
          <Typography
            style={{ marginBottom: '-15px', marginTop: '10px' }}
            sx={{ fontSize: 13 }}
            color="text.secondary"
            gutterBottom
          >
            Created at : <b>{x.createdAt}</b>
          </Typography>
        </Card>
      ))}
    </Card>
  );
}

// export default AllSubject;
export default createFragmentContainer(AllSubject, {
  data: graphql`
    fragment AllSubject_data on Query {
      subjects {
        sub
        price
        lesson
        expertise
        user_id {
          displayName
          photoURL
        }
        createdAt(format: "MMM Do, YYYY")
      }
    }
  `,
});
