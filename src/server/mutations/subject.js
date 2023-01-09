import {
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import db from '../db';
// import { fromGlobalId } from "../utils";
import uuid from 'uuid';
import { SubjectType } from '../types/subject';
import { fromGlobalId } from '../utils';

export const AddSubject = mutationWithClientMutationId({
  name: 'AddSubject',
  description: 'Add new Subject',

  inputFields: {
    id: { type: GraphQLID },
    subject: { type: GraphQLString },
    expertise: { type: GraphQLString },
    price: { type: GraphQLFloat },
    num_of_lessons: { type: GraphQLInt },
  },

  outputFields: {
    subject: { type: SubjectType },
  },

  async mutateAndGetPayload(input, ctx) {
    // const id = input.id ? fromGlobalId(input.id, 'Story') : null;
    const newId = uuid.v4();

    let subject;

    ctx.ensureIsAuthorized();

    [subject] = await db
      .table('subjects')
      .insert({
        id: newId,
        ...input,
        author_id: ctx.user.id,
      })
      .returning('*');
    // console.log(subject);
    return { subject };
  },
});

export const DeleteSubject = mutationWithClientMutationId({
  name: 'DeleteSubject',
  description: 'deletes a subject',

  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },

  outputFields: {
    deletesubjectid: { type: GraphQLString },
  },

  async mutateAndGetPayload(input, ctx) {
    ctx.ensureIsAuthorized();

    const id = fromGlobalId(input.id, 'Subject');

    // console.log(id);
    await db
      .table('subjects')
      .where({ id })
      .del();

    return { deletesubjectid: input.id };
  },
});
