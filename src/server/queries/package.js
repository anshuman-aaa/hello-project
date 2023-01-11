import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';

import db from '../db';
import { PackageType } from '../types';

export const packages = {
  type: new GraphQLList(PackageType),

  args: {
    subject_id: { type: new GraphQLNonNull(GraphQLID) },
  },

  resolve(self, args, ctx) {
    return db
      .table('packages')
      .where({ subject_id: args.subject_id })
      .orderBy('created_at', 'desc')
      .limit(100)
      .select();
  },
};
