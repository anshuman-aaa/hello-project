/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import { commitMutation, graphql } from 'react-relay';

function commit(environment, input, done) {
  return commitMutation(environment, {
    mutation: graphql`
      mutation UpsertSubjectMutation($input: UpsertSubjectInput!) {
        upsertSubject(input: $input) {
          subject {
            sub
            price
            lesson
            expertise
            id
          }
        }
      }
    `,

    variables: { input },

    onCompleted({ upsertSubject }, errors) {
      done(
        errors ? errors[0].state || { '': [errors[0].message] } : null,
        upsertSubject && upsertSubject.subject,
      );
    },
  });
}

export default { commit };
