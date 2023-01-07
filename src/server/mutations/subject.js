import uuid from 'uuid';
import { mutationWithClientMutationId } from 'graphql-relay';
import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
} from 'graphql';

import db from '../db';
import { SubjectType, PackageType } from '../types';
import { fromGlobalId } from '../utils';

export const upsertSubject = mutationWithClientMutationId({
  name: 'UpsertSubject',
  description: 'Creates or updates a subject.',

  inputFields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    expertise: { type: GraphQLString },
    validateOnly: { type: GraphQLBoolean },
  },

  outputFields: {
    subject: { type: SubjectType },
  },

  async mutateAndGetPayload(input, ctx) {
    const id = input.id ? fromGlobalId(input.id, 'Subject') : null;
    const newId = uuid.v4();

    let subject;

    if (id) {
      subject = await db
        .table('subjects')
        .where({ id })
        .first();

      if (!subject) {
        throw new Error(`Cannot find the subject # ${id}.`);
      }

      // Only the author of the story or admins can edit it
      ctx.ensureIsAuthorized(
        user => subject.user_id === user.id || user.isAdmin,
      );
    } else {
      ctx.ensureIsAuthorized();
    }

    // Validate and sanitize user input
    const data = await ctx.validate(
      input,
      id ? 'update' : 'create',
    )(x =>
      x
        .field('name', { trim: true })
        .isRequired()
        .isLength({ min: 3, max: 50 })

        .field('user_id', { trim: true })
        .isRequired()
        .isLength({ min: 3, max: 50 })

        .field('expertise', { trim: true })
        .isLength({ min: 10, max: 1000 }),
    );

    if (id && Object.keys(data).length) {
      [subject] = await db
        .table('subjects')
        .where({ id })
        .update({ ...data, updated_at: db.fn.now() })
        .returning('*');
    } else {
      [subject] = await db
        .table('subjects')
        .insert({
          id: newId,
          ...data,
          user_id: ctx.user.id,
        })
        .returning('*');
    }

    return { subject };
  },
});

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

    // Only the author of the story or admins can edit it
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
