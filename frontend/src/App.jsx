import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Dashboard } from './pages/Dashboard'
import { SendMoney } from './pages/SendMoney'
import { Toaster } from 'react-hot-toast'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/signin' replace></Navigate>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/signin' element={<Signin></Signin>}></Route>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
        <Route path='/transfer' element={<SendMoney></SendMoney>}></Route>
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </BrowserRouter>
  )
}

export default App
