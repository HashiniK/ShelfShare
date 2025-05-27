# ShelfShare Project

ShelfShare is a full-stack web application for managing and sharing books. It allows users to add books to their collection, browse books by genre, and borrow books from other users. The application uses authentication to ensure secure access.

---

## Features

### User Features:

* **Add Books**: Users can upload books with details like title, author, genre, description, and an optional image.
* **Browse by Genre**: Users can view books filtered by genre.
* **Authentication**: Secure login system using JWT.
* **Borrow Books**: Users can send requests to borrow books.

### Admin Features:

* **Manage Books**: Administrators can view and manage all books in the system.

---

## Tech Stack

### Frontend:

* React.js
* Axios for HTTP requests
* CSS for styling

### Backend:

* Node.js
* Express.js
* Multer for file uploads
* JWT for authentication

### Database:

* MongoDB (hosted on MongoDB Atlas)

---

## Installation

### Prerequisites:

* Node.js (v16+)
* MongoDB Atlas Account

### Steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/shelfshare.git
   cd shelfshare
   ```

2. Install dependencies for the backend:

   ```bash
   cd server
   npm install
   ```

3. Install dependencies for the frontend:

   ```bash
   cd ../client
   npm install
   ```

4. Set up environment variables:

   * Create `.env` files in the `server` directory with the following variables:

     ```env
     PORT=8080
     MONGODB_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     NODE_ENV=development
     ```
   * Replace `<your-mongodb-uri>` and `<your-jwt-secret>` with your MongoDB connection string and a secure JWT secret.

5. Start the development servers:

   * Backend:

     ```bash
     cd server
     npm run dev
     ```
   * Frontend:

     ```bash
     cd ../client
     npm start
     ```

6. Access the application:

   * Frontend: [http://localhost:3000](http://localhost:3000)
   * Backend: [http://localhost:8080](http://localhost:8080)

---

## API Endpoints

### **Authentication**:

* `POST /register`: Register a new user
* `POST /login`: Authenticate and retrieve a JWT

### **Books**:

* `POST /books`: Add a new book (requires JWT authentication)
* `GET /books`: Fetch all books or filter by genre (requires JWT authentication)

---

## Project Structure

```
ShelfShare
├── client
│   ├── public
│   └── src
│       ├── components
│       ├── pages
│       └── styles
├── server
    ├── database
    ├── middleware
    ├── routes
    └── uploads
```

---

## Future Improvements

1. **Borrowing System**: Implement a complete borrowing workflow with request management.
2. **Role-Based Access**: Enhance admin features to manage users and books.
3. **Notifications**: Add real-time notifications for book borrowing and lending.
4. **Improved UI**: Create a more user-friendly interface with animations and modern design.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`feature/your-feature-name`).
3. Commit your changes and push the branch.
4. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For inquiries or feedback, please contact:

* **Email**: [hashini.kodithuwakku22@gmail.com](mailto:hashini.kodithuwakku22@gmail.com)
* **GitHub**: [HashiniK](https://github.com/HashiniK)
