import React, { useEffect, useState } from 'react'
import {Chart as  ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import {Bar} from 'react-chartjs-2'
import { useNavigate } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Axios from '../assets/constants/axios/axios';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const YearBar = () => {

    const navigate = useNavigate()

    const [Data, setData] = useState({keys : [], values : []})
    const [countClick, setCountClick] = useState(0)
    const [typeSort, settypeSort] = useState('week')
    const [currentDate, setcurrentDate] = useState(new Date().toISOString().split('T')[0])


    const options = {
        responsive: true,
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

          let date = Data?.keys[activeElements[0]?.index];

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

        const res = await Axios.get(`/reservation/StatisticsEvents/${typeSort}/${date}`)

        if (res.status == 200) {
          
          setData({
            keys : Object.keys(res.data[0]),
            values : Object.values(res.data[0]).map((item) => item)
          })

        }

      } catch (error) {
        console.log(error)
      }

    }

    const NextOrPreviosDate = (action) => {

      let selectedDate = Data.keys[action === 'inc' ? Data.keys.length - 1 : 0].replaceAll('/', '-');

      if (action == 'inc') { 

        if (typeSort === 'month') {
          
          selectedDate = '31-' + selectedDate

        }
      
        const date = new Date(selectedDate.split('-').reverse().join('-'))
        date.setDate(date.getDate() + 1)
        
        setcurrentDate(date.toISOString().split('T')[0]);

      }else if(action == 'dec') {

        if (typeSort === 'month') {
          
          selectedDate = '01-' + selectedDate

        }

        const date = new Date(selectedDate.split('-').reverse().join('-'))
        date.setDate(date.getDate() - 1)
        
        setcurrentDate(date.toISOString().split('T')[0]);

      }
      

    }

    useEffect(() => {
      
      DisplayBy(typeSort, currentDate)
      
    }, [currentDate])
    

  return (
    
    <div className='h-full xl:pr-3 xl:w-[51%] relative'>

      <h2 className=' text-primary_text mb-3 font-bold text-center xl:text-start text-[20px] md:text-[22px] lg:text-[23px] xl:text-[25px]'>Nombre d'activités</h2>

      <div className='flex items-center justify-center'>
        <button className={`${typeSort === 'month' ? 'bg-second text-white' : 'text-second'} px-3 rounded-lg hover:text-white hover:bg-second mr-3 border font-semibold  border-second`} onClick={() => DisplayBy('month', new Date().toISOString().split('T')[0])} >Mois</button>
        <button className={`${typeSort === 'week' ? 'bg-second text-white' : 'text-second'} px-3 rounded-lg hover:text-white hover:bg-second border font-semibold  border-second`} onClick={() => DisplayBy('week', new Date().toISOString().split('T')[0])} >Semaines</button>
      </div>
      

      <div className='mt-5'>

        <div className='flex justify-between items-center'>
          <button className='p-2 hover:bg-second hover:text-white transition-all top-[50%] border text-second border-second rounded-full -left-8' onClick={() => NextOrPreviosDate('dec')}><FaAngleLeft/></button>
          <p>{typeSort === 'week' ? new Date(currentDate).toLocaleDateString('FR', {month : 'long', year : 'numeric'}) : new Date(currentDate).getFullYear()}</p>
          <button className='p-2 hover:bg-second hover:text-white transition-all top-[50%] float-end border text-second border-second rounded-full -right-8' onClick={() => NextOrPreviosDate('inc')}><FaAngleRight/></button>
        </div>
      
        <Bar
          style={{
            height:'400px'
          }}
            data={{
              labels : Data.keys.map(item => typeSort == 'week' ? item.slice(0, 5) : item),
              datasets: [{
                  label : 'Nombre d\'activités',
                  data : Data.values,
                  backgroundColor : [
                      '#22c55e'
                  ],
                  borderWidth :  1
              }]
            }}
          options={options}
        />

      </div>

    </div>

  )
}

export default YearBar