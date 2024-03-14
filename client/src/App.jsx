import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppProvider from './utils/AppProvider';
import { Header, ProtectedRoute } from './components';
import { HomePage, Dashboard, AddGoal, Profile, NotFound } from './pages/'

export default function App() {

  return (
    <AppProvider>
      <BrowserRouter>
        <div className='flex flex-col min-h-screen '>

          <div className='header-container'>
            <Header className="header" />
          </div>
          <div className="flex flex-1 flex-col items-center justify-center">

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
          </div>
            <footer className="flex justify-center items-center p-4 text-center  w-full">&copy; 2023-2024 SBS Development Group</footer>
        </div>
      </BrowserRouter>
    </AppProvider>
  )
}
