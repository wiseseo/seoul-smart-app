import gql from 'graphql-tag';

const GET_PLACES = gql `
query getPlaces($page:Int) {
  getPlaces(page: $page) {
    id
    name
  }
}
`;

export default {
    GET_PLACES,
};