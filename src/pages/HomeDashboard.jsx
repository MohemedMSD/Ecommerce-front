import React, { useEffect, useState } from 'react'
import { FaArrowRight, FaMoneyBill } from 'react-icons/fa'
import { MdEvent } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import Axios from '../assets/constants/axios/axios'
import { AmountBar, DoughnutBar, YearBar } from '../charts'

const HomeDashboard = () => {
  const [EventYear, setEventYear] = useState(0);
  const [EventMonth, setEventMonth] = useState(0);
  const [ProfitYear, setProfitYear] = useState(0);
  const [ProfitMonth, setProfitMonth] = useState(0);
  const [IsLoading, setIsLoading] = useState(true);
  const [currentDate, setcurrentDate] = useState(
    new Date().toISOString().split('T')[0]
  )

  useEffect(()=>{

    Axios.get('/reservation-details')
    .then((res) => {
      if (res.status === 200) {
        
        setProfitYear(Math.floor(res.data.totalPriceYear))
        setProfitMonth(Math.floor(res.data.totalPriceMonth))
        
        setEventYear(Math.floor(res.data.totalEventYear))
        setEventMonth(Math.floor(res.data.totalEventMonth))
        setIsLoading(false)
      }
    })
    .catch((rej) => console.log(rej))

  }, [])

  if (IsLoading) return (
    <div>
      
      <h1 className="text-primary_text mb-5 font-bold text-[19px] sm:text-[25px] ">
        Accueil
      </h1>

      <div className="flex flex-wrap justify-start gap-x-[3%] rounded-xl">
        
        <div className='p-3 inLoading mb-5 relative shadow-lg w-[100%] sm:w-[47%] md:w-[40%] lg:w-[38%] xl:w-[30%] bg-gradient-to-br from-gray-400 to-gray-200 rounded-lg justify-between flex  h-[150px] flex-col'></div>
        <div className='p-3 inLoading mb-5 relative shadow-lg w-[100%] sm:w-[47%] md:w-[40%] lg:w-[38%] xl:w-[30%] bg-gradient-to-br from-gray-400 to-gray-200 rounded-lg justify-between flex  h-[150px] flex-col'></div>
        <div className='p-3 inLoading mb-5 relative shadow-lg w-[100%] sm:w-[47%] md:w-[40%] lg:w-[38%] xl:w-[30%] bg-gradient-to-br from-gray-400 to-gray-200 rounded-lg justify-between flex  h-[150px] flex-col'></div>
        <div className='p-3 inLoading mb-5 relative shadow-lg w-[100%] sm:w-[47%] md:w-[40%] lg:w-[38%] xl:w-[30%] bg-gradient-to-br from-gray-400 to-gray-200 rounded-lg justify-between flex  h-[150px] flex-col'></div>
        <div className='p-3 inLoading mb-5 relative shadow-lg w-[100%] sm:w-[47%] md:w-[40%] lg:w-[38%] xl:w-[30%] bg-gradient-to-br from-gray-400 to-gray-200 rounded-lg justify-between flex  h-[150px] flex-col'></div>

      </div>
    </div>
  )

  return (
    <div>

      <h1 className="text-primary_text mb-5 font-bold text-[19px] sm:text-[25px] ">
        Accueil
      </h1>

      <div className="flex flex-wrap justify-start gap-x-[3%] rounded-xl">
        
        <div className='p-3 mb-5 relative shadow-lg w-[100%] sm:w-[47%] md:w-[40%] lg:w-[38%] xl:w-[30%] bg-gradient-to-br from-gray-600 to-gray-400 rounded-lg justify-between flex  h-[150px] flex-col'>
            <h2 className='text-start text-[25px] font-bold text-white z-10'>Activités de l'année</h2>
            <MdEvent  fontSize={90} className=' absolute hover:scale-110 transition-transform  text-white top-7 right-5 opacity-60'/>
            <p className='text-white font-bold text-[45px]'>{EventYear}</p>
            <NavLink className="flex gap-1 items-center font-semibold text-white justify-center" to={`/dashboard/evenements/${new Date(currentDate).getFullYear()}`}>
                Voir plus <FaArrowRight className='mt-[3px]' fontSize={12}/>
            </NavLink>
        </div>

        <div className='p-3 mb-5 relative shadow-lg w-[100%] sm:w-[47%] md:w-[40%] lg:w-[38%] xl:w-[30%] bg-gradient-to-br from-second to-[#5aff97] rounded-lg justify-between flex  h-[150px] flex-col'>
            <h2 className='text-start text-[25px] font-bold text-white z-10'>Bénéfices de l'année</h2>
            <FaMoneyBill  fontSize={90} className=' absolute hover:scale-110 transition-transform  text-white top-7 right-5 opacity-60'/>
            <p className='text-white font-bold text-[45px]'>{ProfitYear} DH</p>
            <NavLink className="flex gap-1 items-center font-semibold text-white justify-center" to={`/dashboard/evenements/${new Date(currentDate).getFullYear()}`}>
                Voir plus <FaArrowRight className='mt-[3px]' fontSize={12}/>
            </NavLink>
        </div>

        <div className='p-3 mb-5 relative shadow-lg w-[100%] sm:w-[47%] md:w-[40%] lg:w-[38%] xl:w-[30%] bg-gradient-to-br from-gray-600 to-gray-400 rounded-lg justify-between flex  h-[150px] flex-col'>
            <h2 className='text-start text-[25px] font-bold text-white z-10'>Activités de mois</h2>
            <MdEvent fontSize={90} className=' absolute hover:scale-110 transition-transform  text-white top-7 right-5 opacity-60'/>
            <p className='text-white font-bold text-[45px]'>{EventMonth}</p>
            <NavLink className="flex gap-1 items-center font-semibold text-white justify-center" to={`/dashboard/evenements/${new Date(currentDate).getFullYear()}-${currentDate.slice(5, 7)}`}>
                Show more <FaArrowRight className='mt-[3px]' fontSize={12}/>
            </NavLink>
        </div>
        
        <div className='p-3 mb-5 relative shadow-lg w-[100%] sm:w-[47%] md:w-[40%] lg:w-[38%] xl:w-[30%] bg-gradient-to-br from-second to-[#5aff97] rounded-lg justify-between flex  h-[150px] flex-col'>
            <h2 className='text-start text-[25px] font-bold text-white z-10'>Bénéfices de mois</h2>
            <FaMoneyBill fontSize={90} className=' absolute hover:scale-110 transition-transform  text-white top-7 right-5 opacity-60'/>
            <p className='text-white font-bold text-[45px]'>{ProfitMonth} DH</p>
            <NavLink className="flex gap-1 items-center font-semibold text-white justify-center" to={`/dashboard/evenements/${new Date(currentDate).getFullYear()}-${currentDate.slice(5, 7)}`}>
                Show more <FaArrowRight className='mt-[3px]' fontSize={12}/>
            </NavLink>
        </div>

      </div>

      <div className='flex flex-col mb-5 md:mb-10 gap-8 xl:flex-row'>
        <YearBar />
        <DoughnutBar/>
      </div>

      <div className='w-full mb-5'>
        <AmountBar />
      </div>

    </div>
  )
}

export default HomeDashboard