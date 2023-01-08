import _ from 'lodash';
import { globalIdField } from 'graphql-relay';
import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

import { UserType } from './user';
import { PackageType } from './package';
import { nodeInterface } from '../node';
import { dateField } from '../utils';

export const SubjectType = new GraphQLObjectType({
  name: 'Subject',
  interfaces: [nodeInterface],

  fields: () => ({
    id: globalIdField(),

    user: {
      type: new GraphQLNonNull(UserType),
      resolve(self, args, ctx) {
        return ctx.userById.load(self.user_id);
      },
    },

    name: {
      type: new GraphQLNonNull(GraphQLString),
    },

    expertise: {
      type: GraphQLString,
      args: {
        truncate: { type: GraphQLInt },
      },
      resolve(self, args) {
        return args.truncate
          ? _.truncate(self.text, { length: args.truncate })
          : self.text;
      },
    },

    packages: {
      type: new GraphQLList(PackageType),
      resolve(self, args, ctx) {
        return ctx.packagesBySubjectId.load(self.id);
      },
    },

    createdAt: dateField(self => self.created_at),
    updatedAt: dateField(self => self.updated_at),
  }),
});
