const { gql } = require("apollo-server");

module.exports = gql`
  type Unit {
    id: Float
    status: String
    type: String
    title: String
    description: String
    details: String
  }

  type Query {
    units: [Unit]
  }

  type Subscription {
    unitAdded(url: String!): Unit
  }

  schema {
    query: Query
    subscription: Subscription
  }
`;
