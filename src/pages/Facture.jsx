import React from 'react'
import { useStateContext } from '../context/StateContext'

const Facture = ({Info, newServices, total, TVAVis}) => {
    
    const {user} = useStateContext()

  return (
    <div className='py-8 fixed z-50 bg-white top-0 right-0 h-full w-full px-3 hidden print:block'>
        <div className='flex items-center'>

            <h1 className='font-bold w-full text-[30px] text-center'><i><u>Gite Dar Rihana Chefchaouen</u></i></h1>

        </div>

        <h2 className='text-[25px] text-center mt-6 font-bold'><u>FACTURE N° :</u></h2>

        <div className='mt-9 flex justify-around'>
            <h3 className='text-[23px] font-bold'><u>N° Dossier :</u> {Info.Ref}</h3>
            <h3 className='text-[23px] font-bold'><u>Date :</u> {
                new Date().toISOString().split('T')[0]
            }</h3>
        </div>
        <h3 className='text-[23px] text-center mt-5 font-bold'><u>Adresse :</u> {user.adress} </h3>

        <div className='mt-8'>

            <table className='w-full text-[20px]'>
                <thead className='border border-gray-800 rounded-lg'>
                    <tr>
                        <th className='border-r border-gray-800'>Date d'activité</th>
                        <th className='border-r border-gray-800'>SERVICES</th>
                        <th className='border-r border-gray-800'>PAX</th>
                        <th className='border-r border-gray-800'>U.P</th>
                        <th className='border-r border-gray-800'>Total</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        newServices.filter(item => item.service && item.up).map((item, index) => 
                            
                            <tr key={index} className=' '>
                                <td className='border-r border-l px-2 border-gray-800'>{index == 0 && Info?.date}</td> 
                                <td className='border-r px-2 text-nowrap border-gray-800'>{item?.service}</td>
                                <td className='border-r px-2 border-gray-800'>{item?.pax === 0 ? '' : item?.pax }</td>
                                <td className='border-r px-2 border-gray-800'>{item?.up === 0 ? '' : item?.up }</td>
                                <td className='border-r px-2 border-gray-800'>{item?.total === 0 ? '' : item?.total}</td>
                            </tr>
                            
                        )
                    }

                    <tr className='h-[200px]'>
                        <td className='border-r border-l border-gray-800'> </td>
                        <td className='border-r border-gray-800'> </td>
                        <td className='border-r border-gray-800'> </td>
                        <td className='border-r border-gray-800'> </td>
                        <td className='border-r border-gray-800'> </td>
                    </tr>

                    <tr className='border border-gray-800 rounded-lg'>
                        <td className='font-bold border-r border-gray-800 px-2' colSpan={4}>Total H.T</td>
                        <td className='px-2'>{TVAVis && (parseFloat(total))}</td>
                    </tr>
                    <tr className='border border-gray-800 rounded-lg'>
                        <td className='font-bold border-r border-gray-800 px-2' colSpan={4}>TVA(10%)</td>
                        <td className='px-2'>{ TVAVis && Math.round(parseFloat(total) * (10/100) * 100) / 100 }</td>
                    </tr>
                    <tr className='border border-gray-800 rounded-lg'>
                        <td className='font-bold border-r border-gray-800 px-2' colSpan={4}>Total GENERAL</td>
                        <td className='px-2'>{ (parseFloat(total)) + ( (parseFloat(total)) * (10/100)) }</td>
                    </tr>

                </tbody>

            </table>
        </div>
        <p className='py-2 text-[20px] font-semibold'>Arrêtée la présente facture à la somme de { parseFloat(total) + ( parseFloat(total) * (10/100)) } DH</p>
        <div className='mt-8 w-full'>
            <h5 className='text-[22px] font-bold text-center'>Votre Nom</h5>
            <h5 className='text-[22px] font-bold mt-3'>Bénéficiaire :</h5>
            <h5 className='text-[22px] font-bold mt-3'>Banque :</h5>
            <h5 className='text-[22px] font-bold mt-3'>Adresse :</h5>
            <h5 className='text-[22px] font-bold mt-3'>N° Compte :</h5>
            <div className='flex items-center justify-between'>
                <h5 className='text-[22px] font-bold mt-3'>Swift Code :</h5>
                {TVAVis && <h5 className='text-[20px] float-right font-bold mt-3'>N°Patient {user.patient}</h5>}
            </div>
        </div>
    </div>
  )
}

export default Facture