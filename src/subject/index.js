import React from 'react';
import { graphql } from 'relay-runtime';
import Layout from '../common/Layout';

export default [
  {
    path: '/subjects',
    components: () => [
      import(/* webpackChunkName: 'profile' */ './SubjectList'),
    ],
    render: ([SubjectList], data, { config }) => ({
      title: config.app.name,
      component: (
        <Layout data={data}>
          <SubjectList backend_data={data} />
        </Layout>
      ),
    }),
    query: graphql`
      query subjectAllSubjectsQuery {
        ...SubjectList_backend_data
        ...Layout_data
      }
    `,
  },
];
