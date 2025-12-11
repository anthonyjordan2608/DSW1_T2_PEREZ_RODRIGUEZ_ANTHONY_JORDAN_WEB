# React + TypeScript + Vite

Library Management System - Frontend
A modern web application for library management built with React, TypeScript, and Vite.

https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white

🚀 Live Demo
Frontend: https://github.com/anthonyjordan2608/DSW1_T2_PEREZ_RODRIGUEZ_ANTHONY_JORDAN_WEB.git

Backend API: https://github.com/anthonyjordan2608/DSW1_T2_PEREZ_RODRIGUEZ_ANTHONY_JORDAN_API.git


 Features
 Book Management - Add, edit, delete, and search books

 User Management - Member registration and profiles

 Loan System - Track book loans and returns

 Authentication - Secure login and session management

 Responsive Design - Works on desktop, tablet, and mobile

 Modern UI - Clean interface with Tailwind CSS

 Tech Stack
Tecnología	Uso
React 18	UI Framework
TypeScript	Type Safety
Vite	Build Tool & Dev Server
React Router	Client-side Routing
Axios	HTTP Client
Tailwind CSS	Styling
React Hook Form	Form Management
React Query	Server State Management

 Installation
Prerequisites
Node.js 18+

npm 9+ or yarn 1.22+

Setup
bash
# 1. Clone repository
git clone https://github.com/anthonyjordan2608/DSW1_T2_PEREZ_RODRIGUEZ_ANTHONY_JORDAN_WEB.git
cd library-frontend

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# Edit .env.local with your API URL

# 4. Run development server
npm run dev


 Environment Variables
Create a .env.local file:

env
VITE_API_URL=http://localhost:3000/api
VITE_APP_TITLE="Library Management System"
# For production:
# VITE_API_URL=https://your-backend-api.com/api


Project Structure

src/
├── components/     # Reusable UI components
│   ├── BookCard.tsx
│   ├── Navbar.tsx
│   └── SearchBar.tsx
├── pages/         # Page components
│   ├── Home.tsx
│   ├── Books.tsx
│   └── Loans.tsx
├── services/      # API services
│   └── api.ts
├── types/         # TypeScript interfaces
│   └── index.ts
├── utils/         # Utility functions
├── App.tsx        # Main App component
└── main.tsx       # Entry point

Available Scripts
bash
# Development
npm run dev        # Start dev server (localhost:5173)

# Build
npm run build      # Create production build
npm run preview    # Preview production build locally

# Code Quality
npm run lint       # Run ESLint
npm run format     # Format code with Prettier

# Type checking
npm run type-check # Check TypeScript types


API Integration
The frontend communicates with a RESTful backend. Example endpoints:

Endpoint	Method	Description
/api/books	GET	Get all books
/api/books/:id	GET	Get book by ID
/api/loans	POST	Create new loan
/api/users/register	POST	Register user
Example request:

typescript
// Fetch all books
const { data: books } = await axios.get(`${import.meta.env.VITE_API_URL}/books`);

UI Components Preview
Book List: Grid view with search and filter

Loan Form: Modal with date picker

User Dashboard: Statistics and quick actions

Admin Panel: Management tools (protected route)

Deployment
Vercel (Recomendado o Opcional)

# Connect your GitHub repository to Vercel
# Set environment variables in Vercel dashboard
# Automatic deployment on push to main

Manual Build

npm run build
# Upload 'dist' folder to your hosting

Contributing
Fork the project

Create a feature branch (git checkout -b feature/AmazingFeature)

Commit changes (git commit -m 'Add AmazingFeature')

Push to branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
This project is licensed under the MIT License - see LICENSE file.

Author
Anthony Jordan Pérez Rodríguez

GitHub: @anthonyjordan2608

Universidad: CIBERTEC

Curso: Desarrollo de Servicios Web I

Acknowledgments (Agradecimientos)

CIBERTEC Faculty

CHRISTIAM ALBERTH MENDOZA RUIZ (DOCENTE)

React & Vite communities

Open source library projects

