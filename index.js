const { ApolloServer, PubSub } = require("apollo-server-express");

const { withFilter } = require("graphql-subscriptions");

const express = require("express");
const schema = require("./schema");
const { createServer } = require("http");

const { DUMMY_DATA, PORT } = require("./constants");

const DUMMY_FORM_DATA = {
  host: "127.0.0.1",
  port: "4001",
  coin: "BTC"
};

const pubsub = new PubSub();
const app = express();
const httpServer = createServer(app);
const resolvers = {
  Query: {
    units: () => DUMMY_DATA
  },
  Mutation: {
    urlAdd: (_, params, context) => {
      publishTestData({ url: params.url });
      return new Promise(resolve => {
        resolve({
          id: Date.now(),
          status: "URL CREATED"
        });
      });
    }
  },
  Subscription: {
    unitAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("unitAdded"),
        (payload, variables) => {
          return payload.unitAdded.url === variables.url;
        }
      )
    }
  }
};
const server = new ApolloServer({ typeDefs: schema, resolvers });
const units = require("./units");

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

/*
  TODO
  [] Optimize memory usage
*/

const publishTestData = ({ url }) => {
  let countOfUnitsPassed = 0;
  const countOfUnitsAll = units.length;
  const SUBSCRIPTION_NAME = "unitAdded";

  units.forEach(async unit => {
    const { title, run } = unit;
    let payload = {};

    try {
      const responseFromUnit = await run(DUMMY_FORM_DATA);
      countOfUnitsPassed++;
      payload[SUBSCRIPTION_NAME] = {
        id: Date.now(),
        url,
        status: countOfUnitsPassed === countOfUnitsAll ? "resolved" : "pending",
        type: responseFromUnit.error ? "error" : "info",
        title,
        description: responseFromUnit.result,
        details: responseFromUnit.details
      };
    } catch (e) {
      countOfUnitsPassed++;
      payload[SUBSCRIPTION_NAME] = {
        id: Date.now(),
        url,
        status: countOfUnitsPassed === countOfUnitsAll ? "resolved" : "pending",
        type: "error",
        title,
        description: "ERROR"
      };
    }

    pubsub.publish(SUBSCRIPTION_NAME, payload);
  });
};
