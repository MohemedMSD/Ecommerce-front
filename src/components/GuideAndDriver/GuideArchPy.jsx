import React from 'react'
import { GAPRow } from '..'


const GuideArchPy = ({
  action, 
  setPayPrice, 
  MonthSearch,
  GuideWorks,
  setGuideWorks,
  setcurrent_page,
  setCall
}) => {


  return (
    <table className="w-full mt-1">
      <thead className="border-b">
        <tr>
          <th className="p-2 w-[29%] text-[16px]">Mois</th>
          <th className="p-2 w-[29%] text-[16px]">Motant</th>
          <th className="p-2 w-[29%] text-nowrap text-[16px]">Date de paiement</th>
          { action != 'show' && <th className='w-[11%]'>A</th>}
        </tr>
      </thead>

      <tbody>
        {GuideWorks.map((item, index) => (
            item && 
            <GAPRow 
              key={index} 
              action={action} 
              MonthSearch={MonthSearch} 
              setPayPrice={setPayPrice} 
              GuideWorks={GuideWorks}
              setGuideWorks={setGuideWorks}
              setcurrent_page={setcurrent_page}
              setCall={setCall}
              item={item}
            />
        ))}
      </tbody>
    </table>
  )
}

export default GuideArchPy