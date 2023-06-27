const { Book } = require('./models/Book');
const { Author } = require('./models/Author');
const { User } = require('./models/User');
const { books, authors } = require('./data');
const connectToDB = require('./config/db');
require('dotenv').config();

// Connection to DB
connectToDB();

const importBooks = async () => {
  try {
    await Book.insertMany(books);
    console.log('Books imported.');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const importAuthors = async () => {
  try {
    await Author.insertMany(authors);
    console.log('Authors imported.');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const removeBooks = async () => {
  try {
    await Book.deleteMany();
    console.log('Books deleted.');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const removeAuthors = async () => {
  try {
    await Author.deleteMany();
    console.log('Authors deleted.');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const removeUsers = async () => {
  try {
    await User.deleteMany();
    console.log('Users deleted.');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === '-import-books') {
  importBooks();
} else if (process.argv[2] === '-remove-books') {
  removeBooks();
} else if (process.argv[2] === '-import-authors') {
  importAuthors();
} else if (process.argv[2] === '-remove-authors') {
  removeAuthors();
} else if (process.argv[2] === '-remove-users') {
  removeUsers();
}
