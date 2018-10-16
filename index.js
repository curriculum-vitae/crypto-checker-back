const { ApolloServer, PubSub } = require("apollo-server-express");
const { execute, subscribe, buildSchema } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");

const express = require("express");
const schema = require("./schema");
const { createServer } = require("http");

const { DUMMY_DATA, PORT } = require("./constants");

const pubsub = new PubSub();
const app = express();
const httpServer = createServer(app);
const resolvers = {
  Query: {
    units: () => DUMMY_DATA
  },
  Subscription: {
    unitAdded: {
      subscribe: () => pubsub.asyncIterator("unitAdded")
    }
  }
};
const server = new ApolloServer({ typeDefs: schema, resolvers });

server.applyMiddleware({ app, path: "/graphql" });
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${
      server.subscriptionsPath
    }`
  );
});

setInterval(() => {
  const payload = {
    unitAdded: { title: `TITLE_${Date.now()}`, data: `DATA_${Date.now()}` }
  };
  pubsub.publish("unitAdded", payload);
}, 100);
