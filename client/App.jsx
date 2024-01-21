import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppProvider from './utils/AppProvider';
import ModalProvider from './utils/ModalProvider';
import { Header, ProtectedRoute } from './components';
import { HomePage, AuthPage, Logout, Dashboard, AddGoal, NotFound } from './pages/'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Homepage.css'
import './css/AddGoal.css'
import './css/AuthPage.css'
import "./css/Dashboard.css"

export default function App() {

  return (
    <AppProvider>
      <ModalProvider>
        <BrowserRouter>
          <>
            <div className="">
              <div className='header-container'>
                <Header className="header" />
              </div>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />

                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />

                <Route path="/addgoal" element={<AddGoal />} />

                <Route path="/logout" element={<Logout />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>

          </>
        </BrowserRouter>
      </ModalProvider>
    </AppProvider>
  )
}
