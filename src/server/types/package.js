import { globalIdField } from 'graphql-relay';
import { GraphQLObjectType, GraphQLNonNull, GraphQLInt } from 'graphql';
import { SubjectType } from './subject';
import { nodeInterface } from '../node';
import { dateField } from '../utils';

export const PackageType = new GraphQLObjectType({
  name: 'Package',
  interfaces: [nodeInterface],

  fields: () => ({
    id: globalIdField(),

    subject: {
      type: new GraphQLNonNull(SubjectType),
      resolve(self, args, ctx) {
        return ctx.subjectById.load(self.subject_id);
      },
    },

    lessons: {
      type: new GraphQLNonNull(GraphQLInt),
    },

    price: {
      type: new GraphQLNonNull(GraphQLInt),
    },

    createdAt: dateField(self => self.created_at),
    updatedAt: dateField(self => self.updated_at),
  }),
});
