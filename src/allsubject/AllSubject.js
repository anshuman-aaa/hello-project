/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import { Card } from '@mui/material';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { createFragmentContainer, graphql } from 'react-relay';
// import { InputAdornment } from '@mui/material';

// import { createFragmentContainer} from 'react-relay';

function AllSubject(props) {
  const { data } = props;
  const { subjects } = data;
  console.log(subjects);

  return (
    <Card style={{ padding: '50px' }}>
      <Typography>
        <center>
          {(subjects || []).map(x => (
            <Card style={{ width: '50%', margin: '20px', padding: '20px' }}>
              <Typography>
                <TextField
                  label="Subject"
                  defaultValue={x.sub}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  label="Price-per-lesson"
                  defaultValue={x.price}
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <TextField
                  label="Number-of-lesson"
                  defaultValue={x.lesson}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <br />
                <br />

                <TextField
                  label="expertise"
                  defaultValue={x.expertise}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Typography>
            </Card>
          ))}
        </center>
      </Typography>
    </Card>
  );
}

// export default AllSubject;
export default createFragmentContainer(AllSubject, {
  data: graphql`
    fragment AllSubject_data on Query {
      me
      subjects {
        sub
        price
        lesson
        expertise
        id
      }
    }
  `,
});
