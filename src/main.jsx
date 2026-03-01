import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        gutter={12}
        containerStyle={{
          top: 80,
          right: 16,
        }}
        toastOptions={{
          duration: 3500,
          style: {
            background: 'var(--card)',
            color: 'var(--text)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '14px 20px',
            fontSize: '0.92rem',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: '500',
            boxShadow: '0 8px 24px rgba(22, 163, 74, 0.12)',
            maxWidth: '380px',
          },
          success: {
            iconTheme: {
              primary: '#16a34a',
              secondary: '#ffffff',
            },
            style: {
              borderLeft: '4px solid #16a34a',
            },
          },
          error: {
            iconTheme: {
              primary: '#dc2626',
              secondary: '#ffffff',
            },
            style: {
              borderLeft: '4px solid #dc2626',
            },
          },
          loading: {
            iconTheme: {
              primary: '#0d9488',
              secondary: '#ffffff',
            },
            style: {
              borderLeft: '4px solid #0d9488',
            },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);