const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        _id: ID
        author(s): [String]
        description: String
        bookId: String
        image: String
        forSale: String
        link: String
        title: String
    }

  # Set up an user type to handle returning data from a profile creation or user login
  type User {
        _id: ID
        email: [String]
        bookCount: Int
        savedBooks: [Book]
  }

  type Query {
    me: User
  }
  type Auth{
    token: ID!
    user: User
  }
  input savedBooks{
    author(s): [String]
    description: String
    bookId: String
    image: String
    forSale: String
    link: String
    title: String
  }

  type Mutation {
    # Set up mutations to handle logging in and return Auth type
    login(email: String!, password: String!): Auth
    addUser(email: String!, password: String!): Auth
    savedBooks(book: savedBooks): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;
