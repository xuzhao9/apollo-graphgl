const { ApolloServer, gql } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');
const { readFileSync } = require('fs');

// const supergraphSchema = readFileSync('./supergraph.graphql').toString();
const supergraphSchema = readFileSync('./example.graphql').toString();

const gateway = new ApolloGateway({
    supergraphSdl: supergraphSchema
});

const server = new ApolloServer({
  gateway,
  // Subscriptions are not currently supported in Apollo Federation
  subscriptions: false
});

server.listen().then(({ url }) => {
  console.log(`🚀 Gateway ready at ${url}`);
}).catch(err => {console.error(err)});
