import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppProvider from './utils/AppProvider';
import { Header, ProtectedRoute } from './components';
import { HomePage, Dashboard, AddGoal, Profile, NotFound } from './pages/'

export default function App() {

  return (
    <AppProvider>
      <BrowserRouter>
        <div className="">
          <div className='header-container'>
            <Header className="header" />
          </div>

          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            <Route path="/addgoal" element={<AddGoal />} />

            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <footer className="footer flex justify-center p-4 text-center">&copy; 2023-2024 SBS Development Group</footer>
        </div>
      </BrowserRouter>
    </AppProvider>
  )
}
