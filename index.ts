import * as express from "express";
// TODO: Why not import?
const expressGraphQL = require("express-graphql");

const app = express();

// Should only be used in development
app.use(
  "/graphql",
  expressGraphQL({
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("Listing on port 4000");
});
