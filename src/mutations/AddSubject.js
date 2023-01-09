import { commitMutation, graphql } from 'react-relay';

function commit(environment, input, done) {
  return commitMutation(environment, {
    mutation: graphql`
      mutation AddSubjectMutation($input: AddSubjectInput!) {
        AddSubject(input: $input) {
          subject {
            id
          }
        }
      }
    `,

    variables: { input },

    onCompleted(_, errors) {
      // console.log(errors)
      done(errors ? errors[0].state || { '': [errors[0].message] } : null);
    },
  });
}

export default { commit };
