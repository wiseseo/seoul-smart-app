import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: 'http://seoul-smart-api.herokuapp.com',
});

export default client;