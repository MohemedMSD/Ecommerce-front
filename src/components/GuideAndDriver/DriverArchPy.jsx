import React from 'react'
import { DAPRow } from '..'


const DriverArchPy = ({
  action, 
  setPayPrice, 
  setDriverWorks,
  DriverWorks,
  MonthSearch,
  setcurrent_page,
  setCall
}) => {


  return (
    <table className="w-full mt-1">
      <thead className="border-b border-gray-400">
        <tr>
        <th className="p-2 w-[29%] text-[16px]">Mois</th>
        <th className="p-2 w-[29%] text-[16px]">Montant</th>
        <th className="p-2 w-[29%] text-nowrap text-[16px]">Date de paiement</th>
        { action != 'show' && <th className='w-[11%]'>A</th>}
        </tr>
      </thead>

      <tbody>
        {DriverWorks.map((item, index) => (
            item && 
            <DAPRow 
              key={index} 
              action={action} 
              setPayPrice={setPayPrice} 
              setDriverWorks={setDriverWorks}
              DriverWorks={DriverWorks}
              MonthSearch={MonthSearch} 
              setcurrent_page={setcurrent_page}
              setCall={setCall}
              item={item}
            />
        ))}
      </tbody>
    </table>
  )
}

export default DriverArchPy