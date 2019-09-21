import gql from 'graphql-tag';

const GET_PLACES = gql`
  query getPlaces($page: Int, $search: String, $facility: String, $gu: String) {
    getPlaces(page: $page, search: $search, facility: $facility, gu: $gu) {
      name
      location {
        address
      }
      thumbnail
    }
  }
`;

export default GET_PLACES;
