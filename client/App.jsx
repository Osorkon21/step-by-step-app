import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppProvider from './utils/AppProvider';
import { Header, ProtectedRoute } from './components';
import { HomePage, AuthPage, Logout, Dashboard, AddGoal, NotFound, CompletedGoals } from './pages/'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/HomePage.css'
import './css/AddGoal.css'
import './css/AuthPage.css'

export default function App() {

  return (
    <AppProvider>
      <BrowserRouter>
        <Header />
        <div className="container pt-5">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />

            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            <Route path="/addgoal" element={
              <ProtectedRoute>
                <AddGoal />
              </ProtectedRoute>
            } />

            <Route path="/completedgoals" element={
              <ProtectedRoute>
                <CompletedGoals />
              </ProtectedRoute>
            } />

            <Route path="/logout" element={<Logout />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  )
}
