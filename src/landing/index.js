/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import { graphql } from 'relay-runtime';
import Layout from '../common/Layout';

export default [
  {
    path: '',
    query: graphql`
      query landingHomeQuery {
        ...Layout_data
      }
    `,
    components: () => [
      import(/* webpackChunkName: 'home' */ './Home'),
      import(/* webpackChunkName: 'home' */ './HomeHero'),
    ],
    render: ([Home, HomeHero], data, { config }) => ({
      title: config.app.name,
      component: (
        <Layout data={data} hero={<HomeHero />}>
          <Home data={data} />
        </Layout>
      ),
      chunks: ['home'],
    }),
  },
  {
    path: '/listsubjects',
    query: graphql`
      query landingPageSubjectQuery {
        ...Layout_data
        ...ListSubjects_me
        me {
          subjects {
            name
            description
            price
            numlesson
            isexpert
          }
        }
      }
    `,
    components: () => [import('./ListSubjects'), import('./HomeHero')],
    render: ([ListSubjects, HomeHero], data, { config }) => ({
      title: config.app.name,
      component: (
        <Layout data={data}>
          <ListSubjects subs={data.me.subjects} />
        </Layout>
      ),
    }),
    chunks: ['addsub'],
  },
];
