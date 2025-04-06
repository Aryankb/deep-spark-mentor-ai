
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App.tsx';
import './index.css';

// Import your Clerk publishable key
// In development, we can use a fallback key if the environment variable isn't set
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_development-key';

// Check that there's a key available
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

// For development environment, silence the console warning about using a test key
if (PUBLISHABLE_KEY === 'pk_test_development-key') {
  console.warn('Using development Clerk key. Please set VITE_CLERK_PUBLISHABLE_KEY in your .env file for production.');
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <App />
  </ClerkProvider>
);
