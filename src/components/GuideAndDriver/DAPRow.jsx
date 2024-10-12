import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import Swal from "sweetalert2";
import Axios from "../../assets/constants/axios/axios";
import { validate_Price } from "../../assets/constants/HelpFunctions";

const DAPRow = ({
  action, 
  item, 
  setPayPrice, 
  setDriverWorks,
  DriverWorks,
  MonthSearch,
  setcurrent_page,
  setCall
}) => {
    
    const [InEdit, setInEdit] = useState(false)

    const [Duration, setDuration] = useState('')
    const [Amount, setAmount] = useState('')
    const [Created_at, setCreated_at] = useState('')
    
    useEffect(()=>{
      setInEdit(false)
    }, [MonthSearch])

    const prepareToEdit = (data) => {

        setAmount(data.amount)
        setDuration(data.duration)
        setCreated_at(data.paid_date.slice(0, 10))
        setInEdit(true)

    }

    const update = async(id, oldDuration) => {


      if (Amount > 0) {
        toast.loading('Le traitement est en cours...')
        try {
            
            const res = await Axios.post('/archive-payements/' + id, {
              _method : 'PUT',
              duration : Duration,
              amount : Amount,
              date : Created_at
            });

            const UpdatedArray = DriverWorks.map((item, index)=>{

                if (item.id == id) {
                  
                  if (res.data.duration.includes(MonthSearch)) {

                    setPayPrice(pre => (pre - item.amount) + parseFloat(res.data.amount))
                    
                    return {
                      ...item,
                      amount : res.data.amount,
                      duration : res.data.duration,
                      paid_date : res.data.paid_date
                    }

                  }else{

                    setPayPrice(pre => pre - parseFloat(res.data.amount))
                    return null
                    
                  }

                }

                return item

            })

            toast.dismiss()
            toast.success('Paiement ajouté avec succés')
            setInEdit(false)
            
            if (
              UpdatedArray.filter(item => { return item != null }).length < DriverWorks.length
            ) {
              setcurrent_page(1)
              setCall(true)
            }else{
              setDriverWorks(UpdatedArray)
            }

        } catch (error) {
          
            toast.dismiss()
            toast.error(error.response.data.msg || 'Parfois mal, veuillez réessayer')
        }
      }else{
        toast.error('Le montant doit étre supérieur de 0')
      }


    }
    
    const deletePayement = (id, amount) => {

      Swal.fire({
        title: 'Voulze-vous supprimer ce paiement ?',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Oui",
        icon: "warning",
      }).then(async (response) => {
  
        if (response.isConfirmed) {

          toast.loading('Le traitement est en cours...')

          try {
            
            const res = await Axios.post('/archive-payements/' + id, {
              _method : 'DELETE',
            });
            
            if (res.status == 200) {
              
              const updatedArray = DriverWorks?.filter(item => item.id != id)

              if (updatedArray.length == 0) {
                
                setcurrent_page(pre => {

                  if(pre - 1 <= 0) return 1
                  return pre - 1

                })
                
                setCall(true)

              }else{
                setCall(true)
              }

              setPayPrice(pre => pre - amount)

              toast.dismiss()
              toast.success('Paiement supprimé avec succés')

            }

          } catch (error) {
            
            toast.dismiss()
            toast.error('Parfois mal, veuillez réessayer')

          }

        }
      
      })

    }

  return (
    <tr className="border-b border-gray-400 hover:bg-gray-200">
      <td className="py-1 border-x text-nowrap px-2 md:border-none border-gray-400 text-center">
        {InEdit ? <input type="month" className="border w-[89%] px-2 border-gray-500 rounded-lg" onChange={(e) => setDuration(e.target.value)} value={Duration} /> : item?.duration}
      </td>
      <td className="py-1 border-x text-nowrap px-2 md:border-none border-gray-400 text-center">{
        InEdit ? <input type="text" className="border w-[89%] text-center border-gray-500 rounded-lg" onChange={(e) => validate_Price(e.target.value, setAmount)} value={Amount || 0} /> : item?.amount
      }</td>
      <td className="py-1 border-x text-nowrap px-2 md:border-none border-gray-400 text-center">{
        item?.paid_date
      }</td>

      {

        action != 'show' && (

          <td className=" border-x md:border-none px-2 border-gray-400">
            {InEdit ? (
              <div className="flex gap-2 items-center">
                <FaCheck onClick={() => update(item.id, item?.duration)} fontSize={18} className="text-second cursor-pointer" />
                <IoMdClose
                fontSize={20}
                  className="text-second cursor-pointer"
                  onClick={() => setInEdit(false)}
                />
              </div>
            ) : (
              <div className="flex gap-3">
    
                <FaEdit className="cursor-pointer" fontSize={20} onClick={() => prepareToEdit({duration : item.duration, amount : item.amount, paid_date : item.paid_date})} />
                <FaTrash className="cursor-pointer text-red-500" fontSize={18} onClick={() => deletePayement(item?.id, item?.amount)} />
              </div>
            )}
          </td>

        )

      }

    </tr>
  );
};

export default DAPRow;
