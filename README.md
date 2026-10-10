Mini SaaS Template Store

A full-stack web application for browsing website templates, searching by category, creating an account, and saving favorite templates.

Features

Browse website templates

Search templates by name, description, and category

Filter templates by category

User registration and login

JWT-based authentication

Save and remove favorite templates

Persist user favorites in MongoDB

Protected Favorites page

Tech Stack

-> For Frontend

React.js

Vite

React Router

CSS

-> For Backend

Node.js

Express.js

REST APIs

JWT authentication

bcrypt password hashing

Database

MongoDB Atlas

Mongoose

-> For Tools

Git and GitHub

Thunderclient

Visual Studio Code

-> Project Structure

<img width="317" height="708" alt="image" src="https://github.com/user-attachments/assets/52d4b86a-651b-4c4a-8421-065afc29019f" />

-> Setup Instructions

1. Clone the repository

git clone https://github.com/YOUR_GITHUB_USERNAME/fullstack-intern-task.git
cd fullstack-intern-task

2. Configure the backend

cd server
npm install

Create a .env file inside the server folder and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_secret

3. Start the backend:

npm run dev

4. Configure the frontend

Open a second terminal in VS Code and navigate to the project folder:

cd client
npm install
npm run dev

5. Use the application

Open the frontend URL in your browser. Register an account, log in, browse templates, and save favorites.

Author

Name: Pranav Jha
Gmail: jhapranav776@gmail.com
GitHub: https://github.com/PranavJha2003
