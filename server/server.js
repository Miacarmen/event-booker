const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');

const PORT = 4000;

const app = express();

const events = [
  {
    id: 1,
    name: 'Couples Cooking',
    days: 'Thursday, Friday, Saturday',
  },
  {
    id: 2,
    name: 'Sunset Sail',
    days: 'Wednesday, Thursday, Friday, Saturday',
  },
  {
    id: 3,
    name: 'Wine Tasting',
    days: 'Friday, Saturday, Sunday',
  },
];

// const schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'Hello World',
//     fields: () => ({
//       message: {
//         type: GraphQLString,
//         resolve: () => 'Hello World'
//       }
//     })
//   })
// })

const EventType = new GraphQLObjectType({
  name: 'Event',
  description: 'An Event',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    days: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    events: {
      type: new GraphQLList(EventType),
      description: 'List of All Events',
      resolve: () => events,
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
app.listen(`${PORT}`, () =>
  console.log(
    `Server Running on Port ${PORT}. Now browse to localhost:4000/graphql`
  )
);

// const express = require('express');
// const bodyParser = require('body-parser');
// const { graphqlHTTP } = require('express-graphql');
// const { buildSchema } = require('graphql');

// const PORT = 5000;

// const app = express();

// Middleware for parsing json data
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: false }));
// `urlencoded` data represents a URL encoded form. If we had a HTML form with fields: `username` and `password`, our urlencoded data would be "username=JohnAppleseed&password=passw0rd"
// The extended option allows us to choose whether we want to parse strings with the included qs library (qs: parses and stringifies queries, provides additional security)

// let schema = buildSchema(`
//   type Query {
//     events: [String!]!
//   }

//   type Mutation {
//     createEvent(name: String): String
//   }
// `);

// let root = {
//   events: () => {
//     return ['Couples Cooking', 'Sunset Sail', 'Wine Tasting'];
//   },
//   createEvent: (args) => {
//     const eventName = args.name;
//     return eventName;
//   }
// }

// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// }));

// // Routes
// // send the index.html file always
// // app.get("/*", (req, res) => {
// //     res.sendFile(path.join(__dirname, "../client/build/index.html"));
// //   });

// // Start Node + Express server on Port 5000
// app.listen(PORT, () => {
//   console.log(`API server running on port ${PORT}!`);
// });
