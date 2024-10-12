import React, { useEffect, useState } from 'react'
import { FaEdit, FaEye, FaSearch } from 'react-icons/fa';
import Axios from '../assets/constants/axios/axios';
import { Loading, EvenementM } from '../components';
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { useFunctionsContext } from '../context/FunctionsContext';

const EventsRaports = () => {

  const {goToPreviousPage, goToNextPage, goToPage, renderPages, PrepareArrayItems, setCurrentPage, currentPage, totalPages, setitemsPerPage} = useFunctionsContext()
  // const {Evenements, setEvenements, FilteredEvenements, setFilteredEvenements} = useStateContext()

  const [Evenements, setEvenements] = useState([])
  const [FilteredEvenements, setFilteredEvenements] = useState([])

  const [RunOneTime, setRunOneTime] = useState(true);

  const [IsLoading, setIsLoading] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  
  const [currentEvenements, setcurrentEvenements] = useState([]);

  const [SearchQuery, setSearchQuery] = useState(null);
  const [SearchDate, setSearchDate] = useState(null);

  const [EvenementInfo, setEvenementInfo] = useState({})
  const [Status, setStatus] = useState(null)

  const [ShowModalCreate, setShowModalCreate] = useState(false);
  const [ShowModalUpdate, setShowModalUpdate] = useState(false);
  const [ShowModalShow, setShowModalShow] = useState(false);

  useEffect(() => {
    seterrorMessage("Search On Events")
    PrepareArrayItems(FilteredEvenements, setcurrentEvenements);
    renderPages(currentPage, totalPages)
  }, [currentPage, Evenements, RunOneTime, FilteredEvenements]);

  const dataFilterByDate = (e) => {

    setSearchDate(e.target.value)

    let filteredData = [];

    if (SearchQuery === '' || e.target?.queryValue === '') {
      
      filteredData = Evenements.filter(item =>
        item.date === e.target.value
      );

    }else{

      filteredData = FilteredEvenements.filter(item =>
        item.date === e.target.value
      );

    }
    
    // when the search input empty return all product 
    if (e.target.value ==='') {
        
      if (SearchQuery === '') {
        setFilteredEvenements(Evenements)
      }else{
        dataFilterByDate({target : {value : SearchQuery}})
      }

    }else{

      setFilteredEvenements(filteredData)
      goToPage(1)

    }

  }

  const prepareToUpdateOrShow = async (EvenementID, action) => {

    try {
      
      const res = await Axios.get('/reservations/' + EvenementID)

      if (res.status == 200) {
            
        setEvenementInfo(res.data.data);
        
        if (action === 'update') {
          setShowModalUpdate(true)
        }else if(action === 'show'){
          setShowModalShow(true)
        }
            
      }

    } catch (error) {
      console.log(rej);
    }

  }

  const EventSearch = async(e) => {

    e.preventDefault()

    try {

      setIsLoading(true);
      let ref = SearchQuery || 'null';
      
      if (ref?.includes('/')) {
        
        ref = ref?.replace('/', '*khayMohamed*');
        
      }

      const res = await Axios.get(`/reservation-raports/${SearchDate}/${Status}/${encodeURIComponent(ref)}`)

      if (res.status == 200) {
        
        if (res.data.data.length === 0) {
          
          setEvenements([])
          setFilteredEvenements([])
          seterrorMessage("No Evenements Exists");

        }else{
          seterrorMessage("");
          setEvenements(res.data.data)
          setFilteredEvenements(res.data.data)
          setCurrentPage(1)
          setitemsPerPage(10)

        }

      }

    }catch(rej){
      setEvenements([])
      setFilteredEvenements([])
      seterrorMessage("Something Wrong! Try Again");
    }
    setIsLoading(false);

  }

  return (
    <div>
      <h1 className="text-primary_text mb-5 font-bold text-[19px] sm:text-[25px] ">
        Evenements Raports
      </h1>

      <div className="border rounded-xl border-gray-200 shadow-lg">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 rounded-t-lg items-center justify-between p-3 bg-gray-200">
          <h2 className="text-primary_text font-semibold text-[22px]">
            Evenements
          </h2>
          <button
            onClick={() => setShowModalCreate(true)}
            className="bg-second w-full sm:w-fit rounded-lg text-white font-semibold p-2"
          >
            Add Evenement
          </button>
        </div>

        <div className="py-4 border-b border-gray-300 px-3 flex flex-col gap-5">
          
          <div className='flex items-center gap-4 flex-wrap'>
              
            <div className=''>
              <label className='mr-2 font-semibold'>Filter By Date : </label>
              <input
                type="date"
                value={SearchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                className="p-1 mr-2 rounded-md border border-gray-300 focus:border-primary_text outline-none"
              />
              <button onClick={() => setSearchDate('null')}><IoMdCloseCircleOutline/></button>
            </div>

            <div className=''>
              <label className='mr-2 font-semibold'>Filter By Month : </label>
              <input
                type="month"
                value={SearchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                className="p-1 mr-2 rounded-md border border-gray-300 focus:border-primary_text outline-none"
              />
              <button onClick={() => setSearchDate('null')}><IoMdCloseCircleOutline/></button>
            </div>

            <div className=''>
              <label className='mr-2 font-semibold'>Filter By Year : </label>
              <input
                type="year"
                value={SearchDate !== 'null' ? SearchDate : ''}
                onChange={(e) => setSearchDate(e.target.value)}
                className="p-1 mr-2 rounded-md border border-gray-300 focus:border-primary_text outline-none"
              />
              <button onClick={() => setSearchDate('null')}><IoMdCloseCircleOutline/></button>
            </div>

          </div>

          <div className='flex items-center gap-4 justify-between flex-wrap'>
{/*             
            <div className=''>
              <label className='w-2/4'>Status :</label>
              <select onChange={(e) => setStatus(e.target.value)} className="p-1 ml-2 rounded-md border border-gray-300 focus:border-primary_text outline-none">
                <option selected disabled>Select Status</option>
                <option value={0}>Pending</option>
                <option value={1}>Execute</option>
              </select>
            </div> */}

            <div>
              <label className='font-semibold'>Search : </label>
              <input
                type="text"
                value={SearchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-1 rounded-md border border-gray-300 focus:border-primary_text outline-none"
              />
            </div>
            <div>
              <button onClick={(e) => EventSearch(e)} className='bg-second text-white font-semibold rounded-md py-2 flex items-center gap-3 px-4'><FaSearch/></button>
            </div>

          </div>
          

        </div>

        <div className='overflow-x-scroll hide-scrollbar relative'>
          
          <table className="text-left w-full border-collapse">
            <thead>
              <tr>
                <th className="py-4 text-center px-2 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  Ref
                </th>
                <th className="py-4 text-center px-2 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  D.Real
                </th>
                <th className="py-4 text-center px-2 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  D.Modify
                </th>
                <th className="py-4 text-center px-2 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  D.Annulation
                </th>
                <th className="py-4 text-center px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  Execution
                </th>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  Action
                </th>
              </tr>
            </thead>
            <tbody
              className={`relative ${
                IsLoading || errorMessage && currentEvenements?.length == 0 ? "h-[34vh]" : ""
              }`}
            >
              {IsLoading && <Loading />}
              {!IsLoading && errorMessage && currentEvenements?.length == 0 && (
                <p className="absolute text-[21px] text-second font-bold -translate-y-[50%] text-center w-full left-0 top-[50%]">
                  {errorMessage}
                </p>
              )}
              {!IsLoading &&
                currentEvenements.length > 0 &&
                currentEvenements?.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-200">
                    <td className="py-4 text-nowrap text-center px-2 border-b border-grey-light">
                      {item.Ref}
                    </td>
                    <td className="py-4 text-nowrap text-center px-2 border-b border-grey-light">
                      {item.real_date}
                    </td>
                    <td className="py-4 text-nowrap text-center px-2 border-b border-grey-light">
                      {item.modify_date  || '-'}
                    </td>
                    <td className="py-4 text-nowrap text-center px-2 border-b border-grey-light">
                      {item.cancellation_date || '-'}
                    </td>
                    {
                      item.execution ? 
                      <td className="py-4 text-nowrap text-center px-2 border-b border-grey-light">
                        <span className='bg-second text-white px-3 py-1 mx-auto font-semibold rounded-xl'>Execute</span>
                      </td>
                      :
                      <td className="py-4 text-nowrap text-center px-2 border-b border-grey-light">
                        <span className='bg-red-500 text-white px-3 py-1 mx-auto font-semibold rounded-xl'>Pending</span>
                      </td>
                    }
                    <td className="py-4 border-b border-grey-light">
                      <button
                        onClick={() => prepareToUpdateOrShow(item.id, "show")}
                      >
                        <FaEye className="hover:text-second" fontSize={22} />
                      </button>
                      {
                        !item.received &&
                        <button
                          onClick={() => prepareToUpdateOrShow(item.id, "update")}
                          className="ml-4 mr-3"
                        >
                          <FaEdit className="hover:text-second" fontSize={22} />
                        </button>
                      }
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

        </div>

        <div className="border-b p-5 border-gray-300 px-3 flex items-center gap-4 justify-center">
          <ol className="flex justify-center gap-1 text-[16px] font-medium">
            <li>
              <button
                onClick={() => goToPreviousPage()}
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

            {renderPages(currentPage, totalPages)}

            <li>
              <button
                onClick={() => goToNextPage()}
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
      </div>

      {ShowModalUpdate && (
        <EvenementM
          closeModal={setShowModalUpdate}
          header="Update Evenement"
          action="update"
          Evenements={Evenements}
          Evenement={EvenementInfo}
          setEvenements={setEvenements}
          setFilteredEvenements={setFilteredEvenements}
        />
      )}
      {ShowModalCreate && (
        <EvenementM
          closeModal={setShowModalCreate}
          header="Add Evenement"
          action="create"
          Evenements={Evenements}
          setEvenements={setEvenements}
          setFilteredEvenements={setFilteredEvenements}
        />
      )}
      {ShowModalShow && (
        <EvenementM
          closeModal={setShowModalShow}
          header="Show Evenement"
          action="show"
          Evenement={EvenementInfo}
        />
      )} 
    </div>
  )
}

export default EventsRaports