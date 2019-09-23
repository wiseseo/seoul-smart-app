import gql from 'graphql-tag';

export default gql`
  fragment EditPars on Edit {
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
`;
