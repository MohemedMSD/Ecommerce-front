import React from 'react'
<<<<<<< HEAD
import {Profile} from '../';
=======
import { FaHome } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import {Notification, Profile} from '../';
>>>>>>> ee0fb04978010731a65b7449f0c0472299446185

function Header() {

  return (
    <header className='flex p-3 items-center gap-5 justify-end bg-gray-100'>
      

        <Profile/>

    </header>
  )
}

export default Header