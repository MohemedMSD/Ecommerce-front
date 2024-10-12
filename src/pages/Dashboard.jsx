import React from 'react'
import { Navigate, Outlet} from 'react-router-dom'
import { SideBar, Header } from '../components' 
import { useStateContext } from '../context/StateContext';

const Dashboard = () => {
  
  const {user} = useStateContext();

  
  if (!user) {

    return <Navigate to="/auth/login" />

<<<<<<< HEAD
=======
  }else if (!user.verified_at) {

    return <Navigate to="/auth/send-verification-code" />

  }else if (user.role !== 'seller') {

    return <Navigate to="/" />
    
>>>>>>> ee0fb04978010731a65b7449f0c0472299446185
  }
  // else if (!user.verified_at) {

  //   return <Navigate to="/auth/send-verification-code" />

  // }else if (user.role !== 'seller') {

  //   return <Navigate to="/" />
    
  // }

  return (
<<<<<<< HEAD
    <div className="relative h-screen flex overflow-y-hidden">
=======
    <div className="relative h-screen overflow-hidden flex">
>>>>>>> ee0fb04978010731a65b7449f0c0472299446185
        <SideBar />

        <div className="flex-1 flex flex-col bg-white">

          <Header/>

<<<<<<< HEAD
          <div className="sm:px-10 w-screen lg:w-[calc(100vw_-_250px)] px-3 py-5 overflow-y-scroll hide-scrollbar">

              <Outlet/>

          </div>

=======
          <div className="sm:px-10 w-screen lg:w-[calc(100vw_-_250px)] px-6 py-5 h-screen overflow-y-scroll hide-scrollbar">
            
              <Outlet/>
              
          </div>


>>>>>>> ee0fb04978010731a65b7449f0c0472299446185
        </div>

      </div>
  )
}

export default Dashboard
