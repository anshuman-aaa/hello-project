import uuid from 'uuid';
import { mutationWithClientMutationId } from 'graphql-relay';
import { GraphQLNonNull, GraphQLID, GraphQLBoolean, GraphQLInt } from 'graphql';

import db from '../db';
import { PackageType } from '../types';

export const insertPackage = mutationWithClientMutationId({
  name: 'InsertPackage',
  description: 'Creates a package for a subject.',

  inputFields: {
    subject_id: { type: new GraphQLNonNull(GraphQLID) },
    id: { type: GraphQLID },
    lessons: { type: GraphQLInt },
    price: { type: GraphQLInt },
    validateOnly: { type: GraphQLBoolean },
  },

  outputFields: {
    package: { type: PackageType },
  },

  async mutateAndGetPayload(input, ctx) {
    const id = uuid.v4();

    let subject;

    subject = await db
      .table('subjects')
      .where({ id })
      .first();

    if (!subject) {
      throw new Error(`Cannot find the subject # ${id}.`);
    }

    // Only the teacher of the subject or admins can edit it
    ctx.ensureIsAuthorized(user => subject.user_id === user.id || user.isAdmin);

    // Validate and sanitize user input
    const data = await ctx.validate(
      input,
      'create',
    )(x =>
      x
        .field('lessons')
        .isRequired()

        .field('price')
        .isRequired(),
    );

    let [pkg] = await db
      .table('packages')
      .insert({
        id,
        ...data,
      })
      .returning('*');

    return { pkg };
  },
});
