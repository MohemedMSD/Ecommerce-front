import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaSearch } from "react-icons/fa";
import Axios from "../assets/constants/axios/axios";
import {GuideM, Loading} from "../components";
import { useFunctionsContext } from "../context/FunctionsContext";
import { useFunctionsContextPaginationGD } from "../context/StatePaginateGuideDriver";

const Guides = () => {

  const {settotalPages, totalPages} = useFunctionsContext()

  const {
    getDriversAndGuides,
    goToNextPage,
    goToPreviousPage,
    renderPages
  } = useFunctionsContextPaginationGD()

  const [IsLoading, setIsLoading] = useState(true);
  const [errorMessage, seterrorMessage] = useState("");

  const [Guides, setGuides] = useState([]);

  const [ShowModalCreate, setShowModalCreate] = useState(false);
  const [ShowModalUpdate, setShowModalUpdate] = useState(false);
  const [ShowModalShow, setShowModalShow] = useState(false);

  const [GuideInfo, setGuideInfo] = useState({})

  const [currentPage, setCurrentPage] = useState(1)

  /* 
    the two next states :
      - the first 'SearchQuery' for search and its value set from 'StockSearchQuery'
      in click for search
      - the second 'StockSearchQuery' set its value on change the search input
      - all this for in change value of search input and go to next page before click on earch button
      not get the data with the new value of search input
  */
  const [SearchQuery, setSearchQuery] = useState('')
  const [StockSearchQuery, setStockSearchQuery] = useState('')

  const [Call, setCall] = useState(true)

  useEffect(() => {

    (async ()=>{
      
        if (Call) {

          getDriversAndGuides('guides', setGuides, SearchQuery, currentPage, setCall, seterrorMessage, settotalPages, setIsLoading)

        }

    })()

  }, [currentPage])

  const prepareToUpdateOrShow = async(id, action) => {

    try {
      
      const res = await Axios.get('/show-guides/' + id);
      if (res.status === 200) {
            
        setGuideInfo({
          ...res.data.data,
          id : id
        });
        
        if (action === 'update') {
          setShowModalUpdate(true)
        }else if(action === 'show'){
          setShowModalShow(true)
        }
            
      }

    } catch (error) {
      console.log(error);
    }

  }

  const hundelChange = (e) => {
    
    const regex = /^[\p{L}\s0-9\-+]+$/u
    
    if (regex.test(e.target.value) || e.target.value == '') {
      
      setStockSearchQuery(e.target.value)

    }

  }

  const search = (e) => {

    e.preventDefault()
    setCurrentPage(1)
    setSearchQuery(StockSearchQuery)
    getDriversAndGuides('guides', setGuides, StockSearchQuery, 1, setCall, seterrorMessage, settotalPages, setIsLoading)

  }

  return (
    <div>
      <h1 className="text-primary_text mb-5 font-bold text-[22px] sm:text-[25px] ">
        Gestion de guides
      </h1>

      <div className="border rounded-xl border-gray-200 shadow-lg">
        <div className="flex rounded-t-lg items-center justify-between p-3 bg-gray-200">
          <h2 className="text-primary_text font-semibold text-[20px] sm:text-[22px]">
            Gestion
          </h2>
        </div>

        <div className="py-4 border-b border-gray-300 px-3 flex items-center gap-4 justify-end">
          <label>Recharche</label>
          <input
            type="text"
            value={StockSearchQuery}
            onChange={(e) => hundelChange(e)}
            className="p-1 rounded-md border border-gray-300 focus:border-primary_text outline-none"
          />
          <button
                onClick={(e) => search(e)}
                className="bg-second border border-second text-white font-semibold rounded-md py-2 flex items-center gap-3 px-4"
              >
                <FaSearch />
          </button>
        </div>

        <div className="overflow-x-scroll hide-scrollbar relative">
          <table className="text-left w-full border-collapse">
            <thead>
              <tr>
                <th className="py-4 text-center px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  Nom
                </th>
                <th className="py-4 text-center px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  Telephone
                </th>
                <th className="py-4 text-center px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  Type
                </th>
                <th className="py-4 text-center px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  Action
                </th>
              </tr>
            </thead>
            <tbody
              className={`relative ${
                IsLoading || errorMessage ? "h-[34vh]" : ""
              }`}
            >
              {IsLoading && <tr><td><Loading /></td></tr>}
              {!IsLoading && errorMessage && (
                <p className="absolute text-[21px] text-second font-bold -translate-y-[50%] text-center w-full left-0 top-[50%]">
                  {errorMessage}
                </p>
              )}
              {!IsLoading &&
                Guides.length > 0 &&
                Guides?.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-200">
                    <td className="py-4 text-center text-nowrap md:text-wrap px-6 border-b border-grey-light">
                      {item.name}
                    </td>
                    <td className="py-4 text-center px-6 border-b border-grey-light">
                      {item.phone}
                    </td>
                    <td className="py-4 capitalize text-center px-6 border-b border-grey-light">
                      {item.type}
                    </td>
                    <td className="py-4 text-center border-b border-grey-light">
                      <button
                        onClick={() => prepareToUpdateOrShow(item.id, "show")}
                      >
                        <FaEye className="hover:text-second" fontSize={22} />
                      </button>
                      <button
                        onClick={() => prepareToUpdateOrShow(item.id, "update")}
                        className="ml-4 mr-3"
                      >
                        <FaEdit className="hover:text-second" fontSize={22} />
                      </button>
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
                onClick={() => goToPreviousPage (currentPage, setCurrentPage, setCall)}
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

            {renderPages(currentPage, totalPages, setCurrentPage, setCall)}

            <li>
              <button
                onClick={() => goToNextPage(currentPage, setCurrentPage, setCall, totalPages)}
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

      {ShowModalCreate && (
        <GuideM
          closeModal={setShowModalCreate}
          seterrorMessage={seterrorMessage}
          header="Ajouter un guide"
          action="create"
          Guides={Guides}
          setGuides={setGuides}
        />
      )}
      {ShowModalUpdate && (
        <GuideM
          closeModal={setShowModalUpdate}
          seterrorMessage={seterrorMessage}
          header="Mise à jour de Guide"
          action="update"
          Guide={GuideInfo}
          Guides={Guides}
          setGuides={setGuides}
        />
      )}
      {ShowModalShow && (
        <GuideM
          closeModal={setShowModalShow}
          header="Afficher le Guide"
          action="show"
          Guide={GuideInfo}
        />
      )}
    </div>
  );
};

export default Guides;
