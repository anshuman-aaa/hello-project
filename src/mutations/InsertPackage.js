import { commitMutation, graphql } from 'react-relay';

function commit(environment, input, done) {
  return commitMutation(environment, {
    mutation: graphql`
      mutation InsertPackageMutation($input: InsertPackageInput!) {
        insertPackage(input: $input) {
          package {
            id
            subject {
              id
            }
            lessons
            price
          }
        }
      }
    `,
    variables: { input },
    onCompleted({ insertPackage }, errors) {
      done(
        errors ? errors[0].state || { '': [errors[0].message] } : null,
        insertPackage && insertPackage.subject,
      );
    },
  });
}

export default { commit };
