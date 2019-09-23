import gql from 'graphql-tag';

export const START_EDIT = gql`
  mutation {
    startEdit @client {
      editing
    }
  }
`;

export const CREATE_EDIT = gql`
  mutation createEdit(
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
    createEdit
      @client(
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

export const MODIFY_EDIT = gql`
  mutation modifyEdit(
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
    modifyEdit
      @client(
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
