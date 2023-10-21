const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const { getUserId } = require('./utils');

const prisma = new PrismaClient();

const typeDefs = fs.readFileSync(
    path.join(__dirname, 'schema.graphql'), 'utf8'
);

const Query = require('./resolvers/Query');
const Report = require('./resolvers/Report');
const User = require('./resolvers/User');
const Mutation = require('./resolvers/Mutation');

const resolvers = {
    Query,
    Report,
    User,
    Mutation
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        return {
            ...req,
            prisma,
            userId:
                req && req.headers.authorization
                    ? getUserId(req)
                    : null
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`server is running on ${url}`);
})
