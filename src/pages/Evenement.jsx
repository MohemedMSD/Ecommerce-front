import React, { useEffect, useState } from "react";
import { FaEdit, FaEye, FaPrint, FaSearch } from "react-icons/fa";
import Axios from "../assets/constants/axios/axios";
import { Loading, EvenementM, PrintM } from "../components";
import { IoMdCloseCircleOutline } from "react-icons/io";

import { useFunctionsContext } from "../context/FunctionsContext";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { TbZoomReset } from "react-icons/tb";

const Evenement = () => {

  const {
    renderPages,
    totalPages,
    settotalPages,
  } = useFunctionsContext();
  
  const { date } = useParams();

  const [currentPage, setCurrentPage] = useState(1)

  const [IsLoading, setIsLoading] = useState(true);
  const [errorMessage, seterrorMessage] = useState("");

  const [Evenements, setEvenements] = useState([]);

  const [SearchInfo, setSearchInfo] = useState({
    query : '',
    start_date : '',
    end_date : '',
  });

  const [SearchQuery, setSearchQuery] = useState(null);
  const [End_date, setEnd_date] = useState(null);
  const [Start_date, setStart_date] = useState(null);
  const [Err_date, setErr_date] = useState("");

  const [EvenementInfo, setEvenementInfo] = useState({});
  const [Status, setStatus] = useState(null);

  const [Event, setEvent] = useState({
    id : null,
    pers : null,
    Ref : null,
    Date : null
  })

  const [ShowModalCreate, setShowModalCreate] = useState(false);
  const [ShowModalUpdate, setShowModalUpdate] = useState(false);
  const [ShowModalShow, setShowModalShow] = useState(false);
  const [ShowModalPrint, setShowModalPrint] = useState(false);

  const [InSearch, setInSearch] = useState(false)
  const [Reload, setReload] = useState(true)

  useEffect(()=>{

    (async()=>{

      if (Reload) {
        
        setIsLoading(true)
        
        try {
          
          let res;

          // this for in search
          if (InSearch) {

            let ref = SearchInfo.query || "null";

            if (ref?.includes("/")) {
              ref = ref?.replace("/", "*khayMohamed*");
            }

            res = await Axios.get(
              `/reservation-search/${SearchInfo.start_date || 'null'}/${SearchInfo.end_date || 'null'}/${Status || 'null'}/${encodeURIComponent(
                ref
              )}/${currentPage}`
            );

          }else{

            res = await Axios.get(`/reservation-search/${date}/null/null/null/${currentPage}`);

          }

          if (res.status === 200) {
            if (res.data.reservations.length > 0) {

              setEvenements(res.data.reservations);
              settotalPages(res.data.total_pages);
              seterrorMessage("");

            } else {

              setEvenements([]);
              settotalPages(0);
              seterrorMessage("Aucun activités n'exist");

            }
          }

        } catch (error) {

          if (error.response?.status == 422) {
            
            if (error.response?.data?.start_date) {
              window.location.href = '/dashboard/evenements/' + new Date().toISOString().split('T')[0]
            }

          }

          seterrorMessage("Parfois mal, veuillez réessayer");
        }
        
        setIsLoading(false)
        setReload(false)

      }

    })()

  }, [currentPage, Reload])

  useEffect(()=>{
    setReload(true)
  }, [currentPage])

  useEffect(() => {

    // in change params run the first useEffect for get data with new date
    setCurrentPage(1)
    setReload(true);
    
  }, [date]);

  const prepareToUpdateOrShow = async (EvenementID, action) => {
    try {
      const res = await Axios.get("/reservations/" + EvenementID);

      if (res.status == 200) {
        setEvenementInfo(res.data.data);

        if (action === "update") {
          setShowModalUpdate(true);
        } else if (action === "show") {
          setShowModalShow(true);
        } else if (action === "print") {
          setShowModalPrint(true);
        }
      }
    } catch (error) {
      console.log(rej);
    }
  };

  const EventSearch = (e) => {
    e.preventDefault();

      if (Start_date && !End_date) {

        setErr_date("Les deux champs de date sont obligatoires");

      } else {

        setErr_date("");
        setSearchInfo({
          query : SearchQuery,
          start_date : Start_date,
          end_date : End_date,
        })
        setCurrentPage(1)
        setInSearch(true)
        setReload(true)
        
      }

  };

  const ExecuteEvent = (e, ref, execution, date, id) => {
    e.preventDefault();
    
    Swal.fire({
      title: `Voulez-vous changer l\'activité de ${ref} en ${execution ? 'during implémentation' : 'exécuter'}`,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Oui",
      icon: "warning",
    }).then(async (response) => {

      if (response.isConfirmed) {

        try {

          const res = await Axios.post("reservation/execute/" + id, {
            _method : 'PUT'
          });

          if (res.status == 200) {

            const updatedEvents = Evenements.map((item) => {
              if (id == item.id) {
                return {
                  ...item,
                  execution: !item.execution,
                };
              }

              return item;
            });

            setEvenements(updatedEvents);

          }

        } catch (error) {
          
          Swal.fire({
            title: "Error!",
            text: "Parfois mal, veuillez réessayer",
            icon: "error",
          });

        }

      }
    });
  };

  const resetSearch = (e) => {

    setSearchQuery('')
    setStart_date('')
    setEnd_date('')
    setSearchInfo({
      query : '',
      start_date : '',
      end_date : '',
    })
    setInSearch(false)
    setCurrentPage(1)
    setReload(true)

  }

  return (
    <div>
      <h1 className="text-primary_text mb-5 font-bold text-[19px] sm:text-[25px] ">
        Gestion des activités
      </h1>

      <div className="border rounded-xl border-gray-200 shadow-lg">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 rounded-t-lg items-center justify-between p-3 bg-gray-200">
          <h2 className="text-primary_text font-semibold text-[22px]">
            Activités
          </h2>
          <button
            onClick={() => setShowModalCreate(true)}
            className="bg-second w-full sm:w-fit rounded-lg text-white font-semibold p-2"
          >
            Ajouter un activité
          </button>
        </div>

        <div className="py-4 border-b border-gray-300 px-3 flex flex-col gap-5">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="">
              <label className="mr-2 font-semibold">Date de debut</label>
              <input
                type="date"
                value={Start_date || ''}
                onChange={(e) => setStart_date(e.target.value)}
                className="p-1 mr-2 rounded-md border border-gray-300 focus:border-primary_text outline-none"
              />
              <button onClick={() => setStart_date('')}>
                <IoMdCloseCircleOutline />
              </button>
            </div>

            <div className="">
              <label className="mr-2 font-semibold">Date de fin</label>
              <input
                type="date"
                value={End_date || ''}
                onChange={(e) => setEnd_date(e.target.value)}
                className="p-1 mr-2 rounded-md border border-gray-300 focus:border-primary_text outline-none"
              />
              <button onClick={() => setEnd_date('')}>
                <IoMdCloseCircleOutline />
              </button>
            </div>

            {Err_date != "" && (
              <p className="text-red-500 w-full font-semibold">{Err_date}</p>
            )}
          </div>

          <div className="flex items-center gap-4 justify-between flex-wrap">
            <div>
              <label className="font-semibold">Recherche : </label>
              <input
                type="text"
                value={SearchQuery || ''}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-1 rounded-md border border-gray-300 focus:border-primary_text outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => EventSearch(e)}
                className="bg-second border border-second text-white font-semibold rounded-md py-2 flex items-center gap-3 px-4"
              >
                <FaSearch />
              </button>

              <button
                onClick={(e) => resetSearch(e)}
                className="border border-second transition-colors duration-75 bg-white text-second hover:bg-second hover:text-white font-semibold rounded-md py-2 flex items-center gap-3 px-4"
              >
                <TbZoomReset />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-scroll hide-scrollbar relative">

          {IsLoading && <Loading />}

          <table className="text-left w-full border-collapse">
            <thead>
              <tr>
                <th className="py-4 text-center px-2 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  Ref
                </th>
                <th className="py-4 text-center px-2 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  Date
                </th>
                <th className="py-4 text-center px-2 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  D.Annulation
                </th>
                <th className="py-4 text-nowrap text-center px-2 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  M.dépensé
                </th>
                <th className="py-4 text-center px-2 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  Profit
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
                IsLoading || (errorMessage && Evenements?.length == 0)
                  ? "h-[34vh]"
                  : ""
              }`}
            >
              {!IsLoading && errorMessage && Evenements?.length == 0 && (
                <tr className="absolute text-[21px] text-second font-bold -translate-y-[50%] text-center w-full left-0 top-[50%]">
                  <td className="text-center w-screen">{errorMessage}</td>
                </tr>
              )}
              {!IsLoading &&
                Evenements.length > 0 &&
                Evenements?.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-200">
                    <td className="py-4 text-nowrap text-center px-2 border-b border-grey-light">
                      {item.Ref}
                    </td>
                    <td className="py-4 text-nowrap text-center px-2 border-b border-grey-light">
                      {item.modify_date || "-"}
                    </td>
                    <td className="py-4 text-nowrap text-center px-2 border-b border-grey-light">
                      {item.cancellation_date || "-"}
                    </td>
                    <td className="py-4 text-nowrap text-center px-2 border-b border-grey-light">
                      {item.Amount || "-"}
                    </td>
                    <td className="py-4 text-nowrap text-center px-2 border-b border-grey-light">
                      {item.benefit || "-"}
                    </td>
                    {item.cancellation_date ? (
                      <td className="py-4 text-nowrap text-center px-2 border-b border-grey-light">
                        <span className="bg-gray-400 text-white px-3 py-1 mx-auto font-semibold rounded-xl">
                          Annulé
                        </span>
                      </td>
                    ) : item.execution ? (
                      <td className="py-4 text-nowrap text-center px-2 border-b border-grey-light">
                        <button
                          onClick={(e) =>
                            ExecuteEvent(e, item.Ref, item.execution, item.modify_date, item.id)
                          }
                          className="bg-second text-white px-3 py-1 mx-auto font-semibold rounded-xl"
                        >
                          Exécute
                        </button>
                      </td>
                    ) : (
                      <td className="py-4 text-nowrap text-center px-2 border-b border-grey-light">
                        <button
                          onClick={(e) =>
                            ExecuteEvent(e, item.Ref, item.execution, item.modify_date, item.id)
                          }
                          className="bg-red-500 text-white px-3 py-1 mx-auto font-semibold rounded-xl"
                        >
                          En attente
                        </button>
                      </td>
                    )}
                    <td className="py-4 border-b border-grey-light">
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

                      <button
                        onClick={() => {
                          setEvent({
                            id : item?.id,
                            pers : item?.num_pers,
                            Ref : item?.Ref,
                            Date : item?.modify_date
                          });
                          setShowModalPrint(true)
                        }}
                        className=""
                      >
                        <FaPrint className="hover:text-second" fontSize={22} />
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
                onClick={() => setCurrentPage(pre => {

                  if(pre - 1 <= 0) return 1
                  return pre - 1 

                })}
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
                onClick={() => setCurrentPage(pre => {
                  
                  if(pre + 1 > totalPages) return totalPages
                  return pre + 1 

                })}
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
          header="Mettre à jour l'activité"
          action="update"
          Evenements={Evenements}
          Evenement={EvenementInfo}
          setEvenements={setEvenements}
        />
      )}
      {ShowModalCreate && (
        <EvenementM
          closeModal={setShowModalCreate}
          header="Ajouter un activité"
          action="create"
          Evenements={Evenements}
          setEvenements={setEvenements}
          setSearchQuery={setSearchQuery}
          setInSearch={setInSearch}
          setReload={setReload}
          setSearchInfo={setSearchInfo}
          setcurrentPage={setCurrentPage}
          setEnd_date={setEnd_date}
          setStart_date={setStart_date}
        />
      )}
      {ShowModalShow && (
        <EvenementM
          closeModal={setShowModalShow}
          header="Afficher l'activité"
          action="show"
          Evenement={EvenementInfo}
        />
      )}

      {ShowModalPrint && (
        <PrintM
          header="Imprimer la facture"
          setEvenements={setEvenements}
          Evenements={Evenements}
          event_persone
          event={Event}
          closeModal={setShowModalPrint}
        />
      )}
    </div>
  );
};

export default Evenement;
