import Vite from './modules/Vite/Vite.tsx'
import Homepage from './modules/homepage/Homepage.tsx';
import Login from './modules/login/Login.tsx';
import Register from './modules/register/Register.tsx';
import MainLayout from "./layouts/MainLayout.tsx";
import ForgotPassword from './modules/forgot-password/ForgotPassword.tsx';
import Logout from './modules/logout/Logout.tsx';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {

  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/vite" element={<Vite />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Homepage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
