import React from 'react';
import { graphql } from 'relay-runtime';
import Layout from '../common/Layout';
// import { Card } from '@mui/material';

export default [
  {
    path: '/allsubject',
    query: graphql`
      query allsubjectAllSubjectQuery {
        ...Layout_data
        ...AllSubject_data
      }
    `,
    components: () => [
      import(/* webpackChunkName: 'allsubject' */ './AllSubject'),
    ],
    // query: graphql`
    // `,
    render: ([AllSubject], data, { config }) => ({
      // title: `Subject • ${config.app.name}`,
      component: (
        <Layout data={data}>
          <AllSubject data={data} />
        </Layout>
      ),
      chunks: ['allsubject'],
    }),
  },

  // {
  //   path: '/allsubject/:slug',
  //   components: () => [import(/* webpackChunkName: 'allsubject' */ './Sub')],
  //   query: graphql`
  //     query allsubjectSubQuery($slug: String!) {
  //       ...Layout_data
  //       (slug: $slug) {
  //         ...Story_story
  //         title
  //         slug
  //       }
  //     }
  //   `,
  //   render: ([Story], data, ctx) => {
  //     if (data.story && data.story.slug !== ctx.params.slug) {
  //       return { status: 301, redirect: `/news/${data.story.slug}` };
  //     } else if (data.story) {
  //       return {
  //         title: data.story.title,
  //         component: (
  //           <Layout data={data}>
  //             <Story story={data.story} />
  //           </Layout>
  //         ),
  //         chunks: ['story'],
  //       };
  //     }
  //   },
  // }
];
