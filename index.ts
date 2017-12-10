import * as express from "express";
// TODO: Why not import?
import * as expressGraphQL from "express-graphql";
import { schema } from "./schema/schema";

const app = express();

// Should only be used in development
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("Listing on port 4000");
});
