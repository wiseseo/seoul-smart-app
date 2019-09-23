import EDIT_FRAGMENT from './fragments';
import { GET_EDIT } from './queries';

const defaults = {
  edit: {
    __typename: 'Edit',
    editing: false,
    id: 'new',
    name: '활동이름',
    total: 3,
    date: '2019-09-22',
    startTime: '02:00',
    endTime: '03:00',
    place: '장소',
    room: '지대',
    content: '내용',
    type: 'mentoring',
  },
};
const typeDefs = [
  `
  schema {
    query: Query,
    mutation: Mutation,
  }
  type Query {
    edit: Edit!
  }
  type Mutation {
    startEdit: Edit!
    writeEdit(id: String, name: String, total: Int, date: String, startTime: String, endTime: String, place: String, room: String, content: String, type: String): Edit!
  }
  type Edit {
      editing: Boolean!
      id: String
      name: String
      total: Int
      date: String
      startTime: String
      endTime: String
      place: String
      room: String
      content: String
      type: String
  }
`,
];
const resolvers = {
  Query: {
    edit: (_, variables, { cache }) => {
      const id = cache.config.dataIdFromObject({ __typename: 'Edit' });
      return cache.readFragment({ frament: EDIT_FRAGMENT, id });
    },
  },
  Mutation: {
    startEdit: (_, variables, { cache }) => {
      const { edit } = cache.readQuery({ query: GET_EDIT });
      edit.editing = true;
      cache.writeData({
        data: {
          edit,
        },
      });
      return edit;
    },
    writeEdit: (_, variables, { cache }) => {
      const {
        id,
        name,
        total,
        date,
        startTime,
        endTime,
        place,
        room,
        content,
        type,
      } = variables;
      const newEdit = {
        __typename: 'Edit',
        editing: false,
        id,
        name,
        total,
        date,
        startTime,
        endTime,
        place,
        room,
        content,
        type,
      };
      cache.writeData({
        data: {
          edit: newEdit,
        },
      });
      return newEdit;
    },
  },
};

export default {
  defaults,
  typeDefs,
  resolvers,
};
