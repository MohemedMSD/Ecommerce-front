import React, { useEffect, useState } from 'react'
import {Bar} from 'react-chartjs-2'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import {Chart as  ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Axios from '../assets/constants/axios/axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Order_profit = () => {
    const [Data, setData] = useState({keys : [], values : []})
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
        }
    };

    const DisplayBy = async (date) => {

      try {
    
        setcurrentDate(date)

        const res = await Axios.get(`statistic/orders-profit/${date}`)

        if (res.status == 200) {

            console.log(Object.values(res.data[0]).map(item => item?.price ? item?.price : 0));
          
          setData({
            keys : Object.keys(res.data[0]),
            values : Object.values(res.data[0])
          })

        }

      } catch (error) {
        console.log(error)
      }

    }

    const NextOrPreviosDate = (action) => {
;

      if (action == 'inc') { 
      
        const date = new Date(currentDate)
        const nextDate = new Date(`${date.getFullYear() + 1}-01-01`);
        
        setcurrentDate(nextDate.toISOString().split('T')[0]);

      }else if(action == 'dec') {

        const date = new Date(currentDate)
        const previusDate = new Date(`${date.getFullYear() - 1}-01-01`);
        
        setcurrentDate(previusDate.toISOString().split('T')[0]);

      }
      

    }

    useEffect(() => {
      
      DisplayBy(currentDate)
      
    }, [currentDate])
    

  return (
    
    <div className='h-full relative'>
      
      <div className='mt-5'>

        <div className='flex justify-between items-center'>
          <button className='p-2 hover:bg-second hover:text-white transition-all top-[50%] border text-second border-second rounded-full -left-8' onClick={() => NextOrPreviosDate('dec')}><FaAngleLeft/></button>
          <p>{new Date(currentDate).getFullYear()}</p>
          <button className='p-2 hover:bg-second hover:text-white transition-all top-[50%] float-end border text-second border-second rounded-full -right-8' onClick={() => NextOrPreviosDate('inc')}><FaAngleRight/></button>
        </div>
      
        <Bar
          style={{
            height:'400px'
          }}
            data={{
              labels : Data.keys.map(item => item),
              datasets: [
                    {
                        label : 'Orders price',
                        data : Data.values.map(item => item?.price ? item?.price : 0),
                        backgroundColor : [
                            '#324d67'
                        ],
                        borderWidth :  1
                    },
                    {
                        label : 'Expenses',
                        data : Data.values.map(item => item?.price ? item?.expenses : 0),
                        backgroundColor : [
                            '#f02d34'
                        ],
                        borderWidth :  1
                    },
                    {
                        label : 'Order profits',
                        data : Data.values.map(item => item?.price ? item?.profit : 0),
                        backgroundColor : [
                            '#2dcc6f'
                        ],
                        borderWidth :  1
                    },
                ]
            }}
          options={options}
        />

      </div>

    </div>

  )
}

export default Order_profit