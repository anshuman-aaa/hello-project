/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

// import _ from 'lodash';
import { globalIdField } from 'graphql-relay';
import {
  GraphQLObjectType,
  // GraphQLList,
  // GraphQLBoolean,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  // GraphQLInterfaceType,
} from 'graphql';

import { UserType } from './user';
// import { CommentType } from './comment';
import { nodeInterface } from '../node';
// import { dateField } from '../utils';

export const SubjectType = new GraphQLObjectType({
  name: 'Subject',
  interfaces: [nodeInterface],

  fields: {
    id: globalIdField(),

    sub: {
      type: new GraphQLNonNull(GraphQLString),
    },

    price: {
      type: new GraphQLNonNull(GraphQLInt),
    },

    lesson: {
      type: new GraphQLNonNull(GraphQLInt),
    },

    expertise: {
      type: new GraphQLNonNull(GraphQLString),
    },

    user_id: {
      type: new GraphQLNonNull(UserType),
      resolve(self, args, ctx) {
        return ctx.userById.load(self.user_id);
      },
    },

    // createdAt: dateField(self => self.created_at),
    // updatedAt: dateField(self => self.updated_at),
  },
});
