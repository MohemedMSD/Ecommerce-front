import React, {useState, useEffect} from 'react'
import { Doughnut } from 'react-chartjs-2';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Axios from '../assets/constants/axios/axios'
import {Chart as  ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutBar = () => {

    const [Data, setData] = useState({keys : [], values : []})
    const [typeSort, settypeSort] = useState('months')
    const [currentDate, setcurrentDate] = useState(new Date().toISOString().split('T')[0])

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        }
    };

    
    const DisplayBy = async (typeSort, date) => {

      try {
        
        settypeSort(typeSort)
        setcurrentDate(date)

        const res = await Axios.get(`/reservation/Statistics/${typeSort}/${date}`);

        if (res?.status == 200) {
          
          setData({
            keys : Object.keys(res.data),
            values : Object.values(res.data)
          })

        }

      } catch (error) {
        console.log(error)
      }


    }

    const NextOrPreviosDate = (action) => {

      if (action == 'inc') { 
        
        const date = new Date(currentDate)

        if(typeSort == 'months'){

          date.setMonth(date.getMonth() + 1)

        }else if(typeSort == 'years'){
          
          date.setFullYear(date.getFullYear() + 1)

        }

        setcurrentDate(date.toISOString().split('T')[0]);

      }else if(action == 'dec') {

        const date = new Date(currentDate)

        if(typeSort == 'months'){

          date.setMonth(date.getMonth() - 1)

        }else if(typeSort == 'years'){
          
          date.setFullYear(date.getFullYear() - 1)

        }

        setcurrentDate(date.toISOString().split('T')[0]);

      }
      

    }

    useEffect(() => {
      
      DisplayBy(typeSort, currentDate)
      
    }, [currentDate])

    return (
      <div className="h-full mb-6 w-full  xl:w-[51%] relative">

          <h2 className=" text-primary_text mb-3 text-center xl:text-start font-bold text-[20px] md:text-[22px] lg:text-[23px] xl:text-[25px]">
            Statistiques financiéres des activités
          </h2>

          <div className='flex items-center justify-center'>

            <button
              className={`${
                typeSort === 'years' ? "bg-second text-white" : "text-second"
              } px-3 rounded-lg hover:text-white hover:bg-second mr-3 border font-semibold  border-second`}
              onClick={() =>
                DisplayBy('years', new Date().toISOString().split("T")[0])
              }
            >
              Années
            </button>

            <button
              className={`${
                typeSort === 'months' ? "bg-gray-500 text-white" : "text-gray-500"
              } px-3 rounded-lg hover:text-white hover:bg-gray-500 border font-semibold  border-gray-500`}
              onClick={() =>
                DisplayBy('months', new Date().toISOString().split("T")[0])
              }
            >
              Mois
            </button>

          </div>

          <div className="mt-5 relative flex flex-col items-center md:h-[580px] xl:mb-1 xl:h-[480px]">

            <div className="flex w-full justify-between items-center">

              <button
                className="p-2 hover:bg-second hover:text-white transition-all top-[50%] border text-second border-second rounded-full -left-8"
                onClick={() => NextOrPreviosDate("dec")}
              >
                <FaAngleLeft />
              </button>

              <p>
                {typeSort === 'months'
                  ? new Date(currentDate).toLocaleDateString("FR", {
                      month: "long",
                      year: "numeric",
                    })
                  : new Date(currentDate).getFullYear()}
              </p>

              <button
                className="p-2 hover:bg-second hover:text-white transition-all top-[50%] float-end border text-second border-second rounded-full -right-8"
                onClick={() => NextOrPreviosDate("inc")}
              >
                <FaAngleRight />
              </button>

            </div>

            {/* <div className=' absolute text-center w-full left-0 top-[50%]'>
              <p className='font-semibold text-gray-600 text-[18px]'>Total Amount</p>
              <p className='font-semibold text-[18px] text-second'>500</p>
            </div> */}
          
            <Doughnut 
              options={options} data={{
                labels : Data.keys.map(item => item.includes('_') ? item.replace('_', ' ') : item),
                datasets : [{
                    label : 'Montant',
                    data : Data.values,
                    backgroundColor: ['rgb(220 38 38)', 'rgb(239 68 68)', 'rgb(248 113 113)', 'rgb(252 165 165)',
                    'rgb(21 128 61)', 'rgb(34 197 94)', 'rgb(74 222 128 )', 'rgb(134 239 172)', 'rgb(107 114 128)'],
                    borderWidth : 1
                }]
            }} className='text-gray-300' />

          </div>

        </div>
    )

}

export default DoughnutBar