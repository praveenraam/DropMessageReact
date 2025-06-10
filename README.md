# 🔐 Encrypted Messaging App (React + Spring Boot)

This project is a secure messaging platform built with **React** for the frontend and **Spring Boot** for the backend. Users can create messages with optional password protection and share them using a unique slug. Viewers must provide the correct password to access encrypted content.

## ✨ Features

- ✅ Create messages with:
  - Title
  - Content
  - Expiration Date
  - Optional Encryption (with password)
- 🔐 View encrypted messages by verifying with password
- 🔗 Share messages via unique slug
- 👤 View all messages by a specific user
- 🔒 JWT-based Authentication and Authorization
- 🌙 Dark mode support (Tailwind CSS)

---

## 🛠 Tech Stack

### Frontend
- React
- Axios
- React Router DOM
- Tailwind CSS

### Backend
- Spring Boot (Java)
- Spring Security (JWT)
- RESTful API

---

## 🚀 Getting Started

### Prerequisites
- Node.js
- Java 17+
- Maven
- MySQL (or your preferred DB)

### Frontend Setup

```bash
cd frontend
npm install
npm start
