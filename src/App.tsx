import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import RoleGuard from './components/RoleGuard';
import Signup from './pages/Register';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={['Admin']}>
                <div>Admin Page</div>
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/unauthorized"
          element={
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h1>Unauthorized</h1>
              <p>You don't have permission to access this page.</p>
            </div>
          }
        />

        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
