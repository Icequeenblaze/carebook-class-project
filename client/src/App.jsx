import './App.css'
import { Routes, Route, Navigate, Outlet} from "react-router-dom"
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import ResetPassword from './pages/ResetPassword'
import ForgotPassword from './pages/ForgotPassword'
import HomePage from './pages/home'
import DoctorProfile from './pages/DoctorProfile'
import PatientDashboard from './pages/dashboards/PatientDashboard'
import DoctorDashboard from './pages/dashboards/DoctorDashboard'
import AdminDashboard from './pages/dashboards/DoctorDashboard'
import DashboardLayout from './pages/dashboards/layout/DashboardLayout'
import { useAuth } from './context/AuthContext'
import  ProtectedRoute  from "./components/ProtectedRoute"


function DashboardRedirect() {
  const { user } = useAuth();
  return <Navigate to={`/${user.role}`} replace />;
}

function PuclicLayout() {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

function App() {

  return (
    <>


      <Routes>
        {/* Wrap public pages with the shared Header and Footer components */}
        <Route element={<PuclicLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          {/* Requires sign-in, then redirects the user to their role dashboard */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardRedirect />} />
          </Route>

          {/* Restricts payment returns and receipts to signed-in patients. */}
          <Route element={<ProtectedRoute roles={['patient']} />}>

          </Route>
          <Route path='/*' element={<NotFound />} />
        </Route>

        {/* Restrict all patient dashboard pages to users with the patient role. */}
        <Route element={<ProtectedRoute roles={['patient']} />}>
        <Route path='/patient' element={<DashboardLayout role='patient' />}>
        </Route>

        </Route>
         {/* Restrict all patient dashboard pages to users with the doctor role. */}
        <Route element={<ProtectedRoute roles={['doctor']} />}>
        <Route path='/doctor' element={<DashboardLayout role='doctor' />}>
        </Route>

        </Route>
         {/* Restrict all patient dashboard pages to users with the doctor role. */}
        <Route element={<ProtectedRoute roles={['admin']} />}>
        <Route path='/admin' element={<DashboardLayout role='admin' />}>
        </Route>

        </Route>
      </Routes>

    </>
  )
}

export default App 