const { gql } = require("apollo-server");

module.exports = gql`
  type Unit {
    title: String
    data: String
  }
  type Query {
    units: [Unit]
  }

  type Subscription {
    unitAdded: Unit
  }
  schema {
    query: Query
    subscription: Subscription
  }
`;
