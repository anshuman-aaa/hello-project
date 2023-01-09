import { mutationWithClientMutationId } from 'graphql-relay';
import {
  // GraphQLNonNull,
  // GraphQLID,
  GraphQLString,
  // GraphQLBoolean,
  GraphQLInt,
  //GraphQLObjectType,
} from 'graphql';
//import { LessonType } from '../types';
import db from '../db';
//import { CheckBoxTwoTone } from '@mui/icons-material';

export const addLesson = mutationWithClientMutationId({
  name: 'addLesson',
  description: 'Adds Lessons',
  //inputFields: LessonType,
  inputFields: {
    id: { type: GraphQLInt },
    subject: { type: GraphQLString },
    price: { type: GraphQLInt },
    numlesson: { type: GraphQLInt },
    duration: { type: GraphQLInt },
    expertise: { type: GraphQLString },
  },
  outputFields: {
    subject: { type: GraphQLString },
  },
  async mutateAndGetPayload(args, ctx) {
    await db
      .table('lessons')
      .insert({
        id: args.id,
        subject: args.subject,
        price: args.price,
        numlesson: args.numlesson,
        duration: args.duration,
        expertise: args.expertise,
        user_id: ctx.user && ctx.user.id,
      })
      .then({
        subject: args.subject,
      });

    return { subject: args.subject };
  },
});
