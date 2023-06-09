const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    spotUser: String
    email: String
    password: String
    reviews: [Review]!
    playlist: [Playlist]!
  }

  type Playlist {
    _id: String 
    review: [Review]!
  }

  type Review {
    uri: String
    _id: ID
    reviewText: String
    reviewAuthor: String
    createdAt: String
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    playlist(uri:String!): [Review]
    users: [User]
    user(username: String!): User
    reviews(username: String): [Review]
    review(reviewId: ID!): Review
    me: User
  }

  type Mutation {
    addUser(username: String!, spotUser: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addReview(reviewText: String, uri: String): Review
    addComment(reviewId: ID!, commentText: String!): Review
    removeReview(reviewId: ID!): Review
    removeComment(reviewId: ID!, commentId: ID!): Review
    updateReview(reviewId: ID!, reviewText: String!): Review
  }
`;

module.exports = typeDefs;
