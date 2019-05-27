//DEPENDENCIES
const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");

//APP CONFIG
const app = express();
const port = process.env.PORT || 3000;
const schema = require("./schema/schema");

//DB CONFIG
let db_password = "Lp56I7AsP2SP9NB8";
mongoose.connect(
  `mongodb+srv://book-manager:${db_password}@graph-books-db-iogwm.mongodb.net/test?retryWrites=true`,
  { useNewUrlParser: true }
);
mongoose.connection.once("open", () => {
  console.log("<< connected to database");
});

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
