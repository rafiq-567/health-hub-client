import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router";
import { router } from './router/router.jsx';
import AuthProvider from './contexts/AuthContext/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from './contexts/CartContext.jsx';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className='font-urbanist max-w-7xl mx-auto'>
        <CartProvider>
          <AuthProvider>

            <RouterProvider router={router} />
            <Toaster />
          </AuthProvider>
        </CartProvider>
      </div>
    </QueryClientProvider>
  </StrictMode>,
)
