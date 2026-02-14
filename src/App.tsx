import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { PortfolioProvider } from '@/context/PortfolioContext';
import PublicLayout from '@/components/PublicLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import Home from '@/pages/Home';
import Portfolio from '@/pages/Portfolio';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';

export function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/login" element={<Login />} />
            </Route>

            {/* Protected Admin Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </PortfolioProvider>
    </AuthProvider>
  );
}
