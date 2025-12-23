# 🍅 Tomato – Online Food Ordering Website (MERN Stack)

Tomato is a **full‑stack online food ordering web application** built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It provides a smooth user experience for customers to browse food items, place orders, make payments using Stripe, and track order status in real time. An **Admin Panel** is also included to manage products and orders efficiently.

---

## 🚀 Live Demo

* 🌐 **Frontend (User App):(https://food-del-frontend-m48s.onrender.com/)
* 🛠 **Admin Panel:(https://food-del-admin-a7a7.onrender.com/)


---

## 🧰 Tech Stack

### Frontend

* React.js
* React Router DOM
* Context API
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Stripe Payment Gateway

### Admin Panel

* React.js
* Axios
* Order & Product Management

---

## 👤 User Features

### 🔐 Authentication

* User Signup & Login using JWT authentication

### 🍔 Product Browsing

* View all available food products
* Filter food items
* Increase or decrease product quantity
* Add items to cart automatically

### 🛒 Cart Management

* View cart items
* Increase / decrease quantity
* Remove items from cart

### 📦 Order & Checkout

* Proceed to checkout from cart
* Enter delivery details
* Redirect to **Stripe Payment Gateway**
* Payment success → Navigate to **Orders Page**
* Payment failure → Redirect back to **Cart Page**

### 🚚 Order Tracking

* View all user orders
* Track live order status (Food Processing, Out for Delivery, Delivered, etc.)

---

## 🛠 Admin Features

### 📦 Product Management

* Add new food products
* Products update instantly on user interface
* Remove products

### 📋 Order Management

* View all user orders
* Update order status
* Order status changes reflect instantly in user application

---

## 📂 Project Structure

```
food-delivery/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   └── public/
│
├── admin/
│   ├── src/
│   └── public/
│
└── README.md
```

---

## 🔐 Environment Variables

Create a `.env` file inside the **backend** folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

---

## ▶️ Run Locally

### Backend

```bash
cd backend
npm install
npm run server
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Admin Panel

```bash
cd admin
npm install
npm run dev
```

---

## 🧪 Payment Testing (Stripe)

Use Stripe test card:

```
Card Number: 4242 4242 4242 4242
Expiry: Any future date
CVV: Any 3 digits
```

---

## 📸 Screenshots

> (Add screenshots of UI, Cart, Checkout, Admin Panel here)

---

## 🎯 Future Enhancements

* Email notifications
* Order cancellation
* Coupon system
* User profile management

---

## 👨‍💻 Author

**Manju Siva**
Frontend & Full‑Stack Developer

---

## ⭐ If you like this project

Give it a **star ⭐** and feel free to fork 🍴

---

Happy Coding 🚀
