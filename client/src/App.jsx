import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import MyFooter from './components/MyFooter'


//import { Flowbite } from 'flowbite-react';
<App />


function App() {

  return (
    <>
      <Navbar/>
      <div className='min-h-screen'>
         <Outlet/>
      </div>
      <MyFooter />
    </>
  )
}

export default App
