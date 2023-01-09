import {
  //GraphQLNonNull,
  // GraphQLObjectType,
  // GraphQLString,
  GraphQLList,
  // GraphQLInt,
} from 'graphql';
//import {
// connectionDefinitions,
//forwardConnectionArgs,
//connectionFromArraySlice,
//cursorToOffset,
//} from 'graphql-relay';

import db from '../db';
//import { countField } from '../utils';
import { LessonType } from '../types';

export const getLessons = {
  type: new GraphQLList(LessonType),
  async resolve(root, args, ctx) {
    return await db
      .table('lessons')
      .select('*')
      .where({ user_id: ctx.user && ctx.user.id });
  },
};
