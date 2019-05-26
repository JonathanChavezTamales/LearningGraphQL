//DEPENDENCIES
const express = require("express");
const graphqlHTTP = require("express-graphql");

//APP CONFIG
const app = express();
const port = process.env.PORT || 3000;
const schema = require("./schema/schema");

//MIDDLEWARE
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

//LISTENER
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
