import gql from 'graphql-tag';

const GET_PLACES = gql`
  query getPlaces($page: Int, $search: String, $facility: String, $gu: String) {
    getPlaces(page: $page, search: $search, facility: $facility, gu: $gu) {
      name
      rooms {
        name
        thumbnail
      }
      location {
        address
        gu
      }
    }
  }
`;

export default GET_PLACES;
