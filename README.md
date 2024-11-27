# Book Store API

This is a backend REST API built using **Node.js** and **Express** for managing books in a bookstore. It provides endpoints to perform CRUD operations on book data, such as adding, updating, and deleting books, and fetching book details.

The API is designed to be simple and scalable, making it a great starting point for building more complex book store applications. 

## Features
- **RESTful API**: Built using Express.js.
- **CRUD Operations**: Allows for creating, reading, updating, and deleting book entries.
- **Authentication**: Supports user authentication using JWT (JSON Web Tokens).
- **Database**: Connects with PostgreSQL (or another database as needed) for data storage.
- **Error Handling**: Handles various API errors gracefully with appropriate status codes and messages.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Redadaghouj/book-store-api.git
    ```
2. Navigate to the project directory:
    ```bash
    cd book-store-api
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up your **PostgreSQL** database. You can use `config/database.js` to adjust the database credentials and connection details.
5. Create the database schema by running the migrations:
    ```bash
    npm run migrate
    ```
6. Run the application:
    ```bash
    npm start
    ```

Your API should now be running on `http://localhost:3000`.

## API Endpoints

### GET /books
Fetch all books from the database.

### POST /books
Add a new book to the store.

### PUT /books/:id
Update the details of a book.

### DELETE /books/:id
Remove a book from the store.

## Contributing
Feel free to fork the repository and submit pull requests for bug fixes or improvements. If you find an issue, feel free to open a new issue.

## License
This project is licensed under the MIT License.
