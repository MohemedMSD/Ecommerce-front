import React, {
    createContext,
    useContext
  } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import Axios from "../assets/constants/axios/axios";

  const Context = createContext();
  
  const FunctionsContextPaginationGD = ({ children }) => {

    const [itemsPerPage, setitemsPerPage] = useState(5)
    const [SearchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, settotalPages] = useState();
    
    const goToPreviousPage = (current_page, setcurrent_page, setCall) =>{

      let call = false

      if (current_page - 1 <= 0) {
        setcurrent_page(1)
      }else{

        setcurrent_page(current_page - 1)
        call = true

      }

      if (call) {
        setCall(true)
      }

    }

    const goToNextPage = (current_page, setcurrent_page, setCall, totalPages) =>{

      let call = false

      if (current_page + 1 > totalPages) {
        setcurrent_page(totalPages)
      }else{

        setcurrent_page(current_page + 1)
        call = true

      }

      if (call) {
        setCall(true)
      }

    }

    const goToPage = (page) => {

        if(page > currentPage){

            setCurrentPage(prevPage => Math.min(prevPage + page - currentPage, totalPages));

        }else if (page < currentPage) {

            let pageNumber = currentPage - page
            setCurrentPage(prevPage => Math.min(prevPage - pageNumber, totalPages));

        }

    };

    const PrepareArrayItems = (Array, setArray) => {

        // Calculate the total number of pages
        const total_pages = Math.ceil(Array.length / itemsPerPage)

        settotalPages(total_pages);

        // Slice the list of products to display only the items for the current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // set Products do listed in One page
        setArray(Array.slice(startIndex, endIndex))
        
    }

    // runder number of pages and check for not call again when user in same page
    
    const checkPage = (currentPage, setCurrentPage, num_page, setCall) => {

      let call = false;
      
      if (currentPage != num_page) {
        
        setCurrentPage(num_page)
        call = true

      }

      if (call) {
        setCall(true)
      }

    }

    const renderPages = (currentPage, totalPages, setCurrentPage, setCall) => {

      const maxPagesVisible = 3;
      const pages = []

      for (let i = 1; i <= totalPages; i++) {
        
        if (i <= maxPagesVisible || i == currentPage || i + 1 == currentPage || i - 1 == currentPage || i == totalPages) {
          pages.push(
            <li key={i}>
              <button
                onClick={() =>checkPage(currentPage, setCurrentPage, i, setCall)}
                href="#"
                className={`block ${
                currentPage === i
                  ? "border-second bg-second text-white"
                  : "border-gray-100 bg-white text-gray-900"
                } size-8 rounded border text-center leading-8 `}
              >
                {i}
              </button>
            </li>
          )
        }else if(pages[pages.length - 1] != '...'){
          pages.push('...')
        }
        
      }
      
      return pages
    }

    const getDriversAndGuides = async(
      type, 
      setArray, 
      SearchQuery, 
      current_page, 
      setCall, 
      seterrorMessage, 
      settotalPages, 
      setIsLoading
    )=>{
      setIsLoading(true)
      try {

        const res = await Axios.get(`/${type}/${SearchQuery || 'null'}/${current_page}`);

        if (res.status == 200) {

          if (res?.data?.drivers?.length > 0 || res?.data?.guides?.length > 0) {

            seterrorMessage("");
            setArray(res?.data?.drivers || res?.data?.guides);
            settotalPages(res.data.total_pages)

          } else {
            setArray([]);
            settotalPages(0)
            seterrorMessage(`Aucun ${type == 'drivers' ? 'chauffeurs' : 'guides' }  n'existe`);
          }

        }
      
      } catch (rej) {
        console.log(rej);
        setArray([]);
        settotalPages(0)
        seterrorMessage("Parfois mal, veuillez réessayer");

      }

      setCall(false)
      setIsLoading(false)

    }

    const getDGWorkOrArchivePayement = async(
      type, 
      setArray,
      current_page, 
      setcurrent_page, 
      SearchType, 
      MonthSearch,
      setTotalPrice,
      setPayPrice,
      setProcessing,
      Pers_id,
    ) => {
      
      setProcessing(true)

      let error = false;
      let YearRegex = /^\d{4}$/;
      let MonthRegex = /^\d{4}-\d{2}$/;
      
      if (MonthSearch == '') {
        error = true
        toast.error('La date de recherche est obligatoire')
      }else if(!YearRegex.test(MonthSearch) && !MonthRegex.test(MonthSearch)){
        error = true
        toast.error('La date de recherche doit étre sous la forme date ex: YYYY-MM ou YYYY')
      }

      if (!error) {

        setcurrent_page(current_page)

        if (SearchType == 'works') {
        
          try {
  
            toast.loading('Recherche..')
            
            let res ;

              res = await Axios.get(`/${type}/work/${Pers_id}/${MonthSearch || 'null'}/${current_page}`)


            if (res.status == 200) {
              
              toast.dismiss()
              
              if (res.data.work.length > 0) {

                setArray(res.data.work)
                settotalPages(res.data.total_pages)

              }else {

                toast.success('Il n\'a pas de travail sur ce mois')
                setArray([])
                settotalPages(0)

              }

                setTotalPrice(res?.data?.amount?.total_amount || 0)
                setPayPrice(res?.data?.amount?.paid_amount || 0)


            }
  
          } catch (error) {
            toast.dismiss()

            if (error.response?.status === 422) {

              toast.error(error.response?.data?.date)

            }else{
              toast.error('Parfois mal, veuillez reessayer')
            }
          }
  
        }

        if (SearchType == 'ArchivePay') {
        
          try {
  
            toast.loading('Recherche..')
  
            const res = await Axios.get(`/${type}/payements/${Pers_id}/${MonthSearch || 'null'}/${current_page}`)
            
            if (res.status == 200) {
              
              toast.dismiss()
              
              if (res.data.payements.length > 0) {

                setArray(res.data.payements)
                settotalPages(res.data.total_pages)

              }else {

                toast.success('Il n\'a pas de paiements sur ce mois')
                setArray([])
                settotalPages(res.data.total_pages)

              }

              setTotalPrice(res?.data?.amount?.total_amount)
              setPayPrice(res?.data?.amount?.paid_amount)

            }
  
          } catch (error) {
            toast.dismiss()
            toast.error('Parfois mal, veuillez reessayer')

          }
  
        }

      }

      setProcessing(false)

    }

    return (
      <Context.Provider
        value={{
            currentPage,
            itemsPerPage,
            totalPages,
            SearchQuery,
            goToNextPage,
            setCurrentPage,
            goToPreviousPage,
            goToPage,
            settotalPages,
            setitemsPerPage,
            PrepareArrayItems,
            renderPages,
            getDriversAndGuides,
            getDGWorkOrArchivePayement
        }}
      >
        {children}
      </Context.Provider>
    );
  };
  
  export default FunctionsContextPaginationGD;
  
  export const useFunctionsContextPaginationGD = () => useContext(Context);
  