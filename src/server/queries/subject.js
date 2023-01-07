import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';

import db from '../db';
import { SubjectType } from '../types';

export const subject = {
  type: SubjectType,

  args: {
    slug: { type: new GraphQLNonNull(GraphQLString) },
  },

  async resolve(root, { slug }, ctx) {
    let subject = await db
      .table('subjects')
      .where({ slug })
      .first();

    // Attempts to find a story by partial ID contained in the slug.
    if (!subject) {
      const match = slug.match(/[a-f0-9]{7}$/);
      if (match) {
        subject = await db
          .table('subjects')
          .whereRaw(`id::text LIKE '%${match[0]}'`)
          .first();
      }
    }

    return subject;
  },
};

export const subjects = {
  type: new GraphQLList(SubjectType),

  resolve(self, args, ctx) {
    return db
      .table('subjects')
      .where({ subject_id: ctx.user ? ctx.user.id : null })
      .orderBy('created_at', 'desc')
      .limit(100)
      .select();
  },
};
