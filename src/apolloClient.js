import ApolloClient from 'apollo-boost';
import clientState from './clientState';

const client = new ApolloClient({
  uri: 'http://seoul-smart-api.herokuapp.com',
  clientState,
});

export default client;
