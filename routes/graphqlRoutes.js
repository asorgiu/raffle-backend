const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} = require('graphql');
const Entry = require('../db/models/entry');

const router = express.Router();

const EntryType = new GraphQLObjectType({
  name: 'Entry',
  description: 'A raffle entry',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    method: { type: GraphQLNonNull(GraphQLString) },
  }),
});
const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    entries: {
      type: GraphQLList(EntryType),
      description: 'List of All Entries',
      resolve: () => {
        return new Promise((resolve, reject) => {
          Entry.find((err, entries) => {
            if (err) reject(err);
            else resolve(entries);
          });
        });
      },
    },
  }),
});
const schema = new GraphQLSchema({
  query: RootQueryType,
});

// graphiql gives a GUI so you don't have to use something like postman
router.use(
  '/graphql',
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);

module.exports = router;
