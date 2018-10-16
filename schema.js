const { gql } = require("apollo-server");

module.exports = gql`
  type Test {
    title: String
    data: String
  }
  type Query {
    tests: [Test]
  }

  type Subscription {
    testAdded: Test
  }
  schema {
    query: Query
    subscription: Subscription
  }
`;
