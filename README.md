# 🍦 Vanilla Scoop Blog

A full-stack blog management application built for the Zuitt S83 Mock Technical Exam.

Vanilla Scoop Blog allows users to create, manage, and discuss blog posts through a clean and responsive blogging platform with authentication, role-based access control, and comment management features.

---

## 👤 Developer

- Ray Unabia

---

## User Credentials

### Admin User
- **Email:** admin@mail.com
- **Password:** admin123

### Test User
- **Email:** user@mail.com
- **Password:** user12345

---
## ⚙️ Features

---

## 🧩 Core UI Components

- Navigation Bar (Role-based navigation)
- Home Page
- Banner Component
- Blog Feed Page
- Admin Blog Management Page
- View Blog Post Modal
- Add Blog Post Modal
- Update Blog Post Modal
- Login Page
- Register Page
- 404 Error Page

---

## 👤 Authentication System

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Persistent Login via localStorage
- User State Management using Pinia
- Role-Based Access Control (Admin / User)

---

## 👥 User Management

### User Features

- Register New Account
- Login to Existing Account
- View User Profile Details
- Update Username
- Update Password

### Admin Features

- Assign Admin Role to Users
- Access Admin Management Features

---

## 📝 Blog Post Management

### User Features

- View All Blog Posts
- View Individual Blog Posts
- Create Blog Posts
- Update Own Blog Posts
- Delete Own Blog Posts
- Comment on Blog Posts

### Admin Features

- View All Blog Posts
- Delete Any Blog Post
- Moderate User Content

---

## 💬 Comment Management

### User Features

- Add Comment to a Blog Post
- View Comments on Blog Posts
- Update Own Comments
- Delete Own Comments
- View Comment Edit History Counter

### Admin Features

- Delete Any Comment

---

## 🌐 API Endpoints Used

### Users

- POST /users/register
- POST /users/login
- GET /users/details
- PATCH /users/updateUsername
- PATCH /users/updatePassword
- PATCH /users/setAdmin/:userId

---

### Blog Posts

- POST /posts/add
- GET /posts
- GET /posts/:blogPostId
- PATCH /posts/update/:blogPostId
- DELETE /posts/delete/:blogPostId

---

### Comments

- POST /comments/:postId
- GET /comments/:postId
- PATCH /comments/:commentId
- DELETE /comments/:commentId

---

## 🔐 Authorization Rules

- Protected routes require a valid JWT Bearer Token
- Only authenticated users can create blog posts
- Only the author can edit their own blog posts
- Only the author or an admin can delete a blog post
- Only the owner can edit their own comments
- Only the owner or an admin can delete comments
- Only admins can assign admin privileges

---

## 🎨 UI / UX Design

- Vanilla Ice Cream Inspired Theme
- Warm Cream and Caramel Color Palette
- Responsive Layout
- Modal-Based Blog Viewing
- Smooth Hover Animations
- Modern Soft-Glass Design Elements
- Mobile-Friendly Interface
- Role-Aware Navigation

---

## 🛠️ Technology Stack

### Frontend

- Vue 3
- Vue Router
- Pinia
- Axios
- Bootstrap 5
- Notyf

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

---

## 📌 Project Notes

- Built for the Zuitt S83 Mock Technical Exam
- Implements RESTful API Design Principles
- Uses MongoDB and Mongoose for Data Persistence
- Passwords Secured Using bcrypt
- JWT-Based Authentication System
- Modular MVC Architecture
- Role-Based Access Control
- Comment Editing History Tracking
- Backend Deployed on Render
- Frontend Consumes REST API via Axios