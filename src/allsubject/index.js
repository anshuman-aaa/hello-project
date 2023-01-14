import React from 'react';
import { graphql } from 'relay-runtime';
import Layout from '../common/Layout';
// import { Card } from '@mui/material';

export default [
  {
    path: '/allsubject',
    query: graphql`
      query allsubjectAllSubjectQuery {
        ...Layout_data
        ...AllSubject_data
      }
    `,
    components: () => [
      import(/* webpackChunkName: 'allsubject' */ './AllSubject'),
    ],
    // query: graphql`
    // `,
    render: ([AllSubject], data, { config }) => ({
      // title: `Subject • ${config.app.name}`,
      component: (
        <Layout data={data}>
          <AllSubject data={data} />
        </Layout>
      ),
      chunks: ['allsubject'],
    }),
  },
];
