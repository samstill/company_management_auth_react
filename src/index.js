import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from '@harshitpadha/themes'; // Import the custom ThemeProvider
import './index.css'; // Ensure the global styles are loaded

// Render the application and wrap it with ThemeProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
