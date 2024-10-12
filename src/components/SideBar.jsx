import {React, useState} from 'react'
import { FaAngleRight } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineMenu } from 'react-icons/md';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { links } from '../assets/constants/links';
import {Logo} from './../assets/constants/logos'

const NavLinks = ({ hundelClick }) => {

  const [open, setOpen] = useState(false)

  const location = useLocation()

  const Click = () => {
    hundelClick()
    setOpen(false)
  }

  return (
    <div className="mt-7 px-6 lg:px-0 lg:w-[86%]">
      
      {
        links.map((link, i) => (

            <NavLink
              key={i}
              className={`flex flex-row justify-start items-center
                ${location.pathname.split('/')[2] === 'evenements' && link.name == 'Activités' ? 'text-second' : 'text-gray-200'}
                my-8 text-base font-medium hover:text-second`}
              to={link.to}
              onClick={hundelClick && (() => Click())}
            >
              <span>{link.icon}</span><p className='text-[18px]'>{link.name}</p>
            </NavLink>

        ))
      }
    </div>
  )
}; 

const SideBar = () => {

  const [mobileMenuOpen, setmobileMenuOpen] = useState(false);

  const hundelClickIN = () => {
    setmobileMenuOpen(false);
  };

  return (
    <div>
      <div className="lg:flex hidden flex-col h-full items-center py-7 px-4 w-[250px] bg-gradient-to-tl from-green-900 to-[#131412] ">
        <Link
          className="flex flex-col max-h-[100px] max-w-[150px] items-center ml-[-12px]"
          to="/dashboard"
        >
          <img src={Logo} className='w-full mt-5 h-full' />

        </Link>

        <NavLinks hundelClick={() => hundelClickIN()} />
      </div>

      <div className="absolute top-[1.1rem] left-2 lg:hidden block z-1">
        {!mobileMenuOpen && (
          <button
            onClick={() => setmobileMenuOpen(true)}
            className="h-6 w-6 text-black mr-2 cursor-pointer z-10"
          ><MdOutlineMenu fontSize={25}/></button>
        ) }
      </div>

      <div
        className={`absolute top-0 h-full w-full sm:w-2/4 bg-gradient-to-tl from-green-900 to-[#131412]
        z-50 backdrop-blur-lg lg:hidden smooth-transition ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <div className='flex justify-between p-6 border-b '>

          <Link to="/dashboard">
            <p className="font-bold text-center tracking-md text-xl md:text-2xl ml-2 mt-[-4px] text-gray-100">
              Gite Dar RIHANA
            </p>
          </Link>
          {
            mobileMenuOpen && (
              <button
                onClick={() => setmobileMenuOpen(false)}
                className="h-6 w-6 text-[24px] text-gray-200 mr-2 cursor-pointer z-10"
              ><IoMdClose/></button>
            )
          }
        </div>

        <NavLinks hundelClick={() => hundelClickIN()} />
        

      </div>

    </div>
  )
}

export default SideBar