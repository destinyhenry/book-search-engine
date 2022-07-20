const { AuthenticationError } = require('apollo-server-express');
const { User, Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
     if (context.user) {
        const userData = await User.findOne({ _id: context.user._id})
        return userData; 
     }
    throw new AuthenticationError('Not logged in');
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
  },

  Mutation: {
    addUser: async (parent, { parent, args }) => {
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
        { $addToCollection: { addedBooks: book } },
        { new: true }
    );
    return User;
        }
    throw new AuthenticationError('Please log in to add!')
    },

//         removeProfile: async (parent, { profileId }) => {
//       return Profile.findOneAndDelete({ _id: profileId });
//     },
//     removeSkill: async (parent, { profileId, skill }) => {
//       return Profile.findOneAndUpdate(
//         { _id: profileId },
//         { $pull: { skills: skill } },
//         { new: true }
//       );
//     },
//   },
// };

// module.exports = resolvers;
