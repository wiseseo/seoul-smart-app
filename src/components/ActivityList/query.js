import gql from 'graphql-tag';

const GET_ACTIVITIES = gql`
  query getActivities($page: Int, $type: String) {
    getActivities(page: $page, type: $type) {
      name
      type
      id
    }
  }
`;

export default GET_ACTIVITIES;
