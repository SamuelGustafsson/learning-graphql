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
      },
      // firstname and lastname comes from args
      resolve(_parentValue, { firstname, lastname }) {
        return axios
          .post("http://localhost:3000/users", { firstname, lastname })
          .then(response => response.data);
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(_parentValue, { id }) {
        return axios
          .delete(`http://localhost:3000/users/${id}`)
          .then(response => response.data);
      }
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString }
      },
      resolve(_parentValue, args) {
        return axios
          .patch(`http://localhost:3000/users/${args.id}`, args)
          .then(response => response.data);
      }
    }
  }
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation
});
