# MindVault: Your Brain's Best Friend

![AI Chat Component](/src/assets/images/Mindvault-screenshot-chat-component.png)

## About the Project

**MindVault** is an AI-powered study flashcard app designed to help users **retain knowledge effectively** by converting conversations with an AI to **flashcards**. The project showcases **React, Firebase, OpenAI API**, and modern frontend development best practices.

### Key Features

- **AI-Powered Flashcard Creation** - Chat with AI and generate concise flashcards automatically.
- **Manual Flashcard Creation** - Create and organize your own flashcards with custom tags.
- **Study Mode** - Flip through flashcards, test your memory, and review your progress.
- **Search & Filter** - Quickly find flashcards using keyword search and tag filters.
- **User Authentication** - Secure login via **Google** or **Email/Password** with Firebase Authentication.
- **Firestore Integration** - Persistent storage for user flashcards.
- **Modern UI & Responsive Design** - Clean, intuitive interface built with **Tailwind CSS**.

![MindVault Screenshot](/src/assets/images/Mindvault-screenshot-modal.png)

---

## Tech Stack

- **Frontend**: React, React Router, Tailwind CSS
- **Backend**: Firebase Authentication, Firestore
- **AI Integration**: OpenAI API (GPT-powered assistant for flashcard creation)

## MVP User Workflow

1. **Login/Register** - Users sign in with Google or Email/Password.
2. **Create Flashcards** - Add flashcards manually or via AI-powered chat.
3. **Study Mode** - Flip through flashcards and track study progress.
4. **Search & Filter** - Easily find flashcards based on tags or keywords.
5. **Progress Dashboard** - Users can view total flashcards and study insights.

## Project Status

MindVault is currently in **active development**. Key functionalities are implemented, and **deployment is planned soon**. The project serves as a **portfolio piece** showcasing modern React and Firebase development.

## Future Enhancements

- **Spaced Repetition Algorithm** to optimize review scheduling.
- **Quiz Mode** - AI-generated multiple-choice questions based on past study sessions.
- **Progress Analytics** - Detailed insights on study habits and performance.
- **Dark Mode** - Enhanced UI experience for night-time studying.

---

## Project Structure

```
MindVault/
│-- src/
│   ├── components/         # Global UI components (Buttons, Navigation, etc.)
│   ├── pages/              # App pages (Home, Dashboard, Study Mode, Login) and page-specific components
│   ├── context/            # Global authentication context
│   ├── api/                # API calls (OpenAI, Firebase interactions)
│   ├── firebase.js         # Firebase config & initialization
│-- public/                 # Static assets
│-- package.json            # Dependencies & scripts
│-- README.md               # This file
```

## Installation & Setup

> **Note**: The project is not yet deployed. To run locally:

### 1. Clone the Repository

```sh
git clone https://github.com/ameliagoodson/mindvault.git
cd mindvault
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Set Up Firebase

- Create a `.env` file and add your **Firebase API keys** (check `firebase.js`).

### 4. Start Development Server

```sh
npm run dev
```

---

## Acknowledgments

- **OpenAI API** for AI-powered flashcard generation.
- **React & Firebase** for powering the app's frontend and backend.
- **Tailwind CSS** for clean and modern UI styling.

### Developed by **Amelia Goodson**

[Portfolio](https://ameliagoodson.com) | [GitHub](https://github.com/ameliagoodson)
