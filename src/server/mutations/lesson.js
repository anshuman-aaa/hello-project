import { LessonType } from '../types';
import { mutationWithClientMutationId } from 'graphql-relay';
import uuid from 'uuid';
import { fromGlobalId } from '../utils';

import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
} from 'graphql';
import db from '../db';

export const CreateLesson = mutationWithClientMutationId({
  name: 'CreateLesson',
  description: 'Creates a Lesson',
  inputFields: {
    subject: { type: GraphQLString },
    expertise: { type: GraphQLString },
    price: { type: GraphQLFloat },
    num_of_lessons: { type: GraphQLInt },
  },
  outputFields: {
    lesson: { type: LessonType },
  },
  async mutateAndGetPayload(input, ctx) {
    ctx.ensureIsAuthorized();
    let lesson;
    const newId = uuid.v4();
    [lesson] = await db.table('lessons').insert({
      id: newId,
      ...input,
      user_id: ctx.user.id,
    });

    return { lesson };
  },
});

export const DeleteLesson = mutationWithClientMutationId({
  name: 'DeleteLesson',
  description: 'Deletes a Lesson',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    deletedLessonId: { type: GraphQLString },
  },
  async mutateAndGetPayload(input, ctx) {
    ctx.ensureIsAuthorized();

    const id = fromGlobalId(input.id, 'Lesson');

    console.log(id);

    await db
      .table('lessons')
      .where({ id })
      .del();

    return { deletedLessonId: input.id };
  },
});
