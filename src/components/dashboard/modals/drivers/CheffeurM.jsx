import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import toast from 'react-hot-toast';
import { FaSearch } from 'react-icons/fa';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { DriverArchPy, DriverPyInfo } from '../../..';
import Axios from '../../../../assets/constants/axios/axios';
import { validate_Price } from '../../../../assets/constants/HelpFunctions';
import { useFunctionsContextPaginationGD } from '../../../../context/StatePaginateGuideDriver';

const CheffeurM = ({Driver, Drivers, header, action, closeModal, setDrivers, seterrorMessage}) => {

  const {
    settotalPages, 
    totalPages, 
    renderPages,
    goToNextPage,
    goToPreviousPage,
    getDGWorkOrArchivePayement
  } = useFunctionsContextPaginationGD()

    const [Name, setName] = useState('');
    const [ErrName, setErrName] = useState('');

    const [Phone, setPhone] = useState(0);
    const [ErrPhone, setErrPhone] = useState('');
    
    const [DriverWorks, setDriverWorks] = useState([]);

    // this for paginate of works or payements
    const [current_page, setcurrent_page] = useState(1);

    // this for call function for get works or payements
    const [call, setCall] = useState(false)
/* 
    the two next states :
      - the first 'SearchQuery' for search and its value set from 'StockSearchQuery'
      in click for search
      - the second 'StockSearchQuery' set its value on change the search input
      - all this for in change value of search input and go to next page before click on earch button
      not get the data with the new value of search input
  */
    const [MonthSearch, setMonthSearch] = useState('')
    const [StockMonthSearch, setStockMonthSearch] = useState('')
    const [SearchType, setSearchType] = useState('')

    const [RunOneTime, setRunOneTime] = useState(true)

    const [processing, setProcessing] = useState(false);

    const [TotalPrice, setTotalPrice] = useState(0)
    const [PayPrice, setPayPrice] = useState(0)
    const [AmoutAdded, setAmoutAdded] = useState(0)

    const [PayDate, setPayDate] = useState('')
    const [ErrPayDate, setErrPayDate] = useState('')

    // fill data in form
    useEffect(()=>{

      (async()=>{

        if (RunOneTime) {

            if (action === 'update' || action === 'show' && Driver) {
                
                setName(Driver?.name)
                setPhone(Driver?.phone)
    
            }

            setRunOneTime(false)

        }

      })()

    }, [])

    useEffect(()=>{

      if (call) {
        
        getDGWorkOrArchivePayement(
          'drivers', 
          setDriverWorks,
          current_page, 
          setcurrent_page, 
          SearchType, 
          MonthSearch,
          setTotalPrice,
          setPayPrice,
          setProcessing,
          Driver.id,
        )
        setCall(false)

      }

    }, [call])

    const updateDriver = async (e, id) => {
      e.preventDefault()

      setProcessing(true)
      toast.loading('Le traitement est en cours...')

      try {

        const res = await Axios.post('/drivers/' + id,{
          _method : 'PUT',
          name : Name,
          phone : Phone,
          amountAdded : parseFloat(AmoutAdded),
          payDate : PayDate
        })
        
        if (res.status === 200) {
          
          setErrName('')
          setErrPayDate('')
          setErrPhone('')

          const UpdatedDrivers = Drivers.map((item) => {
            
            if (item.id == id) {
              
              return {
                ...item,
                name : Name,
                phone : Phone,
              }
            }

            return item

          })

          setDrivers(UpdatedDrivers)
          seterrorMessage('')

          const last_archive_payement = res.data?.data?.last_archive_payement

          // check if user in Archive payement to add new payemnt in array
          if (SearchType == 'ArchivePay' && last_archive_payement?.id) {

            const checkIfExistsArchive = DriverWorks.filter(item => item.id == res?.data?.data?.last_archive_payement?.id)

            if (checkIfExistsArchive.length == 0 && last_archive_payement.duration.includes(MonthSearch) ){
              
              setcurrent_page(1)
              setCall(true)

            }

          }

          if (last_archive_payement.duration.includes(MonthSearch)) {
            setPayPrice(pre => parseFloat(pre)  + parseFloat(AmoutAdded))
          }

          setAmoutAdded(0)

          toast.dismiss()
          toast.success('Chauffeur mise à jour avec succés')

        }

      } catch (rej) {
        
        toast.dismiss()

        if (rej.response.status === 422) {
          
          const messages = rej.response.data;
          
          if (messages.name ) {
            setErrName(messages.name)
          }else{
            setErrName('')
          }
          
          if (messages.phone ) {
            setErrPhone(messages.phone)
          }else{
            setErrPhone('')
          }

          setErrPayDate(messages.payDate || messages.workNotFound || '')

        }else{
          toast.error('Parfois mal, veuillez réessayer')
        }

      }
      
      setProcessing(false)

    }

    const hundelChange = (e) => {
    
      const regex = /^\d{0,4}$/;
      
      if (regex.test(e.target.value) || e.target.value == '') {
        
        setStockMonthSearch(e.target.value)
  
      }
  
    }

    const GetWorksOrPayements = () => {

      setDriverWorks([])
      setMonthSearch(StockMonthSearch)
      setcurrent_page(1)
      setCall(true)

    }


  return (
    
    <div className="fixed capitalize top-0 h-screen right-0 w-full flex justify-center items-center">
      <div className="fixed top-0 right-0 z-30 w-full h-screen bg-slate-500 opacity-60" />

      <div className="bg-white w-[98%] sm:w-[70%] lg:w-[55%] z-50 rounded-lg ">

        <div className="flex items-center justify-between p-3">
          <h1 className="text-[24px] sm:text-[26px] md:text-[28px] font-bold">{header}</h1>
          <button onClick={() => closeModal(false)}><IoMdCloseCircleOutline fontSize={25}/></button>
        </div>

        <hr className="border-gray-600" />

        <div className="flex flex-col gap-3 p-2 max-h-[88vh] hide-scrollbar overflow-y-scroll sm:p-5">

          <div className="border border-gray-400 p-2 rounded-lg">
            <h1 className="text-[21px] sm:text-[24px] md:text-[26px] text-primary_text font-bold">
              Informations sur chauffeur
            </h1>
            <div action="" className="relative flex flex-col gap-4 mt-3 p-2">

              <div className="flex flex-col">
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                    <label className=" w-full sm:w-1/4">Nom</label>
                    <input
                    type="text"
                    disabled={action === 'show'}
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    className={` ${ErrName ? 'border-red-500' : 'border-gray-400'} border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
                    />
                </div>
                { ErrName && <p className="text-red-500 font-semibold ml-[25%] px-4 py-1">{ErrName}</p>}
              </div>

              <div className="flex flex-col">
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                    <label className=" w-full sm:w-1/4">Telephone</label>
                    <input
                    type="text"
                    disabled={action === 'show'}
                    value={Phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={` ${ErrPhone ? 'border-red-500' : 'border-gray-400'} border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
                    />
                </div>
                { ErrPhone && <p className="text-red-500 font-semibold ml-[25%] px-4 py-1">{ErrPhone}</p>}
              </div>

              {
                action != 'create' && (
                  <>
                    <div className='p-2 border border-gray-300 rounded-lg'>
                      <h2 className='text-center font-semibold text-[19px]'>Travail et Paiements</h2>
                      
                        <div className='flex flex-col border gap-3 items-start justify-between border-gray-500 p-2 mt-2 rounded-lg'>
                        
                          <div className='flex flex-col lg:flex-row w-full gap-3 items-start sm:items-center justify-between'>

                            <input value={StockMonthSearch} placeholder="Recharcher par année" className='border w-full border-gray-300 p-2 rounded-lg' onChange={(e) => hundelChange(e)} type='text'/>
                            <input value={StockMonthSearch} className='border w-full border-gray-300 p-2 rounded-lg' onChange={(e) => setStockMonthSearch(e.target.value)} type='month'/>

                          </div>
                          
                          <div className='flex flex-col sm:flex-row w-full gap-5'>
                            
                            <div className='flex w-full flex-col gap-2 sm:flex-row'>

                              <div className='flex w-full items-center gap-2'>
                                <input id='work' type='radio' checked={SearchType == 'works'} value='works' name='type' onChange={(e) => setSearchType((pre) => { setDriverWorks([]); setTotalPrice(0); setPayPrice(0); setcurrent_page(1); return e.target.value})} />
                                <label htmlFor='work'>Travail</label>
                              </div>

                              <div className='flex w-full items-center gap-2'>
                                <input id='archive' type='radio' checked={SearchType == 'ArchivePay'} value='ArchivePay' name='type' onChange={(e) => setSearchType((pre) => { setDriverWorks([]); setTotalPrice(0); setcurrent_page(1); setPayPrice(0); return e.target.value})} />
                                <label htmlFor='archive'>Paiemenets financiers</label>
                              </div>

                            </div>

                            <button disabled={processing} onClick={() => GetWorksOrPayements()} className='bg-second p-2 rounded-lg font-bold text-white w-fit'><FaSearch/></button>

                          </div>
                      
                        </div>
      
                      {
                        (SearchType == 'works' ) && DriverWorks?.length > 0 && (
                          <div className='overflow-x-scroll hide-scrollbar'>
                            <DriverPyInfo DriverWorks={DriverWorks}/>
                          </div>
                        )
                      }
      
                      {
                        SearchType == 'ArchivePay' && DriverWorks?.length > 0 && (
                          <div className='overflow-x-scroll hide-scrollbar'>
                            <DriverArchPy
                              action={action} 
                              MonthSearch={MonthSearch} 
                              setPayPrice={setPayPrice} 
                              setDriverWorks={setDriverWorks} 
                              DriverWorks={DriverWorks}
                              setcurrent_page={setcurrent_page}
                              setCall={setCall}
                            />
                          </div>
                        )
                      }
      
                      {
                        DriverWorks?.length > 0 && (
                          <div className="p-5 border-gray-300 px-3 flex items-center gap-4 justify-center">
                              <ol className="flex justify-center gap-1 text-[16px] font-medium">
                                  <li>
                                  <button
                                      onClick={() => goToPreviousPage(current_page, setcurrent_page, setCall)}
                                      className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                                  >
                                      <span className="sr-only">Prev Page</span>
                                      <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-3 w-3"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      >
                                      <path
                                          fillRule="evenodd"
                                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                          clipRule="evenodd"
                                      />
                                      </svg>
                                  </button>
                                  </li>
                                  {renderPages(current_page, totalPages, setcurrent_page, setCall)}
                                  
                                  <li>
                                  <button
                                      onClick={() => goToNextPage(current_page, setcurrent_page, setCall, totalPages)}
                                      className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                                  >
                                      <span className="sr-only">Next Page</span>
                                      <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-3 w-3"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      >
                                      <path
                                          fillRule="evenodd"
                                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                          clipRule="evenodd"
                                      />
                                      </svg>
                                  </button>
                                  </li>
                              </ol>
                          </div>
                        )
                      }
      
      
                    </div>
      
                    {
                      DriverWorks && (
                        <div className='p-2 border border-gray-300 flex flex-col gap-3 rounded-lg'>
                          <div className='flex flex-col sm:flex-row items-center w-full gap-2 sm:gap-0'>
                            <label className='font-semibold w-full sm:w-1/4'>Montant Total</label>
                            <input type='text' className='border w-full sm:w-3/4 border-gray-400 rounded-lg p-2' disabled value={TotalPrice}/>
                          </div>
                          <div className='flex flex-col sm:flex-row items-center w-full gap-2 sm:gap-0'>
                            <label className='font-semibold w-full sm:w-1/4'>Montant Payé</label>
                            <input type='text' className='border w-full sm:w-3/4 border-gray-400 rounded-lg p-2' disabled value={PayPrice}/>
                          </div>
                          {
                            (action != 'show')  && (
                              <>
                                <div className='flex flex-col sm:flex-row w-full items-center gap-2 sm:gap-0'>
                                  <label className='font-semibold w-full sm:w-1/4'>Mois</label>
                                  <input type='month' className={`${ErrPayDate != '' ? 'border-red-500' : 'border-gray-400' } border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`} onChange={(e) => setPayDate(e.target.value)} value={PayDate}/>
                                </div>
                                { ErrPayDate && <p className="text-red-500 normal-case font-semibold ml-[25%]">{ErrPayDate}</p>}
                                <div className='flex flex-col sm:flex-row w-full items-center gap-2 sm:gap-0'>
                                  <label className='font-semibold w-full sm:w-1/4'>Ajoute Montant</label>
                                  <input type='text' className='border w-full sm:w-3/4 border-gray-400 rounded-lg p-2' onChange={(e) => validate_Price(e.target.value, setAmoutAdded)} value={AmoutAdded}/>
                                </div>
                              </>
                            )
                          }
                        </div>
                      )
                    }

                  </>
                )
              }

              {
                action === 'update' && <button disabled={processing} onClick={(e) => updateDriver(e, Driver.id)} className="p-2 mx-auto w-full sm:w-fit font-semibold bg-second text-white rounded-md">Enregistrer</button>
              }
              {
                action === 'show' && 
                <button onClick={(e) => closeModal(false)} className="p-2 mx-auto w-full sm:w-fit font-semibold bg-gray-500 text-white rounded-md">Fermer</button>
              }

            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default CheffeurM