const express = require("express");
const graphqlHTTP = require("express-graphql");

const app = express();
const schema = require("./schema");

app.use(
  "/api",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(3000, console.log("listening on 3000"));
