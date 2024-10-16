import React, { useEffect, useState } from 'react'
<<<<<<< HEAD
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

=======
import { BiCategory, BiPurchaseTag } from 'react-icons/bi'
import { FaArrowRight, FaMoneyBill, FaProductHunt } from 'react-icons/fa'
import {GiConfirmed} from 'react-icons/gi'
import { NavLink } from 'react-router-dom'
import Axios from '../assets/constants/axios/axios'
import { Order_count, Order_profit, Visites } from '../charts'
import Product_views from '../charts/Product_views'
import { Loading } from '../components'

const HomeDashboard = () => {

  const [products, setproducts] = useState(0);
  const [ordersConfirmed, setordersConfirmed] = useState(0);
  const [ordersNotConfirmed, setordersNotConfirmed] = useState(0);
  const [OrderMoney, setOrderMoney] = useState(0);
  const [categories, setcategories] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [OrdersProfit, setOrdersProfit] = useState(false);

  useEffect(()=>{

    (async()=>{ 

      setIsLoading(true)

      try {

        const res = await Axios.get('/details');

        if (res.status === 200) {
          setcategories(res.data.categories)
          setproducts(res.data.products)
          setordersConfirmed(res.data.orders_confirmed)
          setordersNotConfirmed(res.data.orders_not_confirmed)
          setOrderMoney(Math.round(res.data.total_money * 100) / 100)
        }

      } catch (error) {
        console.log(error);
      }

      setIsLoading(false)
      
    })()

  }, [])

  if (isLoading) return <Loading /> 

  return (
    <div className='pb-3'>
>>>>>>> ee0fb04978010731a65b7449f0c0472299446185
      <h1 className="text-primary_text mb-5 font-bold text-[19px] sm:text-[25px] ">
        Accueil
      </h1>

<<<<<<< HEAD
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
=======
      <div className="flex flex-wrap justify-start gap-x-[5%] gap-y-[20px] rounded-xl">
        
        <div className='p-3 relative shadow-lg w-[100%] sm:w-[47%] md:w-[30%] bg-gradient-to-br from-second to-[#ff8b8f] rounded-lg justify-between flex h-[150px] flex-col'>
            <h2 className='text-start text-[25px] font-bold text-white z-10'>Products</h2>
            <FaProductHunt fontSize={90} className=' absolute hover:scale-110 transition-transform  text-white top-7 right-5 opacity-60'/>
            <p className='text-white font-bold text-[45px]'>{products}</p>
            <NavLink className="flex gap-1 items-center font-semibold text-white justify-center" to='/dashboard/products'>
                Show more <FaArrowRight className='mt-[3px]' fontSize={12}/>
            </NavLink>
        </div>

        <div className='p-3 relative shadow-lg w-[100%] sm:w-[47%] md:w-[30%] bg-gradient-to-br from-gray-400 to-gray-300 rounded-lg justify-between flex  h-[150px] flex-col'>
            <h2 className='text-start text-[25px] font-bold text-white z-10'>Categories</h2>
            <BiCategory fontSize={90} className=' absolute hover:scale-110 transition-transform  text-white top-7 right-5 opacity-60'/>
            <p className='text-white font-bold text-[45px]'>{categories}</p>
            <NavLink className="flex gap-1 items-center font-semibold text-white justify-center" to='/dashboard/categories'>
                Show more <FaArrowRight className='mt-[3px]' fontSize={12}/>
            </NavLink>
        </div>

        <div className='p-3 relative shadow-lg w-[100%] sm:w-[47%] md:w-[30%] bg-gradient-to-br from-primary_text to-[#4b6f91] rounded-lg justify-between flex  h-[150px] flex-col'>
            <h2 className='text-start text-[25px] font-bold text-white z-10'>Pending Orders</h2>
            <BiPurchaseTag  fontSize={90} className=' absolute hover:scale-110 transition-transform  text-white top-7 right-5 opacity-60'/>
            <p className='text-white font-bold text-[45px]'>{ordersNotConfirmed}</p>
            <NavLink className="flex gap-1 items-center font-semibold text-white justify-center" to='/dashboard/orders'>
                Show more <FaArrowRight className='mt-[3px]' fontSize={12}/>
            </NavLink>
        </div>

        <div className='p-3 relative shadow-lg w-[100%] sm:w-[47%] md:w-[30%] bg-gradient-to-br from-[#2dcc6f] to-[#2dcc6f82] rounded-lg justify-between flex  h-[150px] flex-col'>
            <h2 className='text-start text-[25px] font-bold text-white z-10'>Orders Confirmed</h2>
            <GiConfirmed  fontSize={90} className=' absolute hover:scale-110 transition-transform  text-white top-7 right-5 opacity-60'/>
            <p className='text-white font-bold text-[45px]'>{ordersConfirmed}</p>
            <NavLink className="flex gap-1 items-center font-semibold text-white justify-center" to='/dashboard/orders'>
                Show more <FaArrowRight className='mt-[3px]' fontSize={12}/>
            </NavLink>
        </div>

        <div className='p-3 relative shadow-lg w-[100%] sm:w-[47%] md:w-[30%] bg-gradient-to-br from-[#353535] to-[#CFCFCF] rounded-lg justify-between flex  h-[150px] flex-col'>
            <h2 className='text-start text-[25px] font-bold text-white z-10'>Profit</h2>
            <FaMoneyBill fontSize={90} className=' absolute hover:scale-110 transition-transform  text-white top-7 right-5 opacity-60'/>
            <p className='text-white font-bold text-[45px]'>${OrderMoney}</p>
            <NavLink className="flex gap-1 items-center font-semibold text-white justify-center" to='/dashboard/categories'>
>>>>>>> ee0fb04978010731a65b7449f0c0472299446185
                Show more <FaArrowRight className='mt-[3px]' fontSize={12}/>
            </NavLink>
        </div>

      </div>

<<<<<<< HEAD
      <div className='flex flex-col mb-5 md:mb-10 gap-8 xl:flex-row'>
        <YearBar />
        <DoughnutBar/>
      </div>

      <div className='w-full mb-5'>
        <AmountBar />
=======
      <div className='flex flex-col mt-10 w-full justify-center items-center xl:justify-start'>
        
        <div className='flex flex-col items-center'>

          <h3 className='text-primary_text mb-3 font-bold text-center xl:text-start text-[20px] md:text-[22px] lg:text-[23px] xl:text-[25px]'>Orders Statistices</h3>
          
          <div className='flex gap-3 items-center'>

            <button className={`${
                  !OrdersProfit ? "bg-second text-white" : "text-second"
                } px-3 rounded-lg hover:text-white hover:bg-second border font-semibold  border-second`} 
                onClick={() => setOrdersProfit(false)}>
                  Orders
            </button>

            <button className={`${
                  OrdersProfit ? "bg-second text-white" : "text-second"
                } px-3 rounded-lg hover:text-white hover:bg-second border font-semibold  border-second`} 
                onClick={() => setOrdersProfit(true)}>
                  Orders Profits
            </button>

          </div>

        </div>

        {
          OrdersProfit ? 
          <div className='w-full xl:w-[79%] mx-auto'>
            <Order_profit/>
          </div>
          :
          <div className='w-full xl:w-[79%]'>
            <Order_count/>
          </div>
          
        }

        

      </div>

      <div className='flex flex-col mt-10 w-full gap-10 xl:gap-0 xl:flex-row justify-center items-start xl:justify-start xl:items-center'>
        
        <div className='w-full xl:w-[50%] xl:pr-1'>
          <Visites/>
        </div>

        <div className='w-full xl:w-[50%] xl:pl-1'>
          <Product_views/>
        </div>

>>>>>>> ee0fb04978010731a65b7449f0c0472299446185
      </div>

    </div>
  )
}

export default HomeDashboard