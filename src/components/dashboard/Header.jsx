import React from 'react'
import {Profile} from '../';

function Header() {

  return (
    <header className='flex p-3 items-center gap-5 justify-end bg-gray-100'>

        <Profile/>

    </header>
  )
}

export default Header