import React from 'react'
import {Navbar} from './components/Navbar.jsx'
import {Sidebar} from './components/Sidebar.jsx'
import {Routes,Route} from 'react-router-dom'
import{Add} from './pages/Add.jsx'
import {List} from './pages/List.jsx'
import {Order} from './pages/Order.jsx'
import { ToastContainer } from 'react-toastify';

 const App = () => {
  const url = "https://myfood-backend-fngt.onrender.com";
  return (
   <div>
    <ToastContainer/>
    <Navbar/>
    <hr />
    <div className='flex'>
    <Sidebar/>
    <Routes>
      <Route path="/" element={<div>Welcome Home</div>} />
     <Route path="/add" element={<Add url={url}/>}/>
      <Route path="/list" element={<List url={url}/>}/>
       <Route path="/order" element={<Order url={url}/>}/>
    </Routes>
     
    </div>
   
   </div>
  )
}
export default App;
