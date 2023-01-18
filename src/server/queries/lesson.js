import { GraphQLList } from 'graphql';
import db from '../db';
import { LessonType } from '../types';

export const getLessons = {
  type: new GraphQLList(LessonType),
  async resolve(root, args, ctx) {
    return await db
      .table('lessons')
      .select('*')
      .where({ user_id: ctx.user && ctx.user.id })
      .orderBy('created_at');
  },
};
