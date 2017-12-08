import * as graphql from "graphql";
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;
const axios = require("axios");

const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    comment: { type: GraphQLString }
  }
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    comment: {
      type: CommentType,
      resolve(_parentValue, args) {
        return axios
          .get(`http://localhost:3000/comments/${_parentValue.commentId}`)
          .then(response => response.data);
      }
    }
  }
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(_parentValue: any, args: any) {
        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then(response => response.data);
      }
    },
    comment: {
      type: CommentType,
      args: { id: { type: GraphQLString } },
      resolve(_parentValue, args) {
        return axios(`http://localhost:3000/comments/${args.id}`).then(
          response => response.data
        );
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});

// En commentar ska ha en relation till en vändare och en nyhet.
