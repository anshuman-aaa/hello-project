import { GraphQLList } from 'graphql';
import db from '../db';
import { SubjectType } from '../types/subject';

export const allsubject = {
  type: new GraphQLList(SubjectType),

  resolve(self, args, ctx) {
    // db.table('subjects').select().then(data=>console.log(data));
    return db
      .table('subjects')
      .where({ author_id: ctx.user.id })
      .orderBy('created_at', 'desc')
      .select();
  },
};
