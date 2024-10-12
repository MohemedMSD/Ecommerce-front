import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Axios from "../../assets/constants/axios/axios";
import {Loading} from '../../components'
import { useStateContext } from "../../context/StateContext";
import {BlackLogo} from './../../assets/constants/logos'

const Login = () => {

  const {setUser, user} = useStateContext()

  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')

  const [ErrorEmail, setErrorEmail] = useState('')
  const [ErrorPassword, setErrorPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const [showPassword, setshowPassword] = useState(false)

  const handlClick = (e)=>{
      e.preventDefault()

      setErrorEmail('')
      setErrorPassword('')
      setIsLoading(true)

      Axios.post('/login', {
        email : Email,
        password : Password
      })
      .then((res) => {

<<<<<<< HEAD
        setUser(res.data.user);
        window.location.href = '/dashboard'
=======
        setUser(res.data.user, res.data.baseUrl);

        const redirectPath = sessionStorage.getItem('redirectPath')

        if (redirectPath) {
          window.location.href = redirectPath
          sessionStorage.removeItem('redirectPath')
        }else{
          window.location.href = '/'
        }


>>>>>>> ee0fb04978010731a65b7449f0c0472299446185
  
      }).catch((rej) => {

        setIsLoading(false)
        
        if (rej.response) {

          if (rej.response.status === 422) {
            
            setErrorEmail(rej.response.data.email || '')
            
            setErrorPassword(rej.response.data.password || '')
    
          }

        }else{
          console.log(rej.message);
        }

      })

    
  }

  

  if (user) {
    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen flex px-5 sm:px-0 flex-col items-center justify-center bg-primary">
      <div className="flex relative flex-col bg-slate-50 backdrop-blur-lg shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
        
        {
          isLoading ? <Loading /> : ""
        }
        
        <div className="w-full flex items-center justify-center mb-3">
          <img src={BlackLogo} className='w-[120pxpx] h-[70px] md:w-[140px] md:h-[90px]' />
        </div>


        <div className="font-medium text-center self-center text-xl sm:text-2xl uppercase text-gray-800">
          Connectez-vous à votre compte
        </div>

        <div className="mt-10 -z-10">
          <form action="#">

            <div className="flex flex-col mb-6">
              <label
                htmlFor="email"
                className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >
                Address E-Mail:
              </label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>

                <input
                  id="email"
                  type="email"
                  name="email"
                  className={`text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border ${ErrorEmail ? 'border-red-400' : 'border-gray-400'} w-full py-2 focus:outline-none focus:border-gray-400`} placeholder="E-Mail Address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {
                ErrorEmail? <p className="text-red-500">{ErrorEmail}</p> : ''
              }
            </div>

            <div className="flex flex-col mb-6">
              <label
                htmlFor="password"
                className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >
                Mots de passe:
              </label>
              <div className="relative">
                <div className="inline-flex z-10 items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className={`text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border ${ErrorPassword ? 'border-red-400' : 'border-gray-400'} w-full py-2 focus:outline-none focus:border-gray-400`} 
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  {
                    showPassword ?
                      <FaEyeSlash onClick={() => setshowPassword(false)} className=" absolute cursor-pointer right-3 text-gray-500 top-[50%] -translate-y-[50%] text-[19px]"/>
                    :
                      <FaEye onClick={() => setshowPassword(true)} className=" absolute cursor-pointer right-3 text-gray-500 top-[50%] -translate-y-[50%] text-[19px]" />
                  } 
                </div>

              </div>
              {
                ErrorPassword ? <p className="text-red-500">{ErrorPassword}</p> : ''
              }
            </div>

            <div className="flex items-center mb-6 -mt-4">
              <div className="flex ml-auto">
                <NavLink
                  to="/auth/forget-password"
                  className="inline-flex text-xs sm:text-sm text-gray-500 hover:text-gray-700"
                >
<<<<<<< HEAD
                  Mot de passe oublié
=======
                  Forgot Your Password?
>>>>>>> ee0fb04978010731a65b7449f0c0472299446185
                </NavLink>
              </div>
            </div>

            <div className="flex w-full">
              <button
                onClick={(e)=>handlClick(e)}
                type="submit"
                className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-second hover:bg-green-400 rounded py-2 w-full transition duration-150 ease-in"
              >
                <span className="mr-2 uppercase">Se connecter</span>
                <span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* <div className="flex justify-center items-center mt-6">
          <NavLink
            to='/auth/register'
            className="inline-flex items-center font-bold text-second hover:text-red-700 text-xs text-center"
          >
            <span>
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </span>
            <span className="ml-2">Vous n'avez pas de compte?</span>
          </NavLink>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
