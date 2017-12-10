import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLBoolean
} from "graphql";

import axios from "axios";

export const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    comment: { type: GraphQLString },
    author: {
      type: UserType,
      resolve(_parentValue, args) {
        return axios
          .get(`http://localhost:3000/users/${_parentValue.userId}`)
          .then(response => response.data);
      }
    }
  })
});

export const NewsType = new GraphQLObjectType({
  name: "NewsType",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    author: {
      type: UserType,
      resolve: function(_parentValue, args) {
        return axios
          .get("http://localhost:3000/users/" + _parentValue.userId)
          .then(function(response) {
            return response.data;
          });
      }
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(_parentValue, args) {
        return axios
          .get(`http://localhost:3000/news/${_parentValue.id}/comments`)
          .then(response => response.data);
      }
    }
  })
});

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    admin: { type: GraphQLBoolean },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(_parentValue, args) {
        return axios
          .get(`http://localhost:3000/users/${_parentValue.id}/comments`)
          .then(response => response.data);
      }
    }
  }
});
