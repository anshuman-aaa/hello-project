import { commitMutation, graphql } from 'react-relay';

function commit(environment, input, done) {
  return commitMutation(environment, {
    mutation: graphql`
      mutation CreateLessonMutation($input: CreateLessonInput!) {
        CreateLesson(input: $input) {
          lesson {
            id
          }
        }
      }
    `,

    variables: { input },

    onCompleted(_, errors) {
      // done(errors ? errors[0].state || { '': [errors[0].message] } : null);
    },
  });
}

export default { commit };
