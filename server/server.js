const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
// add apollo server
const {ApolloServer} = require ('apollo-server-express')
// add schemas
const {typeDefs, resolvers} = require ('./schemas');
// authorize middleware
const {authMiddleware} = require ('./utils/auth');
const { dirname } = require('path');

// calling express server
const app = express();
const PORT = process.env.PORT || 3001;

// calling apollo server
const server = new ApolloServer ({typeDefs, resolvers, context: authMiddleware})

// join express and apollo server
server.applyMiddleware({app});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

// input app.get
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, '../client/build'));
});

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  console.log('Use GraphQL at http://localhost:${PORT}${server.graphqlPath}')
});
