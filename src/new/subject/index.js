import React from 'react';
import { graphql } from 'relay-runtime';
import Layout from '../../common/Layout';

export default [
  {
    path: '/subject',
    components: () => [
      import(/* webpackChunkName: 'new-subject' */ './AddSubject'),
    ],
    render: ([AddSubject], data, { config }) => ({
      title: config.app.name,
      component: (
        <Layout data={data}>
          <AddSubject backend_data={data} />
        </Layout>
      ),
    }),
    query: graphql`
      query subjectNewSubjectQuery {
        ...AddSubject_backend_data
        ...Layout_data
      }
    `,
  },
  {
    path: '/:subject/expertise',
    action: (ctx: ActionContext, { subject }: Params) => console.log(subject),
    components: () => [
      import(/* webpackChunkName: 'new-subject' */ './AddExpertise'),
    ],
    render: ([AddExpertise], data, { config, variables }) => ({
      title: config.app.name,
      component: (
        <Layout data={data}>
          <AddExpertise subject={variables.subject} backend_data={data} />
        </Layout>
      ),
    }),
    query: graphql`
      query subjectAddExpertiseQuery {
        ...AddExpertise_backend_data
        ...Layout_data
      }
    `,
  },
  {
    path: '/:subject/packages',
    components: () => [
      import(/* webpackChunkName: 'new-subject' */ './AddPackages'),
    ],
    render: ([AddPackages], data, { config, variables }) => ({
      title: config.app.name,
      component: (
        <Layout data={data}>
          <AddPackages subject={variables.subject} backend_data={data} />
        </Layout>
      ),
    }),
    query: graphql`
      query subjectAddPackagesQuery {
        ...AddPackages_backend_data
        ...Layout_data
      }
    `,
  },
];
