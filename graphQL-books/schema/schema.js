const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList
} = require("graphql");

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    genre: {
      type: GraphQLString
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    fields: {
      books: {
        type: new GraphQLList(BookType),
        resolve(parent, args) {
          console.log("All books query");
        }
      },
      book: {
        type: BookType,
        args: {
          id: { type: GraphQLString }
        },
        resolve(parent, args) {
          console.log("Book query");
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
