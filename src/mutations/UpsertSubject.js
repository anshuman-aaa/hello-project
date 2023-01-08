import { commitMutation, graphql } from 'react-relay';

function commit(environment, input, done) {
  return commitMutation(environment, {
    mutation: graphql`
      mutation UpsertSubjectMutation($input: UpsertSubjectInput!) {
        upsertSubject(input: $input) {
          subject {
            id
            name
            expertise
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
