import gql from 'graphql-tag';

export const FIND_USER = gql`
  query findUser($id: String!) {
    findUser(_id: $id) {
      name
      achievement
      activityLog {
        activityId
        name
        leader {
          userId
        }
        days {
          date
          startTime
          endTime
          place
          room
        }
        participants {
          userId
          name
          comment
        }
        status
      }
    }
  }
`;

export const MODIFY_USER = gql`
  mutation modifyUser($id: String!, $name: String!) {
    modifyUser(userId: $id, name: $name) {
      name
    }
  }
`;

export const GET_PLACE = gql`
  query findPlace($id: String!) {
    findPlace(_id: $id) {
      name
      rooms {
        name
        equipments
        description
        thumbnail
      }
      location {
        address
      }
      businessHour
      bookLink
      contact
    }
  }
`;

export const GET_ACTIVITY = gql`
  query findActivity($id: String!) {
    findActivity(_id: $id) {
      name
      type
      days {
        date
        startTime
        endTime
        place
        room
      }
      total
      content
      status
    }
  }
`;

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
      place
      room
      content
      type
    }
  }
`;
