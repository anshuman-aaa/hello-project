import React from 'react';
import { graphql } from 'relay-runtime';
import Layout from '../common/Layout';

export default [
  {
    path: '/subjects',
    components: () => [import(/* webpackChunkName: 'subject' */ './Subjects')],
    query: graphql`
      query subjectQuery {
        ...Layout_data
        ...Subjects_data
      }
    `,
    render: ([Subjects], data, { config }) => {
      // console.log(params);
      return {
        title: `Subjects • ${config.app.name}`,
        component: (
          <Layout data={data}>
            <Subjects data={data} />
            {/* <h1>Hello</h1> */}
          </Layout>
        ),
        chunks: ['subject'],
      };
    },
  },
  {
    path: '/add-subject',
    components: () => [
      import(/* webpackChunkName: 'addsubject' */ './AddSubject'),
    ],
    query: graphql`
      query subjectaddQuery {
        ...Layout_data
      }
    `,
    render: ([AddSubject], data, { config }) => {
      // console.log(data);
      return {
        title: `AddSubject• ${config.app.name}`,
        component: (
          <Layout data={data}>
            <AddSubject />
            {/* <h1>Hello</h1> */}
          </Layout>
        ),
        chunks: ['addsubject'],
      };
    },
  },
  {
    path: '/add-expertise',
    components: () => [
      import(/* webpackChunkName: 'add-expertise' */ './AddExpertise'),
    ],
    query: graphql`
      query subjectaddexpertiseQuery {
        ...Layout_data
        ...AddExpertise_data
      }
    `,
    render: ([AddExpertise], data, { config }) => {
      // console.log(params);
      return {
        title: `AddExpertise• ${config.app.name}`,
        component: (
          <Layout data={data}>
            <AddExpertise data={data} />
            {/* <h1>Hello</h1> */}
          </Layout>
        ),
        chunks: ['add-expertise'],
      };
    },
  },
];
