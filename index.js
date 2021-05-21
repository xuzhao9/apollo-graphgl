const { importSchema } = require('graphql-import')
const { ApolloServer, gql } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');
const { readFileSync } = require('fs');
const { buildFederatedSchema } = require('@apollo/federation');
const { userdb } = require('./users-db')
const { postdb } = require('./posts-db')

// const supergraphSchema = readFileSync('./supergraph.graphql').toString();
const supergraphSchema = readFileSync('./example.graphql').toString();

const schema = readFileSync('./simple.graphql').toString();
const typeDefs = gql`${schema}`;

const gateway = new ApolloGateway({
    supergraphSdl: supergraphSchema
});

const resolvers = {
    Query: {
        fetchuser(_, { id }) {
            const found = userdb.find(element => element.id === id);
            return found;
        },
        fetchallusers() {
            return userdb
        }
    }
}

const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

server.listen().then(({ url }) => {
  console.log(`🚀 Gateway ready at ${url}`);
}).catch(err => {console.error(err)});
