import React from 'react';
import { graphql } from 'relay-runtime';
import Layout from '../common/Layout';
import { Card } from '@mui/material';

export default [
  {
    path: '/subject',
    query: graphql`
      query subjectSubjectQuery {
        ...Layout_data
      }
    `,
    components: () => [import(/* webpackChunkName: 'subject' */ './Combine')],
    // query: graphql`
    // `,
    render: ([Combine], data, { config }) => ({
      // title: `Subject • ${config.app.name}`,
      component: (
        <Layout data={data}>
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
                <Combine />
              </Card>
            </center>
          </div>
        </Layout>
      ),
      chunks: ['subject'],
    }),
  },
];
