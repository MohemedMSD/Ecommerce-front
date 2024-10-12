import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import Axios from "../assets/constants/axios/axios";
import {GuideM, Loading} from "../components";
import { useFunctionsContext } from "../context/FunctionsContext";


const GuidesRaports = () => {
  
  const {dataFilter, SearchQuery, goToPreviousPage, goToNextPage, goToPage, PrepareArrayItems, setitemsPerPage, setCurrentPage, currentPage, totalPages, itemsPerPage} = useFunctionsContext()
  const [RunOneTime, setRunOneTime] = useState(true);

  const [IsLoading, setIsLoading] = useState(true);
  const [errorMessage, seterrorMessage] = useState("");

  const [Guides, setGuides] = useState([]);
  const [FilteredGuides, setFilteredGuides] = useState([]);
  const [currentGuides, setcurrentGuides] = useState([]);

  const [ShowModalCreate, setShowModalCreate] = useState(false);
  const [ShowModalUpdate, setShowModalUpdate] = useState(false);
  const [ShowModalShow, setShowModalShow] = useState(false);

  const [GuideInfo, setGuideInfo] = useState({})

  useEffect(() => {

    (async ()=>{

      if (RunOneTime) {
        
        try {
          
          const res = await Axios.get("/guides");

          if (res.status === 200) {
            if (res.data.data.length > 0) {

              setGuides(res.data.data);
              setFilteredGuides(res.data.data);
              setCurrentPage(1)
              setitemsPerPage(10)
              
            } else {
              seterrorMessage("No Guides Exists");
            }
          }
        
        } catch (rej) {

          seterrorMessage("Something Wrong! Try Again");

        }

        setIsLoading(false);
        setRunOneTime(false);

      }

    })()

    PrepareArrayItems(FilteredGuides, setcurrentGuides)

  }, [currentPage, Guides, RunOneTime, FilteredGuides]);

  const prepareToUpdateOrShow = async(id, action) => {

    try {
      
      const res = await Axios.get('/guides/' + id);
      if (res.status === 200) {
            
        setGuideInfo(res.data.data);
        
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

  return (
    <div>
      <h1 className="text-primary_text mb-5 font-bold text-[19px] sm:text-[25px] ">
        Guides Reports
      </h1>

      <div className="border rounded-xl border-gray-200 shadow-lg">
        <div className="flex rounded-t-lg items-center justify-between p-3 bg-gray-200">
          <h2 className="text-primary_text font-semibold text-[22px]">
            Guides
          </h2>
        </div>

        <div className="py-4 border-b border-gray-300 px-3 flex items-center gap-4 justify-end">
          <label>Search : </label>
          <input
            type="text"
            value={SearchQuery}
            onChange={(e) => dataFilter(Guides, setFilteredGuides, e.target.value)}
            className="p-1 rounded-md border border-gray-300 focus:border-primary_text outline-none"
          />
        </div>

        <div className="overflow-x-scroll hide-scrollbar relative">
          <table className="text-left w-full border-collapse">
            <thead>
              <tr>
                <th className="py-4 text-center px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  Name
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
              {IsLoading && <Loading />}
              {!IsLoading && errorMessage && (
                <p className="absolute text-[21px] text-second font-bold -translate-y-[50%] text-center w-full left-0 top-[50%]">
                  {errorMessage}
                </p>
              )}
              {!IsLoading &&
                currentGuides.length > 0 &&
                currentGuides?.map((item) => (
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

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (item) => (
                <li key={item}>
                  <button
                    onClick={() => goToPage(item)}
                    href="#"
                    className={`block ${
                      currentPage === item
                        ? "border-second bg-second text-white"
                        : "border-gray-100 bg-white text-gray-900"
                    } size-8 rounded border text-center leading-8 `}
                  >
                    {item}
                  </button>
                </li>
              )
            )}
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
      
      {ShowModalShow && (
        <GuideM
          closeModal={setShowModalShow}
          header="Show Guide"
          action="raport"
          Guide={GuideInfo}
        />
      )}
    </div>
  );
}

export default GuidesRaports