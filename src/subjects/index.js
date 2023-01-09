/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
//import { graphql } from 'relay-runtime';
import Layout from '../common/Layout';
//import Subject from './subject';
export default [
  {
    path: '/subject',
    // query: graphql`
    //   query subjectsQuery {
    //     getLessons {
    //       id
    //       subject
    //       price
    //       numLesson
    //       duration
    //     }
    //   }
    // `,
    components: () => [import(/* webpackChunkName: 'home' */ './subject')],
    render: ([Subject], data) => ({
      component: (
        <Layout data={data}>
          <Subject data={data} />
        </Layout>
      ),
      //chunks: ['subject'],
    }),
  },
];
