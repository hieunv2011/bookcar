import { EuiProvider } from '@elastic/eui';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import LessonList from './pages/LessonList';
import LessonDetail from './pages/LessonDetail';

function App() {
  return (
    <div className="App">
      <EuiProvider colorMode="light"> 
        <Router>
          <Routes>
            {/* Routes without MainLayout */}
            <Route path="/" element={<Login />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            {/* Routes with MainLayout */}
            <Route element={<MainLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/lesson-list" element={<LessonList />} />
              <Route path="/lesson-detail" element={<LessonDetail />} />
            </Route>
          </Routes>
        </Router>
      </EuiProvider>
    </div>
  );
}

export default App;
