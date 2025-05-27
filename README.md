# ShelfShare: Your Personal Library Companion

ShelfShare is a fun and intuitive platform where book lovers can manage and share their book collections. Whether you’re looking to add your favorite reads, explore genres, or lend a book to a friend, ShelfShare makes it simple and secure.

---

## 📚 Key Features

### For Book Lovers:

* **Add Your Books**: Upload your favorite reads with details like title, author, genre, description, and even a cover image!
* **Explore by Genre**: Discover books filtered by genres like Fiction, Self-Help, Romance, and more.
* **Stay Secure**: Enjoy a secure login system powered by JWT authentication.
* **Borrowing Made Easy**: Request to borrow books seamlessly.

### For Administrators:

* **Control at Your Fingertips**: Manage all books in the system with ease.

---

## 🛠️ Tech Stack

### Frontend:

* **React.js**: For dynamic and responsive user interfaces.
* **Axios**: To handle seamless communication with the backend.
* **CSS**: To style the app with flair.

### Backend:

* **Node.js**: The backbone of the server-side logic.
* **Express.js**: For efficient and scalable APIs.
* **Multer**: To handle file uploads (like book cover images).
* **JWT**: For secure authentication.

### Database:

* **MongoDB Atlas**: Your books, safe and sound in the cloud.

---

## 🚀 Getting Started

### Prerequisites:

* Install **Node.js** (v16 or higher).
* Create a **MongoDB Atlas Account**.

### Installation Steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/shelfshare.git
   cd shelfshare
   ```

2. **Set Up the Backend**:

   ```bash
   cd server
   npm install
   ```

3. **Set Up the Frontend**:

   ```bash
   cd ../client
   npm install
   ```

4. **Configure Environment Variables**:

   * In the `server` directory, create a `.env` file with the following:

     ```env
     PORT=8080
     MONGODB_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     NODE_ENV=development
     ```
   * Replace `<your-mongodb-uri>` and `<your-jwt-secret>` with your actual MongoDB connection string and a secure JWT secret.

5. **Run the Development Servers**:

   * **Backend**:

     ```bash
     cd server
     npm run dev
     ```
   * **Frontend**:

     ```bash
     cd ../client
     npm start
     ```

6. **Enjoy ShelfShare**:

   * Frontend: [http://localhost:3000](http://localhost:3000)
   * Backend: [http://localhost:8080](http://localhost:8080)

---

## 🔗 API Endpoints

### **Authentication**:

* `POST /register`: Sign up for ShelfShare.
* `POST /login`: Log in and get your access token.

### **Books**:

* `POST /books`: Add a new book (JWT required).
* `GET /books`: Fetch all books or filter by genre (JWT required).

---

## 🗂️ Project Structure

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

## 🌟 What’s Next?

1. **Borrowing System**: Build a complete borrowing workflow with notifications.
2. **Role-Based Access**: Separate user and admin functionalities.
3. **Real-Time Notifications**: Alerts for borrowing requests and approvals.
4. **Enhanced UI/UX**: Add animations and accessibility features.

---

## 🤝 Contributing

We’d love your help! Here’s how you can contribute:

1. **Fork** the repository.
2. **Create** a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** your changes:

   ```bash
   git commit -m "Add your message here"
   ```
4. **Push** the branch:

   ```bash
   git push origin feature/your-feature-name
   ```
5. **Submit** a pull request and describe your changes.

---

## 📜 License

ShelfShare is open-source and available under the [MIT License](LICENSE).

---

## 💬 Contact

Have questions or suggestions? Reach out!

* **Email**: [hashini.kodithuwakku22@gmail.com](mailto:hashini.kodithuwakku22@gmail.com)
* **GitHub**: [HashiniK](https://github.com/HashiniK)
