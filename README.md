# 🛒 WhatBytes E-Commerce Frontend Assignment

A fully responsive E-Commerce web application built using **Next.js** and **Tailwind CSS**, created for the WhatBytes frontend assignment.

## 🚀 Live Demo

- 🌐 [Live Site on Vercel](https://what-bytes-assignment-omega.vercel.app/)
- 📹 [Demo Video (Google Drive)](https://drive.google.com/file/d/1dMt9BfUd9pQcRwbt62aYDjBvacTqwuE5/view?usp=sharing)

---

## ✨ Features

### ✅ Home Page (`/`)
- Logo, Search Bar, Cart with badge, and Profile Avatar in the Navbar
- Product Filtering: Category, Price Range, and Search
- Responsive Product Grid
- Product Cards with Image, Title, Price, Rating, and Add to Cart

### ✅ Product Detail Page (`/product/[id]`)
- Large Product Image
- Title, Price, Description, Category
- Quantity Selector and Add to Cart Button

### ✅ Cart Page (`/cart`) – Bonus
- List of Products in Cart
- Update Quantity and Remove Items
- Price Summary
- Empty Cart Animation

---

## 🧠 Logic Implemented

- Category and Price Filtering via URL params
- Search filtering using string match
- Dynamic Routing with Next.js
- Global Cart State using React Context API
- Cart persisted in `localStorage`
- Conditional Rendering for edge cases

---

## 🛠 Tech Stack

- **Next.js**
- **Tailwind CSS**
- **TypeScript**
- **Lucide-react** (Icons)
- **React Context API**

---

## 📦 How to Run

```bash
git clone https://github.com/Ashwastaken78867/E-commerce
cd E-commerce
npm install
npm run dev
