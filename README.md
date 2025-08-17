# HealthHub Express - Your Multi-Vendor Medicine E-commerce Platform

## 🌐 Live Site URL
[Insert your live site URL here, e.g., https://health-hub-7c64c.web.app/]

## 🔑 Admin Credentials
**Admin Email:** `mdrafiqulakhter0@gmail.com` (Replace with your actual admin email)
**Admin Password:** `123456` (Replace with your actual admin password)

**Seller Email:** `seller@healthhub.com` (Replace with your actual seller email)
**Seller Password:** `seller123` (Replace with your actual seller password)

---

## ✨ Features of HealthHub Express

HealthHub Express is a cutting-edge multi-vendor e-commerce platform designed for selling medicines and healthcare products, built with the MERN stack. It offers a seamless and secure experience for buyers, sellers, and administrators.

* **Robust User Authentication:** Secure user registration and login, including social login options (Google & GitHub) for quick access. Users can register as either buyers or sellers.
* **Dynamic Product Catalog:** Explore a vast range of medicines and healthcare products, organized by categories (tablet, syrup, capsule, injection, others).
* **Intuitive Shopping Cart:** Easily add, remove, and update quantities of items in your cart. Cart data persists across browser sessions using `localStorage`.
* **Secure Checkout & Payments:** A streamlined checkout process integrated with Stripe for secure and efficient online payments.
* **Printable Invoices:** After successful payment, users receive a detailed and printable invoice for their purchases.
* **Comprehensive Admin Dashboard:**
    * **User Management:** Admins can manage all users, promoting users to sellers/admins or downgrading sellers to regular users.
    * **Category Management:** Add, update, or delete medicine categories.
    * **Payment Management:** Track and manage all pending and paid payments, with the ability to accept pending payments.
    * **Sales Report:** Generate and filter detailed sales reports by date range, with export options (PDF/CSV/XLSX).
    * **Banner Advertisement Control:** Admins control which medicines are featured on the homepage slider banner.
* **Empowering Seller Dashboard:**
    * **Medicine Management:** Sellers can add, view, and manage all their listed medicines.
    * **Sales Insights:** View total sales revenue for their own products, distinguishing between paid and pending payments.
    * **Advertisement Requests:** Sellers can request their products to be featured on the homepage banner.
* **Personalized User Dashboard:** Buyers can easily view their complete payment history and transaction statuses (pending/paid).
* **Responsive Design:** Optimized for a seamless user experience across all devices – mobile, tablet, and desktop views, including responsive dashboards.
* **Data Fetching with TanStack Query:** Efficient and robust data fetching implemented using TanStack Query (React Query) for all GET methods, enhancing performance and caching.
* **Enhanced User Feedback:** All CRUD operations, successful authentications, and other critical user interactions are accompanied by clear sweet alerts/toasts/notifications.
* **Secure Environment Variables:** All sensitive API keys and credentials (Firebase config, MongoDB) are securely managed using environment variables.
* **Persistent User Sessions:** Users remain logged in even after page reloads on private routes, providing a smooth and uninterrupted Browse experience.

---

## 🛠️ Technologies Used

* **Frontend:** React.js, React Router, React Hook Form, TanStack Query, React Helmet, react-hot-toast, Swiper.js, Stripe.js
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Authentication:** Firebase Authentication
* **Image Hosting:** ImgBB
* **Styling:** Tailwind CSS (or similar utility-first CSS framework)

---

## 🚀 Getting Started

To run this project locally, follow these steps:

1.  **Clone the repositories:**
    ```bash
    git clone [Your Client-Side GitHub Repo URL]
    cd [your-client-repo-folder]

    git clone [Your Server-Side GitHub Repo URL]
    cd [your-server-repo-folder]
    ```

2.  **Install dependencies (Client-Side):**
    ```bash
    cd [your-client-repo-folder]
    npm install
    # or
    yarn install
    ```

3.  **Create `.env` file (Client-Side):**
    In the root of your client-side folder, create a `.env` file and add your Firebase config and ImgBB API key:
    ```
    VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
    VITE_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
    VITE_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
    VITE_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
    VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
    VITE_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
    VITE_image_upload_key=YOUR_IMGBB_API_KEY
    VITE_STRIPE_PUBLISHABLE_KEY=YOUR_STRIPE_PUBLISHABLE_KEY
    VITE_API_URL=https://server-mauve-seven.vercel.app
    ```

4.  **Install dependencies (Server-Side):**
    ```bash
    cd [your-server-repo-folder]
    npm install
    # or
    yarn install
    ```

5.  **Create `.env` file (Server-Side):**
    In the root of your server-side folder, create a `.env` file and add your MongoDB URI and Stripe Secret Key:
    ```
    DB_USER=YOUR_MONGODB_USERNAME
    DB_PASS=YOUR_MONGODB_PASSWORD
    DB_URI=YOUR_MONGODB_CONNECTION_STRING
    PORT=5000
    STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY
    ```

6.  **Run the server:**
    ```bash
    cd [your-server-repo-folder]
    npm start # or your equivalent command
    ```

7.  **Run the client:**
    ```bash
    cd [your-client-repo-folder]
    npm run dev # or your equivalent command
    ```

---

## 🤝 Contribution

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

---

## ✉️ Contact

For any inquiries, please reach out to:
[Your Name/Email]

---