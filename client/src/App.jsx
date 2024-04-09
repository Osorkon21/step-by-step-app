import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppProvider from './utils/AppProvider';
import { Header, ProtectedRoute } from './components';
import { HomePage, Profile, NotFound } from './pages/'
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend"

export default function App() {

  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <AppProvider>
        <BrowserRouter>
          <div className='flex flex-col min-h-screen '>

            <div className='header-container'>
              <Header className="header" />
            </div>
            <div className="flex flex-1 flex-col items-center">

              <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <footer className="flex flex-col justify-center items-center p-4 text-center w-full">
              <p>We use ChatGPT, which can make mistakes. Consider checking important information.</p>
              <p>&copy; 2023-2024 UpwardArc Development Group</p>
            </footer>
          </div>
        </BrowserRouter>
      </AppProvider>
    </DndProvider>
  )
}
