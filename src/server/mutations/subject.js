/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import { mutationWithClientMutationId } from 'graphql-relay';
import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
} from 'graphql';

import db from '../db';
import { SubjectType } from '../types';
import { fromGlobalId } from '../utils';
import uuid from 'uuid';

export const createSubject = mutationWithClientMutationId({
  name: 'CreateSubject',
  description: 'creates a Subject.',

  inputFields: {
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    isexpert: { type: GraphQLBoolean },
    price: { type: GraphQLInt },
    numlesson: { type: GraphQLInt },
  },

  outputFields: {
    subject: { type: SubjectType },
  },

  async mutateAndGetPayload(input, ctx) {
    ctx.ensureIsAuthorized(user => user.id === ctx.user.id || user.isAdmin);

    // Validate and sanitize user input

    let subject;

    if (Object.keys(input).length) {
      [subject] = await db
        .table('subjects')
        .insert({ ...input, id: uuid.v4(), mentorid: ctx.user.id })
        .returning('*');
    }

    return { subject };
  },
});

export const updateSubject = mutationWithClientMutationId({
  name: 'UpdateSubject',
  description: 'Updates a Subject.',

  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    isexpert: { type: GraphQLBoolean },
    price: { type: GraphQLInt },
    numlesson: { type: GraphQLInt },
  },

  outputFields: {
    subject: { type: SubjectType },
  },

  async mutateAndGetPayload(input, ctx) {
    const id = fromGlobalId(input.id, 'Subject');
    ctx.ensureIsAuthorized(user => user.id === ctx.user.id || user.isAdmin);

    // Validate and sanitize user input

    let subject;

    if (Object.keys(input).length) {
      [subject] = await db
        .table('subjects')
        .where({ id })
        .update({ ...input })
        .returning('*');
    }

    return { subject };
  },
});

export const deleteSubject = mutationWithClientMutationId({
  name: 'DeleteSubject',
  description: 'Deletes a Subject.',

  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },

  outputFields: {
    deletedSubjectId: {
      type: GraphQLString,
    },
  },

  async mutateAndGetPayload(input, ctx) {
    // Check permissions
    ctx.ensureIsAuthorized(user => user.id === ctx.user.id || user.isAdmin);
    const id = fromGlobalId(input.id, 'Subject');
    if (Object.keys(input).length)
      await db
        .table('subjects')
        .where({ id })
        .del();

    return { deletedSubjectId: input.id };
  },
});
