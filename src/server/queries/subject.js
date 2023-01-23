/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import { GraphQLList, GraphQLString } from 'graphql';
// import {
//   connectionDefinitions,
//   forwardConnectionArgs,
//   connectionFromArraySlice,
//   cursorToOffset,
// } from 'graphql-relay';

// import db from '../db';
// import { countField } from '../utils';
import { SubjectType } from '../types';

export const subject = {
  type: SubjectType,
  args: {
    id: {
      type: GraphQLString,
    },
  },
  resolve(root, { id }, ctx) {
    return ctx.subjectById(id);
  },
};

export const subjects = {
  type: new GraphQLList(SubjectType),
  resolve(root, args, ctx) {
    var uid = ctx.user ? ctx.user.id : '';
    return ctx.subjectByUid(uid);
  },
};
