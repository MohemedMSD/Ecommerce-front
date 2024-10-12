import React, { useState } from 'react'
import { BiLogOut, BiPurchaseTag, BiUser } from 'react-icons/bi';
import { IoIosNotifications, IoLogoGameControllerA, IoMdCloseCircleOutline, IoMdDesktop, IoMdHome, IoMdLogOut, IoMdSettings } from 'react-icons/io'
import { Navigate, NavLink } from 'react-router-dom';
import Axios from '../assets/constants/axios/axios';
import { useStateContext } from '../context/StateContext';
import { ProfileM } from './';

const Profile = () => {
    const {setUser, user} = useStateContext()
    const [ShowProfileMenu, setShowProfileMenu] = useState(false);
    const [ProfilModal, setProfilModal] = useState(false);

    const logout = async() => {

        try {
            
            const res = await Axios.post('/logout')
            if (res.status === 200) {
                setUser();
                <Navigate to='/'/>
            }

        } catch (error) {
            console.log(error);
        }

    }

  return (
    <div onClick={()=> !ShowProfileMenu && setShowProfileMenu(true)} className='relative cursor-pointer rounded-full bg-gray-600 w-8 h-8 flex justify-center items-center text-white'>
            {
                user.profile ?
                <img className="h-full w-full rounded-full" src={ user.profile && user.profile} alt="profile" />
                : 
                <p className="font-bold uppercase">{user.name.slice(0,1)}</p>
            }
            
            <div className={`${ShowProfileMenu ? 'flex-col items-center' : 'hidden'} right-0 flex absolute z-20 -bottom-52 sm:right-0 bg-gray-100 w-[850%] sm:w-[150px] text-gray-500 rounded-lg px-2 pt-2 pb-4`}>
                
                <button onClick={()=> setShowProfileMenu(false)} className='self-end text-end'><IoMdCloseCircleOutline fontSize={23}/></button>
                <div className='rounded-full border bg-gray-600 w-9 h-9 flex justify-center items-center text-white'>
                    {
                        user.profile ?
                        <img className="h-full w-full rounded-full" src={ user.profile && user.profile } alt="profile" />
                        : 
                        <p className="font-bold uppercase">{user.name.slice(0,1)}</p>
                    }
                </div>
                <h4 className='py-2 font-semibold text-[18px]'>{user.name}</h4>
                <hr className='border-black w-full'/>
                <ul className='flex text-[17px] w-full flex-col justify-center items-center'>

                    <li className=' cursor-pointer hover:text-primary_text border-b py-1 w-full text-center'>
                        <button onClick={()=> setProfilModal(true)} className='flex w-full items-center justify-center gap-1' ><BiUser fontSize={20}/> Profile</button>
                    </li>
                    {
                        user.role === 'seller' && <li className='cursor-pointer hover:text-primary_text border-b w-full text-center py-1'>
                            <NavLink to='/dashboard'>
                                Dashboard
                            </NavLink>
                        </li>
                    }

                    <li className='cursor-pointer hover:text-primary_text pt-1'><button className='flex w-full items-center justify-center gap-1' onClick={() => logout()}><BiLogOut fontSize={20}/> Logout</button></li>

                </ul>
            </div>
            
        {ProfilModal && <ProfileM ProfilModal={ProfilModal} hundleClick={setProfilModal} />}
    </div>
    
  )
}

export default Profile