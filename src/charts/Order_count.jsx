import React, { useEffect, useState } from 'react'
import {Line} from 'react-chartjs-2'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import {Chart as  ChartJS, CategoryScale, LineElement, LinearScale, PointElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Axios from '../assets/constants/axios/axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const Order_count = () => {
  
    const [Data, setData] = useState({keys : [], values : []})
    const [countClick, setCountClick] = useState(0)
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
    };

    const DisplayBy = async (date) => {

      try {
    
        setcurrentDate(date)

        const res = await Axios.get(`/statistic/orders-count/${date}`)

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
      
        <Line
          style={{
            height:'400px'
          }}
            data={{
              labels : Data.keys.map(item => item),
              datasets: [{
                  label : 'Orders',
                  data : Data.values,
                  backgroundColor : [
                      '#f02d34'
                  ],
                  borderColor : '#f02d34',
                  borderWidth :  2
              }]
            }}
          options={options}
        />

      </div>

    </div>

  )

}

export default Order_count