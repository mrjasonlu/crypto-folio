// Import the Yoga server.
const { createSchema } = require('graphql-yoga');
const { createYoga } = require('graphql-yoga');
const http = require('http');
const fs = require('fs');
const path = require('path');

// load schema from file
const schemaPath = path.join(__dirname, 'schema.graphql');
const schemaString = fs.readFileSync(schemaPath, 'utf8');

// load data from file
const portfolioPath = path.join(__dirname, 'data', 'portfolio.json');
const portfolioString = fs.readFileSync(portfolioPath, 'utf8');

// Create a GraphQL schema.
const schema = createSchema({
  typeDefs: schemaString,
  resolvers: {
    Query: {
      userId: () => '123456789',
      rewards: () => 995,
      portfolio: () => JSON.parse(portfolioString),
    },
  },
});

// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({ schema, graphqlEndpoint: '/graphql' });

// Pass it into a server to hook into request handlers.
http.createServer(yoga).listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql');
});
