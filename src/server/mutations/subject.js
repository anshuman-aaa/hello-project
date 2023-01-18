/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import { mutationWithClientMutationId } from 'graphql-relay';
import {
  GraphQLNonNull,
  // GraphQLID,
  GraphQLString,
  GraphQLInt,
  // GraphQLID,
} from 'graphql';

import db from '../db';
import { SubjectType } from '../types';
// import { fromGlobalId } from '../utils';

export const upsertSubject = mutationWithClientMutationId({
  name: 'UpsertSubject',
  description: 'Add a Subject.',

  inputFields: {
    sub: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLInt) },
    lesson: { type: new GraphQLNonNull(GraphQLInt) },
    expertise: { type: new GraphQLNonNull(GraphQLString) },
    // id : {type : new GraphQLNonNull(GraphQLID)}
  },

  outputFields: {
    subject: {
      type: SubjectType,
    },
  },

  async mutateAndGetPayload(input, ctx) {
    // Check permissions
    console.log(input);
    ctx.ensureIsAuthorized();

    const { sub, price, lesson, expertise } = input;

    const [subjectData] = await db
      .table('subjects')
      .insert({
        sub: sub,
        lesson: lesson,
        price: price,
        expertise: expertise,
        user_id: ctx.user && ctx.user.id,
      })
      .returning('*');

    return { subject: subjectData };
  },
});
