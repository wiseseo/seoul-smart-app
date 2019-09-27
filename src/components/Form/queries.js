import gql from 'graphql-tag';

export const CREATE_ACTIVITY = gql`
  mutation createActivity(
    $name: String!
    $userId: String!
    $total: Int!
    $date: String!
    $startTime: String!
    $endTime: String!
    $place: String!
    $room: String!
    $content: String!
    $type: String!
  ) {
    createActivity(
      name: $name
      userId: $userId
      total: $total
      date: $date
      startTime: $startTime
      endTime: $endTime
      place: $place
      room: $room
      content: $content
      type: $type
    ) {
      name
    }
  }
`;

export const START_EDIT = gql`
  mutation {
    startEdit @client {
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

export const END_EDIT = gql`
  mutation {
    endEdit @client {
      editing
    }
  }
`;

export const WRITE_EDIT = gql`
  mutation writeEdit(
    $id: String
    $name: String
    $total: String
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
    ) @client {
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

export const EXTEND_ACTIVITY = gql`
  mutation extendActivity(
    $activityId: String!
    $date: String!
    $startTime: String!
    $endTime: String!
    $place: String
    $room: String!
  ) {
    extendActivity(
      activityId: $activtityId
      date: $date
      startTime: $startTime
      endTime: $endTime
      place: $place
      room: $room
    ) {
      date
    }
  }
`;

export const MODIFY_ACTIVITY = gql`
  mutation modifyActivity(
    $activityId: String!
    $name: String!
    $userId: String!
    $total: Int!
    $date: String!
    $startTime: String!
    $endTime: String!
    $place: String!
    $room: String!
    $content: String!
    $type: String!
  ) {
    modifyActivity(
      activityId: $activityId
      name: $name
      userId: $userId
      total: $total
      date: $date
      startTime: $startTime
      endTime: $endTime
      place: $place
      room: $room
      content: $content
      type: $type
    ) {
      name
      total
      days {
        date
        startTime
        endTime
        place
        room
      }
      content
      type
      status
    }
  }
`;
