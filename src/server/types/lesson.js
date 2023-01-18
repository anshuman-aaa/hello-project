import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { UserType } from './user';
import { dateField } from '../utils';

export const LessonType = new GraphQLObjectType({
  name: 'Lesson',
  fields: {
    id: globalIdField(),

    user: {
      type: new GraphQLNonNull(UserType),
      resolve(self, args, ctx) {
        return ctx.userById.load(self.user_id);
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
