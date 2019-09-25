import gql from 'graphql-tag';

export const CHANGE_ACTIVITY = gql`
  mutation changeActivity($activityId: String!, $status: String!) {
    changeActivity(activityId: $activityId, status: $status) {
      id
      name
      leader {
        userId
      }
      participants {
        userId
      }
      status
    }
  }
`;
