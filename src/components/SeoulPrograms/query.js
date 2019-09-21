import gql from 'graphql-tag';

const GET_PROGRAMS = gql`
  query {
    getPrograms {
      id
      title
      image
      link
    }
  }
`;

export default GET_PROGRAMS;
