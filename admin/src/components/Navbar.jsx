import React from 'react'
import {Logo} from './Logo.jsx'
export const Navbar = () => {
  return (
    <div className='flex justify-between items-center pl-2 pr-2'>
      <Logo/>
      <div className='h-10 w-10 rounded-full bg-purple-600'>
           
      </div>
    </div>
  )
}
