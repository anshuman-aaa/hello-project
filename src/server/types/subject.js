import { globalIdField } from 'graphql-relay';
import {
  GraphQLObjectType,
  // GraphQLList,
  // GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
} from 'graphql';

export const SubjectType = new GraphQLObjectType({
  name: 'Subject',

  fields: {
    id: globalIdField(),
    name: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    price: {
      type: GraphQLInt,
    },
    isexpert: {
      type: GraphQLBoolean,
    },
    numlesson: {
      type: GraphQLInt,
    },
    mentorid: {
      type: GraphQLString,
    },
  },
});
