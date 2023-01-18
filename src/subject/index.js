import React from 'react';
import { graphql } from 'relay-runtime';
import Layout from '../common/Layout';
// import { Card } from '@mui/material';

export default [
  {
    path: '/subject',
    query: graphql`
      query subjectQuery {
        ...Layout_data
        ...FinalPage_data
      }
    `,
    components: () => [import(/* webpackChunkName: 'subject' */ './FinalPage')],
    // query: graphql`
    // `,
    render: ([FinalPage], data, { config }) => ({
      title: `Subject • ${config.app.name}`,
      component: (
        <Layout data={data}>
          <FinalPage data={data} />
        </Layout>
      ),
      chunks: ['subject'],
    }),
  },
];
