import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

// Lazy load pages for better performance
const Login = lazy(() => import('./pages/Login'));
const Billing = lazy(() => import('./pages/Billing'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading...</p>
          </div>
        </div>
      }>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/billing" element={
            <PrivateRoute>
              <Billing />
            </PrivateRoute>
          } />
          <Route path="/" element={<Navigate to="/billing" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
