import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'

// pages
import Dashboard from './pages/dashboard/Dashboard'
import Create from './pages/create/Create'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Project from './pages/project/Project'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { useAuthContext } from './hooks/useAuthContext'
import AllUsers from './components/AllUsers'

function App() {

  const { authIsReady, user } = useAuthContext()

  return (
    <div className="flex">
      {authIsReady && <BrowserRouter>
        {user && <Sidebar />}
        <div className="container grow py-0 px-16">
          <Navbar />
          <Routes>
            <Route path='/' element={user ? <Dashboard /> : <Navigate to='/login' />} />
            <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
            <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
            <Route path='/create' element={user ? <Create /> : <Navigate to='/login' />} />
            <Route path='/projects/:id' element={user ? <Project /> : <Navigate to='/login' />} />
          </Routes>
        </div>
        {user && <AllUsers />}
      </BrowserRouter >}
    </div >
  );
}

export default App;
