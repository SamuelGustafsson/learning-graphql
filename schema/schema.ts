import * as graphql from "graphql";
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const users = [
  { id: "23", firstname: "Bill", lastname: "Jacksson" },
  { id: "24", firstname: "Samuel", lastname: "Gustafsson" }
];

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString }
  }
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(_parentValue: any, args: any) {
        return users.find(user => user.id === args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
