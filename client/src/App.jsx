import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppProvider from './utils/AppProvider';
import { Header, HelloUser, ProtectedRoute } from './components';
import { HomePage, Dashboard, AddGoal, NotFound } from './pages/'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './css/Homepage.css'
// import './css/AddGoal.css'
// import './css/AuthPage.css'
// import "./css/Dashboard.css"

export default function App() {

  return (
    <AppProvider>
      <BrowserRouter>
        <>
          <div className="">

            <div className='header-container'>
              <Header className="header" />
            </div>
            <HelloUser />

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/addgoal" element={<AddGoal />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <footer className="footer flex justify-center p-4 text-center">&copy; 2023 SBS Development Group</footer>
          </div>

        </>
      </BrowserRouter>
    </AppProvider>
  )
}
