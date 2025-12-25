# Phone Authentication Web Application

A modern phone number-based authentication system built with React, TypeScript, and Firebase. This application provides seamless OTP verification, user registration, and secure access control.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=flat&logo=firebase&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

---

## Features

- Phone number authentication with OTP verification
- Real-time phone number validation
- Automatic login for returning users
- User registration flow for new users
- Protected routes for authenticated users
- Secure logout functionality
- Global state management with Redux Toolkit
- Responsive UI based on Figma design
- Form validation with React Hook Form

---

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS |
| **State Management** | Redux Toolkit |
| **Authentication** | Firebase Phone Authentication |
| **Database** | Firebase Firestore |
| **Form Validation** | React Hook Form |

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

#### Step 1: Install Dependencies

```bash
npm install
```

#### Step 2: Firebase Configuration

1. Navigate to [Firebase Console](https://console.firebase.google.com/)
2. Create a new Firebase project or select an existing one
3. Enable Phone Authentication:
   - Go to Authentication → Sign-in method → Phone
4. Add a Web App and copy the Firebase configuration
5. Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

#### Step 3: Configure Test Phone Number

For development and testing purposes, configure a test phone number in Firebase Console:

- **Phone Number:** `1234567890`
- **OTP Code:** `123456`

**Configuration Path:** Authentication → Sign-in method → Phone → Test phone numbers

---

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at: `http://localhost:5173`

### Production Build

```bash
npm run build
```

Production-ready files will be generated in the `dist` directory.

---

## Application Flow

The authentication flow consists of four main screens:

### 1. Login Screen
- User enters a valid 10-digit phone number
- OTP is sent via Firebase Phone Authentication

### 2. OTP Verification Screen
- User enters the 6-digit OTP received
- System validates the OTP
- Existing users are redirected to the Home screen
- New users are redirected to the Registration screen

### 3. Registration Screen
- New users provide their name and email address
- Users must accept terms and conditions
- User data is securely stored in Firebase Firestore

### 4. Home Screen
- Displays the authenticated user's phone number
- Provides logout functionality

---

## Project Structure

```
src/
├── components/
│   ├── Login.tsx
│   ├── Otp.tsx
│   ├── Register.tsx
│   └── Home.tsx
├── features/
│   └── auth/
│       ├── authSlice.ts
│       └── authThunk.ts
├── hooks/
│   └── reduxHooks.ts
├── services/
│   └── firebase.ts
├── routes/
│   └── AppRoutes.tsx
├── App.tsx
├── main.tsx
└── index.css
```

---

## Security Considerations

- Firebase Phone Authentication provides secure user verification
- reCAPTCHA verification is handled internally by Firebase
- Firestore database access is restricted to authenticated users only
- Client-side validation prevents submission of invalid data
- Environment variables protect sensitive Firebase credentials
- Authentication state is managed securely through Redux Toolkit

---

## Additional Notes

- Firebase test phone numbers are configured for development and testing
- Authentication state persists across browser refresh
- The user interface is fully responsive and implements the provided Figma design
- The application follows clean architecture principles with clear separation of concerns

---

## License

This project was developed as part of a technical assessment.

---


## Author

Nishad Koormath - [GitHub Profile](https://github.com/yourusername)

---

## Acknowledgments

- Firebase for authentication and database services
- Tailwind CSS for utility-first styling framework
- Redux Toolkit for efficient state management
- React and TypeScript communities for excellent documentation

---

**Built with React, TypeScript, and Firebase**
