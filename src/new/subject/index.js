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
    path: '/subject',
    query: graphql`
      query subjectQuery {
        ...Layout_data
      }
    `,
    components: () => [import('.a/new/subject/LocalContextSetup')],
    render: ([NewSubjectContextSetup], data, { config }) => ({
      title: config.app.name,
      component: (
        <Layout data={data}>
          <NewSubjectContextSetup />
        </Layout>
      ),
    }),
  },
];
