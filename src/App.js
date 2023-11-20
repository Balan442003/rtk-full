import React from 'react'
import Listuser from './Components/Listuser/Listuser';
import Register from './Components/Register/Register'
import { Route, Routes, useParams } from "react-router-dom"
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import Update from './Components/Update/Update';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import { Navigate } from 'react-router-dom';
import Errorpage from './Components/Erropage/Errorpage';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const PrivateRoute = ({ component }) => {
    const loguser = localStorage.getItem('LoggedUserToken')
    //(Condition:If user login then only show privateroute pages otherwise not) 
    if (loguser) {
      return component
    } else {
      return <Navigate to='/login' />
    }
    //Ending Condition
  }

  const PrivateRouter = ({ components }) => {

    const loguser = localStorage.getItem('LoggedUserToken')
    //(Condition:If user login then only show privateroute pages otherwise not) 
    if (loguser) {
      return <Navigate to='/Dashboard' />
    }
    else {
      return components
    }
    //Ending Condition
  }
  return (
    <div>
      <Header />
      <Routes>
        {/* <Route path='/' element={<App />} /> */}
        <Route path='/login' element={<PrivateRouter components={<Login />} />} />
        <Route path='/' element={<Listuser />} />
        <Route path='/Register' element={<PrivateRouter components={<Register />} />} />
        <Route path='/Dashboard' element={<PrivateRoute component={<Dashboard />} />} />
        <Route path='/Edituser/:id' element={<Update />} />
        <Route path="/*" element={<Errorpage />} />

      </Routes>
      <Footer />
    </div>
  )
}

export default App
