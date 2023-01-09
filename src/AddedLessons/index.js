/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import { graphql } from 'relay-runtime';
import Layout from '../common/Layout';
//import AddedLessons from './AddedLessons';

export default [
  {
    path: '/lessons',
    query: graphql`
      query AddedLessonsQuery {
        getLessons {
          id
          subject
          price
          numlesson
          duration
          expertise
        }
      }
    `,
    components: () => [import(/* webpackChunkName: 'home' */ './AddedLessons')],
    render: ([AddedLessons], data) => ({
      component: (
        <Layout data={data}>
          <AddedLessons data={data} />
        </Layout>
      ),
      //chunks: ['expertise'],
    }),
  },
];
