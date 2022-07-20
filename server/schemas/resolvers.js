const { AuthenticationError } = require('apollo-server-express');
const { User} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
     if (context.user) {
        const userData = await User.findOne({ _id: context.user._id})
        .select('-__v')
        return userData; 
     }
    throw new AuthenticationError('Not logged in');
    },

    user: async (parent, { username }) => {
      return User.findOne({ _id: username })
      .select('-__v')
    },
  },

  Mutation: {
    addUser: async ( parent, args ) => {
      const user = await user.create({ args });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await user.findOne({ email });

      if (!user) {
        throw new AuthenticationError('There is no user with this email!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    addBook: async (parent, { book }, context) => {
      if (context.user) {
        const User = await User.findOneAndUpdate (
        {_id: context.user._id},
        { $addToSet: { book: book } },
        { new: true }
    );
    return User;
        }
    throw new AuthenticationError('Please log in to add!')
    },

    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
      const User = await User.findOneAndUpdate (
      {_id: context.user._id},
      { $pull: { book: bookId } },
      { new: true }
                )
    return User;
        }
    }
  }
};

module.exports = resolvers;
