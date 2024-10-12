import React from 'react'
import {Outlet} from 'react-router-dom'
<<<<<<< HEAD
=======
import { NavBar } from '../../components'
>>>>>>> ee0fb04978010731a65b7449f0c0472299446185
import { useStateContext } from '../../context/StateContext';

const Auth = () => {
	const { user } = useStateContext();

  if (user && !user.verified_at) {
    window.location.href = "/auth/send-verification-code"
  }

  return (
    <div className='px-2 sm:px-4'>
<<<<<<< HEAD
=======
      <header>
        <NavBar />
      </header>
>>>>>>> ee0fb04978010731a65b7449f0c0472299446185
      <main className='max-w-[1543px] m-auto w-full'>
        <Outlet />
      </main>
    </div>
  )
}

export default Auth