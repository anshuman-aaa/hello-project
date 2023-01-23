/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import { commitMutation, graphql } from 'react-relay';

function commit(environment, input, done) {
  return commitMutation(environment, {
    mutation: graphql`
      mutation CreateSubjectMutation($input: CreateSubjectInput!) {
        createSubject(input: $input) {
          subject {
            id
            name
            description
            isexpert
            numlesson
            price
          }
        }
      }
    `,

    variables: { input },

    onCompleted({ createSubject }, errors) {
      done(
        errors ? errors[0].state || { '': [errors[0].message] } : null,
        createSubject && createSubject.subject,
      );
    },
  });
}

export default { commit };
