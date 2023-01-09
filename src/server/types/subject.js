import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { UserType } from '.';
import { dateField } from '../utils';

export const SubjectType = new GraphQLObjectType({
  name: 'Subject',
  fields: {
    id: globalIdField(),

    user: {
      type: new GraphQLNonNull(UserType),
      resolve(self, args, ctx) {
        return ctx.userById.load(self.author_id);
      },
    },
    subject: {
      type: new GraphQLNonNull(GraphQLString),
    },
    expertise: {
      type: new GraphQLNonNull(GraphQLString),
    },
    price: {
      type: new GraphQLNonNull(GraphQLString),
    },
    num_of_lessons: {
      type: new GraphQLNonNull(GraphQLString),
    },
    createdAt: dateField(self => self.created_at),
    updatedAt: dateField(self => self.updated_at),
  },
});
