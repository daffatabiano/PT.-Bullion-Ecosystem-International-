# Bullion Web Developer Test Case - Frontend

## Duration
**3 Work Days**

---

## 🔗 Source

### 🎨 Figma Design
[Figma Link](https://www.figma.com/design/IpbHJzL4pX9DD42uqH7HfE/Bullion-Test-Case---Web-Developer?node-id=5-2401&t=M5Y2ogoUYb2HmeBt-1)

### 📬 API Documentation (Postman)
[Postman Link](https://documenter.getpostman.com/view/22800527/2s9YC4Ts2L#28c9fedc-2602-4ff9-a242-2c6cb605411e)

**Base URL**: `https://api-test.bullionecosystem.com`

**Admin Credentials**:
- Email: `admin@email.com`
- Password: `admin123`
- Encrypted using SHA-256

---

## 🚀 Requirement
- Javascript Framework (React preferred)

---

## ✅ Features to Implement

### 1. 🔐 Login Page
- [x] UI sliced from Figma
- [x] Integrate Login API
- [x] Form validation:
  - Email
    - Required
    - Must be a valid email format
  - Password
    - Required
    - Minimum 8 characters

### 2. 📝 Register Page
- [x] UI sliced from Figma
- [x] Integrate Register API
- [x] Form validation:
  - First Name (Required)
  - Last Name (Required)
  - Gender (Required)
  - Date of Birth (Required)
  - Email (Required, valid format)
  - Phone Number (Required)
  - Address (Required)
  - Photo Profile
    - Required
    - Max size: 5MB
    - Format: JPG/JPEG
  - Password
    - Required
    - Minimum 8 characters
    - Must contain letters and numbers
    - At least 1 capital letter
  - Confirm Password
    - Required
    - Must match Password

### 3. 🧾 Dashboard (Admin)
- [x] UI sliced from Figma
- [x] Integrate API to get users list

### 4. ✏️ Edit Profile
- [x] UI sliced from Figma
- [x] Integrate API to get user detail (`/api/v1/admin/:id`)
- [x] Integrate API to update user (`/api/v1/admin/:id/update`)

---

## 🎯 Expected Outcome

- Admin can log in using provided credentials.
- Admin can register new users with proper validation.
- Admin can view a list of registered users.
- Admin can see photo profiles of registered users.
- Admin can view and edit user details.

---

## 🛠 Tech Stack

- React (Vite / CRA)
- Ant Design (UI Framework)
- Axios (API requests)
- TailwindCSS (Styling)
- DayJS (Date formatting)

---

## 📁 Project Setup

```bash
npm install
npm run dev
```

> Make sure you have `.env` file with API base URL:
```env
VITE_API_BASE_URL=https://api-test.bullionecosystem.com
```