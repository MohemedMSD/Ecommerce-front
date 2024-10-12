import React, { useEffect, useState } from 'react'
import {Chart as  ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import {Bar} from 'react-chartjs-2'
import { useNavigate } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Axios from '../assets/constants/axios/axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AmountBar = () => {

    const navigate = useNavigate()

    const [Data, setData] = useState({
      date : [],
      facture_price : [],
      reservation_price : [],
      profit : []
    })
    const [countClick, setCountClick] = useState(0)
    const [typeSort, settypeSort] = useState('month')
    const [currentDate, setcurrentDate] = useState(new Date().toISOString().split('T')[0])


    const options = {
        // responsive: false,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales : {
          y : {
            ticks : {
              callback : function (value, index, values){
                return Number.isInteger(value) ? value : null
              }
            }
          }
        },
        onClick: (event, activeElements) => {
          
          let date = Data?.date[activeElements[0]?.index];

          if (date) {


            setCountClick(pre => pre + 1)
            
            setTimeout(() => {
              setCountClick(0)
            }, 500);
            
            if (countClick === 1) {
              
              if (date.includes('/')) {
                date = date.replaceAll('/', '-')
              }
    
              navigate(`/dashboard/evenements/${date.split('-').reverse().join('-')}`)

            }

          }

        }
    };

    const DisplayBy = async (typeSort, date) => {

      try {
        
        settypeSort(typeSort)
        setcurrentDate(date)
        
        const res = await Axios.get(`/reservation/StatisticsAmount/${typeSort}/${date}`)

        if (res.status == 200) {
          
          setData({
            date : Object.keys(res.data),
            reservation_price : Object.values(res.data).map(item => item.reservation_price ? item.reservation_price : 0),
            facture_price : Object.values(res.data).map(item => item.facture_price ? item.facture_price : 0),
            profit : Object.values(res.data).map(item => item.profit ? item.profit : 0),
          })

        }

      } catch (error) {
        console.log(error)
      }


    }

    const NextOrPreviosDate = (action) => {

      if (action == 'inc') { 
        
        const date = new Date(currentDate)
        
        if (typeSort == 'month') {
          date.setFullYear(date.getFullYear() + 1)
        }else{
          date.setFullYear(date.getFullYear() + 10)
        }

        setcurrentDate(date.toISOString().split('T')[0]);

      }else if(action == 'dec') {

        const date = new Date(currentDate)

        if (typeSort == 'month') {
          date.setFullYear(date.getFullYear() - 1)
        }else{
          date.setFullYear(date.getFullYear() - 10)
        }

        setcurrentDate(date.toISOString().split('T')[0]);

      }
      

    }

    const formatDateInfo = (current_date) => {

      if (typeSort == 'years') {

        const start_date = parseInt(Math.round(new Date(current_date).getFullYear() / 10) * 10)
        const end_date = start_date + 10;
        return `${start_date}-${end_date}`
      }

      return new Date(current_date).getFullYear();

    }


    useEffect(() => {
      
      DisplayBy(typeSort, currentDate)
      
    }, [currentDate])

  return (

      <div className="h-full mt-5 xl:mt-0 xl:w-[80%] mx-auto relative">

        <h2 className=" text-primary_text text-center mb-3 font-bold text-[20px] md:text-[22px] lg:text-[23px] xl:text-[25px]">
          Montants financier d'activités
        </h2>

        <div className='flex items-center justify-center'>
          
          <button
            className={`${
              typeSort === "years" ? "bg-gray-500 text-white" : "text-gray-500"
            } px-3 rounded-lg hover:text-white hover:bg-gray-500 mr-3 border font-semibold  border-gray-500`}
            onClick={() =>
              DisplayBy("years", new Date().toISOString().split("T")[0])
            }
          >
            Années
          </button>

          <button
            className={`${
              typeSort === 'month' ? "bg-gray-500 text-white" : "text-gray-500"
            } px-3 rounded-lg hover:text-white hover:bg-gray-500 border font-semibold  border-gray-500`}
            onClick={() =>
              DisplayBy('month', new Date().toISOString().split("T")[0])
            }
          >
            Mois
          </button>

        </div>

        <div className="mt-5">

          <div className="flex justify-between items-center">

            <button
              className="p-2 hover:bg-second hover:text-white transition-all top-[50%] border text-second border-second rounded-full -left-8"
              onClick={() => NextOrPreviosDate("dec")}
            >
              <FaAngleLeft />
            </button>

            <p>
              {formatDateInfo(currentDate)}
            </p>

            <button
              className="p-2 hover:bg-second hover:text-white transition-all top-[50%] float-end border text-second border-second rounded-full -right-8"
              onClick={() => NextOrPreviosDate("inc")}
            >
              <FaAngleRight />
            </button>

          </div>

          <Bar
            data={{
              labels: Data?.date?.map((item) =>
                typeSort == "years" ? item.slice(0, 5) : item
              ),
              datasets: [
                {
                  label: "Montant de facture",
                  data: Data?.facture_price,
                  backgroundColor: ["#6b7280"],  //1f42ff
                  borderWidth: 1,
                },
                {
                  label: "Montant dépensé",
                  data: Data?.reservation_price,
                  backgroundColor: ["#ff001d"],
                  borderWidth: 1,
                },
                {
                  label: "Les bénéfices",
                  data: Data?.profit,
                  backgroundColor: ["#22c55e"],
                  borderWidth: 1,
                },
              ],
            }}
            options={options}
          />
        </div>

      </div>

  );
};

export default AmountBar;
