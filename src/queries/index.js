import gql from 'graphql-tag';

export const GET_EDIT = gql`
  {
    edit @client {
      editing
      id
      name
      total
      date
      startTime
      endTime
      placeId
      room
      content
      type
    }
  }
`;
