const { importSchema } = require('graphql-import')
const { ApolloServer, gql } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');
const { readFileSync } = require('fs');

// const supergraphSchema = readFileSync('./supergraph.graphql').toString();
const supergraphSchema = readFileSync('./example.graphql').toString();

const schema = readFileSync('./simple.graphql').toString();
const typeDefs = gql`${schema}`;

const gateway = new ApolloGateway({
    supergraphSdl: supergraphSchema
});

const resolvers = {
    Query: {
        fetchuser() {
            return {id: "1", name: "abc" }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
  // Subscriptions are not currently supported in Apollo Federation
  // subscriptions: false
});

server.listen().then(({ url }) => {
  console.log(`🚀 Gateway ready at ${url}`);
}).catch(err => {console.error(err)});
