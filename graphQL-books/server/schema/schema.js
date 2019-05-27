const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

const Book = require("../models/book");
const Author = require("../models/author");

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
    },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findById(parent.author_id);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    books: {
      type: GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({ author_id: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});
      }
    },
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, args) {
        return Author.findById(args.id);
      }
    },
    authors: {
      type: GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    createAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        //Se crea un modelo con mongoose
        let tempAuthor = new Author({
          name: args.name,
          age: args.age
        });
        tempAuthor.save();
        return tempAuthor;
      }
    },
    createBook: {
      type: BookType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        genre: { type: GraphQLString },
        author_id: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let tempBook = Book({
          name: args.name,
          genre: args.genre,
          author_id: args.author_id
        });
        tempBook.save();
        return tempBook;
      }
    }
  })
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
