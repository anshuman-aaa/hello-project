/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import { graphql } from 'relay-runtime';
import Layout from '../../common/Layout';

export default [
  {
    path: '/:subject',
    components: () => [
      import(/* webpackChunkName: 'new-subject' */ './AddSubject'),
    ],
    render: ([AddSubject], data, { config }) => ({
      title: config.app.name,
      component: (
        <Layout data={data}>
          <AddSubject />
        </Layout>
      ),
    }),
    query: graphql`
      query subjectNewSubjectQuery {
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
          <AddExpertise subject={variables.subject} />
        </Layout>
      ),
    }),
    query: graphql`
      query subjectAddExpertiseQuery {
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
          <AddPackages subject={variables.subject} />
        </Layout>
      ),
    }),
    query: graphql`
      query subjectAddPackagesQuery {
        ...Layout_data
      }
    `,
  },
];
