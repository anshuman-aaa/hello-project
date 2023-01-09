import { commitMutation, graphql } from 'react-relay';

function commit(environment, id, done) {
  return commitMutation(environment, {
    mutation: graphql`
      mutation DeleteSubjectMutation($input: DeleteSubjectInput!) {
        DeleteSubject(input: $input) {
          clientMutationId
          deletesubjectid
        }
      }
    `,

    variables: { input: { id } },
    onCompleted(_, errors) {
      // console.log(errors);
      done(errors ? errors[0].state || { '': [errors[0].message] } : null);
    },
  });
}

export default { commit };
