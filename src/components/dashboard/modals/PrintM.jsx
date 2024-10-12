import React, { useEffect } from "react";
import { useState } from "react";
import { FaPrint, FaUnderline } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Loading } from "../..";
import Axios from "../../../assets/constants/axios/axios";
import { validate_Price_in_print } from "../../../assets/constants/HelpFunctions";
import { Facture } from "../../../pages";

const Service = ({ Service, newServices, setNewServices }) => {
  
  const hundelChange = (value, type) => {

    const updatedServices = newServices.map((item) => {
      
      if (item.id == Service.id) {
        
        if (type == 'service') {

          return {
            ...item,
            service : value
          }

        }

        if (type == 'pax') {

          const total = item?.is_price_per_pers ? 
            item.up * parseInt(value || 0) 
            : 
            item.up

          const amount_expenses = item?.is_price_per_pers ?
            item?.amount_expenses_per_pers * parseInt(value || 0)
            :
            item?.amount_expenses_per_pers


          return {
            ...item,
            pax : item?.is_price_per_pers ? parseInt(value || 0) : 0,
            total : Math.round(total * 100) / 100,
            amount_expenses : Math.round(amount_expenses * 100) / 100,
            profit : Math.round((total - amount_expenses) * 100) / 100
          }

        }

        if (type == 'up') {

          const total  =  item?.is_price_per_pers ? 
          item.pax * (value || 0) 
          : 
          (value || 0)

          return {
            ...item,
            // id : item.id,
            up : (value || 0),
            total : Math.round(total * 100) / 100,
            profit : Math.round((total - item?.amount_expenses) * 100) / 100
          }

        }

        if (type == 'mp') {
          
          const amount_expenses = item?.is_price_per_pers ?
            item?.pax * (value || 0)
            :
            (value || 0)
        
          return {
            ...item,
            amount_expenses : Math.round(amount_expenses * 100) / 100,
            amount_expenses_per_pers : (value || 0),
            profit : Math.round((item?.total - amount_expenses) * 100) / 100,
          }

        }

        if (type == 'price_per_pers') {
          
          const total = !item?.is_price_per_pers ? item?.up * item?.pax : item?.up
          
          const amount_expenses = !item?.is_price_per_pers ? 
            item?.amount_expenses_per_pers * item?.pax
            :
            item?.amount_expenses_per_pers;
            
          return {
            ...item,
            is_price_per_pers : !item?.is_price_per_pers,
            amount_expenses : Math.round(amount_expenses * 100) / 100,
            total : Math.round(total * 100) / 100,
            profit : Math.round((total - amount_expenses) * 100) / 100 ,
            pax : 0
          }

        }

      }

      return item

    })

    setNewServices(updatedServices)

  }

  const removeService = () => {

    if (newServices.length === 1) {
      
      setNewServices([{
      id : newServices.length + 1,
      date: "",
      service: "",
      pax: 0,
      up: 0,
      total: 0,
      service_id : null,
      amount_expenses : 0,
      is_price_per_pers : 1,
      amount_expenses_per_pers : 0,
      profit : 0,
      err : {}
    }])

    } else {
      
      let id = 0
      const updatedServices = newServices.map((item) => {

        if (item.id !== Service.id) {
          
          id++
          return {
            ...item,
            id : id
          }

        }

      })
      setNewServices(updatedServices.filter(item => item != undefined))

    }

  }
  
  return (
    <div className="pt-2 pb-4 px-4 rounded-lg flex flex-col gap-5 border border-gray-600">
      
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <input id={`Price_per_pers_${Service.id}`} onChange={(e) => hundelChange(e.target.value, 'price_per_pers')} checked={Service?.is_price_per_pers} type='checkbox'/>
          <label htmlFor={`Price_per_pers_${Service.id}`} className="font-semibold">Prix pour personne</label>
        </div>

        {!Service.service_id && <IoMdCloseCircleOutline onClick={() => removeService()} className="text-red-500 cursor-pointer text-[20px]" />}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 relative">

        <div className="flex items-center w-full sm:w-[50%]">
          <label className="font-semibold w-1/4">Service {Service.id} </label>
          <input
            type="text"
            className="border w-full sm:w-3/4 rounded-lg border-gray-500 py-2 placeholder:text-gray-600 px-2"
            placeholder="Service"
            value={Service.service}
            disabled={Service.service_id != null}
            onChange={(e) => hundelChange(e.target.value, 'service')}
          />
        </div>

        
        <div className="flex items-center w-full sm:w-[50%]">
          <label className="font-semibold w-1/4">PAX </label>
          <input
            type="text"
            className="border w-full sm:w-3/4 rounded-lg border-gray-500 py-2 placeholder:text-gray-600 px-2"
            placeholder="PAX"
            value={Service.pax}
            onChange={(e) => hundelChange(e.target.value, 'pax')}
          />
        </div>

        
      </div>

      <div className="flex flex-col sm:flex-row gap-4">

        <div className="flex items-center w-full sm:w-[50%]">
          <label className="font-semibold w-1/4">U.P </label>
          <input
            type="text"
            className="border w-full sm:w-3/4 rounded-lg border-gray-500 py-2 placeholder:text-gray-600 px-2"
            placeholder="U.P"
            value={Service.up || 0}
            onChange={(e) => validate_Price_in_print(e.target.value, hundelChange, 'up')}
          />
        </div>
        
        <div className="flex items-center w-full sm:w-[50%]">
          <label className="font-semibold w-1/4">M.D</label>
          <input
            type="text"
            className="border w-full sm:w-3/4 rounded-lg border-gray-500 py-2 placeholder:text-gray-600 px-2"
            placeholder="M.P"
            onChange={(e) => validate_Price_in_print(e.target.value, hundelChange, 'mp')}
            value={Service?.amount_expenses_per_pers || 0}
            disabled={Service.service_id}
          />
        </div>

      </div>

      <div className="flex flex-col gap-4">

        <div className="flex items-center w-full">
          <label className="font-semibold w-1/4">Total U.P</label>
          <input
            type="text"
            className="border w-full sm:w-3/4 rounded-lg border-gray-500 py-2 placeholder:text-gray-600 px-2"
            placeholder="Prix Total"
            disabled
            value={Service.total}
          />
        </div>

        <div className="flex items-center w-full">
          <label className="font-semibold w-1/4">Total M.D</label>
          <input
            type="text"
            className="border w-full sm:w-3/4 rounded-lg border-gray-500 py-2 placeholder:text-gray-600 px-2"
            placeholder="Prix Total"
            disabled
            value={Service.amount_expenses}
          />
        </div>

        <div className="flex items-center w-full">
          <label className="font-semibold w-1/4">Profit</label>
          <input
            type="text"
            className="border w-full sm:w-3/4 rounded-lg border-gray-500 py-2 placeholder:text-gray-600 px-2"
            disabled={true}
            value={Service.profit}
          />
        </div>

      </div>

      <div className="font-semibold text-red-500">
        <p>{Service?.err?.service}</p>
        <p>{Service?.err?.pax}</p>
        <p>{Service?.err?.up}</p>
      </div>
    </div>
  );
};

const PrintM = ({ closeModal, header, event, setEvenements, Evenements }) => {

  const [IsLoading, setIsLoading] = useState(true)

  const [Info, setInfo] = useState({
    Ref: event?.Ref,
    date: event?.Date,
    adresse: "Orion Trek voyages",
  });

  const [newServices, setNewServices] = useState([]);
  const [TVAVis, setTVAVis] = useState(false)

  const [Total, setTotal] = useState(0)
  const [TotalProfit, setTotalProfit] = useState(0)

  useEffect(() => {
    
    let TotalNS = newServices.reduce((sum, item) => {
      return sum + parseFloat(item.total || 0)
    }, 0)

    let TotalProfit = newServices.reduce((sum, item) => {
      return sum + parseFloat(item.profit || 0)
    }, 0)

    setTotal(parseFloat(TotalNS))
    setTotalProfit(parseFloat(TotalProfit))

  }, [newServices])

  
  useEffect(() => {
  
      (async()=>{
          
          try {
            
            const res = await Axios.get('/reservation/get-services/' + event?.id)
  
            if (res.status == 200) {
              
              if (res.data.length > 0) {

                let services = [];

                res.data.map(item => { 
                  
                  const facture_price = item.price_per_pers ?
                    Math.round(item?.facture_price / item?.num_pers * 100) / 100 
                      : 
                    Math.round(item?.facture_price * 100) / 100 || 0;

                  const amount_expenses = item?.origin_price
                  
                  const profit = Math.round((item?.facture_price - item?.origin_price) * 100 ) / 100

                  services.push({
                    id : services.length + 1,
                    service_id : item.id || null,
                    date: "",
                    service : item.service || '',
                    is_price_per_pers : item.price_per_pers,

                    amount_expenses : amount_expenses,
                    amount_expenses_per_pers : item.price_per_pers ?
                      Math.round((item?.origin_price / item?.num_pers) * 100) / 100
                        : 
                      Math.round(item?.origin_price * 100) / 100 || 0,

                    up: facture_price,

                    pax: item?.num_pers || 0,
                    total: Math.round(item.facture_price * 100) / 100 || 0,
                    profit : profit,
                    err : {}
                  })
                })

                setNewServices(services)

              }
              
            }
  
          } catch (error) {
            console.log(error);
          }

          setIsLoading(false)
  
      })()

  }, [])

  const addNewService = () => {
    
    setNewServices([...newServices, {
      id : newServices.length + 1,
      date: "",
      service: "",
      pax: event?.pers,
      up: 0,
      total: 0,
      service_id : null,
      amount_expenses : 0,
      is_price_per_pers : 1,
      amount_expenses_per_pers : 0,
      profit : 0,
      err : {}
    }])

  }

  const createOrUpdateServices = async(id) => {

    if (newServices.length > 0) {

        let error = false

        const updatedServices = newServices.map((item) => {
          
            let errors = {}
            
            if (item.service == '') {
              error = true
              errors = {
                ...errors,
                service : 'Le champ service est obligatoire'
              }
            }

            // if (item.pax == 0 && item?.is_price_per_pers) {
            //   error = true
            //   errors = {
            //     ...errors,
            //     pax : 'Le champ PAX est obligatoire'
            //   }
            // }

            if (item.up == 0) {
              error = true
              errors = {
                ...errors,
                up : 'Le champ U.P est obligatoire'
              }
            }

          return {
            ...item,
            err : errors
          }

        })

        setNewServices(updatedServices)

        if (!error) {
          
          try {
            
            const res = await Axios.post('/reservation/services/' + event?.id, {
              services : newServices
            })

            if (res.status == 200) {
              
              const updateArray = Evenements?.map(item => {

                if (item.id == event?.id) {
                  return {
                    ...item,
                    benefit : res.data.profit,
                    Amount : res.data.amount_expenses
                  }
                }

                return item

              })

              setEvenements(updateArray)

              window.print()

              closeModal(false)

            }

          } catch (error) {
            console.log(error);
          }

        }

    }

  }

  return (
    <div className="fixed top-0 h-screen z-50 right-0 w-full flex justify-center items-center">
      <div className="fixed top-0 right-0 z-30 w-full h-screen bg-slate-500 opacity-60" />

      <div className="bg-white relative w-[98%] sm:w-[90%] md:w-[85%] lg:w-[70%] z-50 rounded-lg">
        {
          IsLoading ? <div className="h-[70vh]"><Loading/></div> : 
          <>
            <div className="flex items-center justify-between p-3">
              <h1 className="text-[28px] font-bold">{header}</h1>
              <button onClick={() => closeModal(false)}>
                <IoMdCloseCircleOutline fontSize={25} />
              </button>
            </div>
    
            <hr className="border-gray-600" />
    
            <div className="flex flex-col max-h-[87vh] overflow-y-scroll hide-scrollbar gap-5 p-2 sm:p-3">
    
              {
                newServices.map((item, index) => (
                  <Service key={index} Service={item} newServices={newServices} setNewServices={setNewServices}/>
                ))
              }
    
              <div className=" self-end">
                <button onClick={() => addNewService()} className="border-second border rounded-lg bg-transparent hover:bg-second hover:text-white transition-all text-second font-semibold py-2 px-3">
                  Ajoute Service
                </button>
              </div>

    
              <hr className="border-gray-600" />

              <div className=" flex flex-col gap-5">

                <div className="flex flex-col md:flex-row gap-3 items-center">
                  
                  <div className="flex items-center w-full sm:w-[50%]">
                    <label className="font-semibold w-1/4">Prix H.T</label>
                    <input
                      type="text"
                      className="border w-full sm:w-3/4 rounded-lg border-gray-500 py-2 placeholder:text-gray-600 px-2"
                      placeholder="Service"
                      value={Total}
                      disabled={true}
                    />
                  </div>

                  <div className="flex items-center w-full sm:w-[50%]">
                    <label className="font-semibold w-1/4">TVA</label>
                    <input
                      type="text"
                      className="border w-full sm:w-3/4 rounded-lg border-gray-500 py-2 placeholder:text-gray-600 px-2"
                      placeholder="Service"
                      value={Math.round((Total * 10/100) * 100 ) / 100}
                      disabled={true}
                    />
                  </div>

                </div>

                <div className="flex items-center w-full ">
                  <label className="font-semibold w-1/4">P.T Facture</label>
                  <input
                    type="text"
                    className="border w-full sm:w-3/4 rounded-lg border-gray-500 py-2 placeholder:text-gray-600 px-2"
                    value={Math.round((Total * 10/100 + Total) * 100 ) / 100}
                    disabled={true}
                  />
                </div>

                <div className="flex items-center w-full ">
                  <label className="font-semibold w-1/4">Profit</label>
                  <input
                    type="text"
                    className="border w-full sm:w-3/4 rounded-lg border-gray-500 py-2 placeholder:text-gray-600 px-2"
                    value={TotalProfit}
                    disabled={true}
                  />
                </div>


              </div>
              
              <div className="flex items-center gap-3">
                <input id="tva" type='checkbox' value={TVAVis} onChange={() => setTVAVis(!TVAVis)}/>
                <label className="font-semibold" htmlFor="tva">Afficher la TVA en facture</label>
              </div>

              <hr className="border-gray-600" />
    
              <div className="mx-auto">
                <button
                  onClick={() => createOrUpdateServices()}
                  className="bg-second py-2 px-4 rounded-lg font-semibold flex gap-2 items-center text-white"
                >
                  <FaPrint />
                  Imprimer
                </button>
              </div>
            </div>
          </>
        }
      </div>

      <Facture total={Math.round(Total * 100) / 100} newServices={newServices} TVAVis={TVAVis} Info={Info}/>
    </div>
  );
};

export default PrintM;
