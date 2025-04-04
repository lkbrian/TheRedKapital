# Vite TypeScript React Project

## Overview
This project is built using **Vite** with **TypeScript** and **React**, ensuring a fast and efficient development experience. It integrates both **Tailwind CSS** and **vanilla CSS**, providing flexibility in styling. The application is configured with **EmailJS** to send emails seamlessly and includes a chatbot powered by **Firebase** for real-time interactions.

## Features
- **Vite + TypeScript + React**: A modern frontend stack for a highly optimized and developer-friendly experience.
- **Tailwind CSS & Vanilla CSS**: Combines utility-based styling with custom CSS for greater control over design.
- **EmailJS Integration**: Enables sending emails directly from the frontend without requiring a backend.
- **Firebase Chatbot**: A chatbot powered by Firebase, offering real-time messaging capabilities.

## Installation
To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   ```

2. **Navigate to the project folder:**
   ```sh
   cd project-folder
   ```

3. **Install dependencies:**
   ```sh
   npm install
   ```

4. **Start the development server:**
   ```sh
   npm run dev
   ```

## Configuration

### EmailJS Setup
To enable email functionality, configure EmailJS by following these steps:
1. Create an account on [EmailJS](https://www.emailjs.com/).
2. Obtain your **Service ID**, **Template ID**, and **User ID**.
3. Store them in an environment file (`.env`):
   ```sh
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_USER_ID=your_user_id
   ```

### Firebase Chatbot Setup
To integrate Firebase for real-time chatbot communication:
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Enable Firestore and configure authentication if needed.
3. Add your Firebase config to the `.env` file:
   ```sh
   VITE_FIREBASE_API=your_api_key
   VITE_FIREBASE_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

## Usage
- The **email feature** allows users to send messages directly via EmailJS without requiring a backend.
- The **chatbot** interacts with users in real-time using Firebase, making conversations dynamic and responsive.
- The **styling** leverages Tailwind CSS for rapid UI development while allowing custom styling through vanilla CSS.

## Deployment
To build the project for production, run:
```sh
npm run build
```
For deployment, you can use platforms like **Vercel**, **Netlify**, or any static hosting provider that supports Vite projects.

## License
This project is licensed under the [MIT License](LICENSE).

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request if you have any suggestions or improvements.

---
This project leverages modern web technologies to provide a seamless user experience with email functionality and chatbot integration. Happy coding! 🚀

