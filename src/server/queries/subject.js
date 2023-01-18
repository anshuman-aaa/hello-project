/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import { GraphQLList } from 'graphql';

import db from '../db';
import { SubjectType } from '../types';

export const subjects = {
  type: new GraphQLList(SubjectType),

  resolve(self, args, ctx) {
    return db.table('subjects').returning('*');
  },
};
