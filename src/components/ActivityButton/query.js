import gql from 'graphql-tag';

export const APPLY_ACTIVITY = gql`
  mutation applyActivity(
    $activityId: String!
    $userId: String!
    $comment: String!
  ) {
    applyActivity(activityId: $activityId, userId: $userId, comment: $comment) {
      name
    }
  }
`;
