import React, { useEffect, useState } from "react";
<<<<<<< HEAD:src/pages/GuidesRaports.jsx
import { FaEye } from "react-icons/fa";
=======
import toast from "react-hot-toast";
import { FaEye, FaEdit, FaSearch } from "react-icons/fa";
import {TbZoomReset} from 'react-icons/tb'
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
>>>>>>> ee0fb04978010731a65b7449f0c0472299446185:src/pages/CategoriesManagement.jsx
import Axios from "../assets/constants/axios/axios";
import {GuideM, Loading} from "../components";
import { useFunctionsContext } from "../context/FunctionsContext";


<<<<<<< HEAD:src/pages/GuidesRaports.jsx
const GuidesRaports = () => {
  
  const {dataFilter, SearchQuery, goToPreviousPage, goToNextPage, goToPage, PrepareArrayItems, setitemsPerPage, setCurrentPage, currentPage, totalPages, itemsPerPage} = useFunctionsContext()
  const [RunOneTime, setRunOneTime] = useState(true);
=======
  const {goToPreviousPage, goToNextPage, totalPages, settotalPages, renderPages} = useFunctionsContext()
>>>>>>> ee0fb04978010731a65b7449f0c0472299446185:src/pages/CategoriesManagement.jsx

  const [IsLoading, setIsLoading] = useState(true);
  const [errorMessage, seterrorMessage] = useState("");

<<<<<<< HEAD:src/pages/GuidesRaports.jsx
  const [Guides, setGuides] = useState([]);
  const [FilteredGuides, setFilteredGuides] = useState([]);
  const [currentGuides, setcurrentGuides] = useState([]);
=======
  const [Categories, setCategories] = useState([]);
>>>>>>> ee0fb04978010731a65b7449f0c0472299446185:src/pages/CategoriesManagement.jsx

  const [ShowModalCreate, setShowModalCreate] = useState(false);
  const [ShowModalUpdate, setShowModalUpdate] = useState(false);
  const [ShowModalShow, setShowModalShow] = useState(false);

<<<<<<< HEAD:src/pages/GuidesRaports.jsx
  const [GuideInfo, setGuideInfo] = useState({})
=======
  const [CategoryInfo, setCategoryInfo] = useState({})
  const [currentPage, setCurrentPage] = useState(1)

  // this state fill when change input's value and second state fill with 
  // first state in click on search
  const [StockSearchQuery, setStockSearchQuery] = useState('');
  const [SearchQuery, setSearchQuery] = useState('');
  
  const [Reload, setReload] = useState(false);
  const [SearchAction, setSearchAction] = useState(false);
>>>>>>> ee0fb04978010731a65b7449f0c0472299446185:src/pages/CategoriesManagement.jsx

  useEffect(() => {

    (async()=>{

      setIsLoading(true)

      try {
          
<<<<<<< HEAD:src/pages/GuidesRaports.jsx
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
=======
        let res;

        if (SearchAction) {
            
          res = await Axios.get(`/categories-management/search/${SearchQuery}/${currentPage}`);

        }else{

          res = await Axios.get("/categories-management/" + currentPage);
>>>>>>> ee0fb04978010731a65b7449f0c0472299446185:src/pages/CategoriesManagement.jsx
        
        }

        if (res.status === 200) {

          if (res.data.categories.length > 0) {

            setCategories(res.data.categories);
            settotalPages(res.data.total_pages);
            seterrorMessage("")

          } else {
            setCategories([]);
            settotalPages(0);
            seterrorMessage("No Categories Exists");
          }

        }
      
      } catch (rej) {

        setCategories([]);
        settotalPages(0);
        seterrorMessage("Something Wrong! Try Again");

      }

      setIsLoading(false);

    })()

<<<<<<< HEAD:src/pages/GuidesRaports.jsx
    PrepareArrayItems(FilteredGuides, setcurrentGuides)

  }, [currentPage, Guides, RunOneTime, FilteredGuides]);
=======
  }, [currentPage, Reload])
>>>>>>> ee0fb04978010731a65b7449f0c0472299446185:src/pages/CategoriesManagement.jsx

  const prepareToUpdateOrShow = async(id, action) => {

    try {
      
      const res = await Axios.get('/guides/' + id);
      if (res.status === 200) {
            
<<<<<<< HEAD:src/pages/GuidesRaports.jsx
        setGuideInfo(res.data.data);
=======
        setCategoryInfo({
          ...res.data.data,
          id : CategoryID
        });
>>>>>>> ee0fb04978010731a65b7449f0c0472299446185:src/pages/CategoriesManagement.jsx
        
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

<<<<<<< HEAD:src/pages/GuidesRaports.jsx
  return (
    <div>
      <h1 className="text-primary_text mb-5 font-bold text-[19px] sm:text-[25px] ">
        Guides Reports
=======
  const deleteCategory = (CategoryID) => {
    Swal.fire({
      title : 'Are you sure to delete this item ?',
      showCancelButton : true,
      showConfirmButton : true,
      confirmButtonText : 'Yes',
      icon : 'warning'
    })
    .then(async (resSweet) => {

      if (resSweet.isConfirmed) {

        toast.loading('Processing...')

        try {
          
          const res = await Axios.delete('/categories/' + CategoryID)

          if (res.status === 200) {
            
            const updatedCategories = Categories.filter((item) => 
              item.id !== CategoryID
            )

            if (updatedCategories.length == 0) {
                
              goToPreviousPage(setCurrentPage)

            }else{

              setReload(!Reload)

            }
            
            toast.dismiss()
            toast.success('Category Deleted Successfully')

          }

        } catch (error) {
          
          toast.dismiss()
          if (error.response?.status == 422) {
            toast.error(error?.response?.data?.message)
          }else{
            toast.error('Sometimes wrong, please try again')
          }
          
        }
        
      }
      
    })

  }

  const runUseEffectForSearch = (e) => {

    const regex = /^[\w\s\-\_\=\+]+$/
    if (regex.test(e.target.value) || e.target.value == '') {
      
      setStockSearchQuery(e.target.value)

    }

  }

  const CategoriesSearch = () => {

    setSearchAction(StockSearchQuery != '' ? true : false)
    setSearchQuery(StockSearchQuery != '' ? StockSearchQuery : '')
    setCurrentPage(1)
    setReload(!Reload)

  }

  const resetSearch = () => {
    setSearchAction(false)
    setSearchQuery('')
    setStockSearchQuery('')
    setCurrentPage(1)
    setReload(!Reload)
  }

  return (
    <div>
      <h1 className="text-primary_text mb-5 font-bold text-[19px] sm:text-[25px] ">
        Categories Management
>>>>>>> ee0fb04978010731a65b7449f0c0472299446185:src/pages/CategoriesManagement.jsx
      </h1>

      <div className="border rounded-xl border-gray-200 shadow-lg">
        <div className="flex rounded-t-lg items-center justify-between p-3 bg-gray-200">
          <h2 className="text-primary_text font-semibold text-[22px]">
<<<<<<< HEAD:src/pages/GuidesRaports.jsx
            Guides
=======
            Categories
>>>>>>> ee0fb04978010731a65b7449f0c0472299446185:src/pages/CategoriesManagement.jsx
          </h2>
        </div>

        <div className="py-4 border-b border-gray-300 px-3 flex items-center gap-4 justify-end">
        <label>Search</label>
          <input
            type="text"
<<<<<<< HEAD:src/pages/GuidesRaports.jsx
            value={SearchQuery}
            onChange={(e) => dataFilter(Guides, setFilteredGuides, e.target.value)}
=======
            value={StockSearchQuery}
            onChange={(e) => runUseEffectForSearch(e)}
>>>>>>> ee0fb04978010731a65b7449f0c0472299446185:src/pages/CategoriesManagement.jsx
            className="p-1 rounded-md border border-gray-300 focus:border-primary_text outline-none"
          />
          <div className="flex items-center gap-1">
            <button 
              onClick={() => CategoriesSearch()}
              className=" bg-second hover:opacity-90 transition-opacity border border-second text-white rounded-md p-2"
            ><FaSearch/>
            </button>

            <button 
              onClick={() => resetSearch()}
              className=" bg-white text-second border hover:text-white hover:bg-second transition-colors border-second rounded-md p-2"
            ><TbZoomReset/>
            </button>
          </div>
        </div>

        <div className="overflow-x-scroll hide-scrollbar relative">
            {IsLoading && <Loading />}
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
              {!IsLoading && errorMessage && (
                <tr className="absolute text-[21px] text-red-500 font-bold -translate-y-[50%] text-center w-full left-0 top-[50%]">
                  <td className="text-center w-[1440px]">{errorMessage}</td>
                </tr>
              )}
              {!IsLoading &&
<<<<<<< HEAD:src/pages/GuidesRaports.jsx
                currentGuides.length > 0 &&
                currentGuides?.map((item) => (
=======
                Categories.length > 0 &&
                Categories?.map((item) => (
>>>>>>> ee0fb04978010731a65b7449f0c0472299446185:src/pages/CategoriesManagement.jsx
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

        {

          (!IsLoading && totalPages > 0) && (

            
            <div className="border-b p-5 border-gray-300 px-3 flex items-center gap-4 justify-center">
              <ol className="flex justify-center gap-1 text-[16px] font-medium">
                <li>
                  <button
                    onClick={() => goToPreviousPage(setCurrentPage)}
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

                {renderPages(currentPage, totalPages, setCurrentPage)}
                <li>
                  <button
                    onClick={() => goToNextPage(setCurrentPage)}
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
<<<<<<< HEAD:src/pages/GuidesRaports.jsx
      
=======

      {ShowModalCreate && (
        <CategoryM
          closeModal={setShowModalCreate}
          seterrorMessage={seterrorMessage}
          header="Add Category"
          action="create"
          Categories={Categories}
          setReload={setReload}
          setCategories={setCategories}
          setCurrentPage={setCurrentPage}
          setSearchAction={setSearchAction}
          setSearchQuery={setSearchQuery}
        />
      )}
      {ShowModalUpdate && (
        <CategoryM
          closeModal={setShowModalUpdate}
          seterrorMessage={seterrorMessage}
          header="Update Category"
          action="update"
          category={CategoryInfo}
          Categories={Categories}
          setCategories={setCategories}
        />
      )}
>>>>>>> ee0fb04978010731a65b7449f0c0472299446185:src/pages/CategoriesManagement.jsx
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