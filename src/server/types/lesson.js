// import {
//   GraphQLNonNull,
//   GraphQLObjectType,
//   GraphQLString,
//   GraphQLList,
//   GraphQLInt,
// } from 'graphql';

// const lessonType = new GraphQLObjectType({
//   name: 'Lesson',
//   fields: {
//     id: { type: GraphQLInt },
//     subject: { type: GraphQLString },
//     price: { type: GraphQLInt },
//     numLesson: { type: GraphQLInt },
//     duration: { type: GraphQLInt },
//   },
// });

/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

//import firebase from 'firebase-admin';
import { globalIdField } from 'graphql-relay';
import {
  GraphQLObjectType,
  // GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  // GraphQLBoolean,
  GraphQLInt,
} from 'graphql';

//import { IdentityType } from './identity';
import { nodeInterface } from '../node';
import { dateField } from '../utils';
import { UserType } from './user';

export const LessonType = new GraphQLObjectType({
  name: 'Lesson',
  interfaces: [nodeInterface],

  fields: {
    id: globalIdField(),
    subject: { type: GraphQLString },
    price: { type: GraphQLInt },
    numlesson: { type: GraphQLInt },
    duration: { type: GraphQLInt },
    expertise: { type: GraphQLString },
    user: {
      type: new GraphQLNonNull(UserType),
      resolve(self, args, ctx) {
        return ctx.userById.load(self.author_id);
      },
    },

    // username: {
    //   type: new GraphQLNonNull(GraphQLString),
    // },

    // email: {
    //   type: GraphQLString,
    //   resolve(self, args, ctx) {
    //     return ctx.user && (ctx.user.id === self.id || ctx.user.isAdmin)
    //       ? self.email
    //       : null;
    //   },
    // },

    // displayName: {
    //   type: GraphQLString,
    //   resolve(self) {
    //     return self.display_name;
    //   },
    // },

    // photoURL: {
    //   type: GraphQLString,
    //   resolve(self) {
    //     return self.photo_url;
    //   },
    // },

    // timeZone: {
    //   type: GraphQLString,
    //   resolve(self) {
    //     return self.time_zone;
    //   },
    // },

    // identities: {
    //   type: new GraphQLList(IdentityType),
    //   resolve(self, args, ctx) {
    //     return ctx.identitiesByUserId.load(self.id);
    //   },
    // },

    // isAdmin: {
    //   type: GraphQLBoolean,
    //   resolve(self, args, ctx) {
    //     return ctx.user && ctx.user.id === self.id
    //       ? ctx.user.isAdmin || false
    //       : self.is_admin;
    //   },
    // },

    // firebaseToken: {
    //   type: GraphQLString,
    //   resolve(self, args, ctx) {
    //     return ctx.user && ctx.user.id === self.id
    //       ? firebase.auth().createCustomToken(self.id)
    //       : null;
    //   },
    // },

    createdAt: dateField(x => x.created_at),
    updatedAt: dateField(x => x.updated_at),
    lastLoginAt: dateField(x => x.last_login_at),
  },
});
