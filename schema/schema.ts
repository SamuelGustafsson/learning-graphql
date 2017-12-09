import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull
} from "graphql";

import { UserType, NewsType, CommentType } from "./schema-types";
import axios from "axios";

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
    },
    news: {
      type: NewsType,
      args: { id: { type: GraphQLString } },
      resolve(_parentValue, args) {
        return axios(`http://localhost:3000/news/${args.id}`).then(
          response => response.data
        );
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstname: { type: new GraphQLNonNull(GraphQLString) },
        lastname: { type: new GraphQLNonNull(GraphQLString) }
        // email: { type: GraphQLString },
        // password: { type: GraphQLString },
        // admin: {
        //   type: GraphQLBoolean,
        //   defaultValue: false
        // }
      },
      // firstname and lastname comes from args
      resolve(_parentValue, { firstname, lastname }) {
        return axios
          .post("http://localhost:3000/users", { firstname, lastname })
          .then(response => response.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
