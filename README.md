# My Dashboard Project

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Redux](https://img.shields.io/badge/Redux-Toolkit-purple?logo=redux)
![Ant Design](https://img.shields.io/badge/AntDesign-4.26.0-red?logo=ant-design)
![License](https://img.shields.io/badge/License-MIT-green)

> A modern React dashboard application demonstrating user authentication, API data fetching, and a responsive UI using Ant Design, Redux Toolkit, and RTK Query.

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [Getting Started](#getting-started)  

---

## Project Overview

This project is a **dashboard application** built with **React** that demonstrates:  

- **Authentication** (Login / Signup)  
- Displaying **products, brands, and categories** in a modern dashboard layout  
- **Responsive navbar** with avatar dropdown, logout, and menu items  
- Loading states and error handling  
- State management using **Redux & RTK Query**  
- Form handling with **Formik + Yup**  

The dashboard is designed to simulate a real-world application even though the API used provides only limited data.

---

## Features

- **Authentication**
  - Login & Signup with validation
  - Token-based authentication stored in `localStorage`  
  - Protected routes for logged-in users  

- **Dashboard**
  - Shows **total counts** for products, brands, and categories  
  - Responsive **cards layout** for quick statistics  
  - Sections listing items fetched from API  
  - Loading indicators and error handling  

- **Navbar**
  - **Avatar dropdown** showing user name and email  
  - Logout functionality  
  - Responsive menu collapsing on smaller screens  

- **Forms**
  - Login & Signup forms using **Formik + Yup**  
  - Phone input with validation  
  - Error handling with highlighted fields  

---

## Technologies Used

- **React** – UI library  
- **Redux & Redux Toolkit** – State management  
- **RTK Query** – API fetching & caching  
- **Ant Design (AntD)** – UI components  
- **React Router v6** – Routing  
- **Formik + Yup** – Form handling and validation  
- **React Helmet** – SEO meta tags  
- **React Toastify** – Notifications  

---

## Getting Started

### Prerequisites

- Node.js >= 18  
- npm >= 9  

### Installation

```bash
# Clone the repository
git clone https://github.com/Joe-A11-RM/Orthoplex-Frontend-Challenge.git

# Navigate to project folder
cd Orthoplex-Frontend-Challenge

# Install dependencies
npm install

# Start development server
npm run dev
