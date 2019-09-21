const defaults = {
  editing: false,
};
const typeDefs = [
  `
    schema {
        query: Query,
        mutation: Mutation,
    }
    type Query {
        editing: Boolean!
    }
    type Mutation {
        editing(edit: Boolean!): Boolean!
    }
    `,
];
const resolvers = {
  Query: {
    editing: () => false,
  },
};

export default {
  defaults,
  typeDefs,
  resolvers,
};
