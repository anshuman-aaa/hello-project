import { GraphQLList } from 'graphql';

import db from '../db';
import { SubjectType } from '../types';

export const subjects = {
  type: new GraphQLList(SubjectType),

  resolve(self, args, ctx) {
    return db
      .table('subjects')
      .where({ user_id: ctx.user ? ctx.user.id : null })
      .orderBy('created_at', 'desc')
      .limit(100)
      .select();
  },
};
