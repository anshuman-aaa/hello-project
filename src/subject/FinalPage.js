import React from 'react';
// import { graphql } from 'relay-runtime';
// import Layout from '../common/Layout';
import { Card } from '@mui/material';
import Combine from './Combine';
import { createFragmentContainer, graphql } from 'react-relay';

function FinalPage(props) {
  console.log('cdcwddvdw : ', props);
  return (
    <div className="subject_input">
      <center>
        <Card
          style={{
            height: '400px',
            marginTop: '100px',
            backgroundColor: '#EBC0B9',
            padding: '50px',
            textAlign: 'center',
            width: '700px',
            borderRadius: '5px',
          }}
        >
          <Combine data={props.data} />
        </Card>
      </center>
    </div>
  );
}

// export default FinalPage;
export default createFragmentContainer(FinalPage, {
  data: graphql`
    fragment FinalPage_data on Query {
      subjects {
        sub
        price
        lesson
        expertise
        user_id {
          displayName
        }
        createdAt(format: "MMM Do, YYYY")
      }
    }
  `,
});
