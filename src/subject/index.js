import React from 'react';
import { graphql } from 'relay-runtime';
import Layout from '../common/Layout';
// import Layout from '../common/Layout';

export default [
  {
    path: '/subjects',
    components: () => [import(/* webpackChunkName: 'subjects' */ './Subjects')],
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
        chunks: ['subjects'],
      };
    },
  },
  {
    path: '/addsubject',
    components: () => [
      import(/* webpackChunkName: 'addsubject' */ './AddSubject'),
    ],
    query: graphql`
      query subjectaddQuery {
        ...Layout_data
      }
    `,
    render: ([AddSubject], data, { config }) => ({
      title: `Add Subject`,
      component: (
        <Layout data={data}>
          <AddSubject />
        </Layout>
      ),
      chunks: ['addsubject'],
    }),
  },
  {
    path: '/addexpertise',
    components: () => [
      import(/* webpackChunkName: 'addexpertise' */ './AddExpertise'),
    ],
    query: graphql`
      query subjectaddexpertiseQuery {
        ...Layout_data
        ...AddExpertise_data
      }
    `,
    render: ([AddExpertise]) => ({
      title: `Add Expertise`,
      component: <AddExpertise />,
      chunks: ['addexpertise'],
    }),
  },
];
