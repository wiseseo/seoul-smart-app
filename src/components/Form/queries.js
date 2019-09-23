import gql from 'graphql-tag';

export const START_EDIT = gql`
  mutation {
    startEdit {
      id
      name
      total
      date
      startTime
      endTime
      place
      room
      content
      type
    }
  }
`;

export const WRITE_EDIT = gql`
  mutation writeEdit(
    $id: String
    $name: String
    $total: Int
    $date: String
    $startTime: String
    $endTime: String
    $place: String
    $room: String
    $content: String
    $type: String
  ) {
    writeEdit(
      id: $id
      name: $name
      total: $total
      date: $date
      startTime: $startTime
      endTime: $endTime
      place: $place
      room: $room
      content: $content
      type: $type
    ) {
      editing
      id
      name
      total
      date
      startTime
      endTime
      place
      room
      content
      type
    }
  }
`;
