import React from "react";
import { FaWindowClose } from "react-icons/fa";
import { validate_Price } from "../../../../assets/constants/HelpFunctions";

const Service = ({ Service, action, services, setServices, removeDriversAndGuidesAndServices, setFacture_price_services}) => {

    const hundlChangeService = (value) => {
        const updatedArray = services.map((item) => {
          if (item.id == Service.id) {
            return {
              ...item,
              service: value,
            };
          }
          return item;
        });
    
        setServices(updatedArray);
    };

    const hundlChangePrice = (value) => {

        const updatedArray = services.map((item) => {

          if (item.id == Service.id) {

            const new_origin_price = Service.is_price_per_pers ? 
            Service?.num_pers * (value || 0) 
            : (value || 0)
            
            return {
              ...item,
              price_per_pers: (value || 0),
              origin_price : new_origin_price,
              benefit : item?.facture_price >= 0 ? Math.round((item?.facture_price - new_origin_price) * 100) / 100 : 0
            };

          }

          return item;

        });
    
        setServices(updatedArray);
    };

    const hundlChangeIsPricePerPersone = () => {

      setFacture_price_services(0)
      const updatedArray = services.map((item) => {

        if (item.id == Service.id) {

          const new_origin_price =  !item?.is_price_per_pers ? item?.price_per_pers * item?.num_pers : item?.price_per_pers;
          const facture_price = !item?.is_price_per_pers ?
            item?.facture_price_per_pers * item?.num_pers : item?.facture_price_per_pers

          setFacture_price_services(pre => pre + parseFloat(facture_price))

          return {
            ...item,
            is_price_per_pers: !item?.is_price_per_pers,
            origin_price : new_origin_price,
            facture_price : facture_price,
            benefit : item?.facture_price >= 0 ? facture_price - new_origin_price : 0
          };

        }

        setFacture_price_services(pre => pre + item?.facture_price)
        return item;

      });
  
      setServices(updatedArray);

    }

    const hundlChangePersone = (value) => {
      setFacture_price_services(0)

      const updatedArray = services.map((item) => {
        if (item.id == Service.id) {

          const new_origin_price = item?.is_price_per_pers ? item?.price_per_pers * parseInt(value || 0) : item?.price_per_pers;
          const totalFacturePrice = item?.is_price_per_pers ? item?.facture_price_per_pers * parseInt(value || 0) : item?.facture_price_per_pers;

          setFacture_price_services(pre => pre + parseFloat(totalFacturePrice))
          
          return {
            ...item,
            num_pers : item?.is_price_per_pers ? parseInt(value || 0) : 0,
            origin_price : new_origin_price,
            facture_price : totalFacturePrice,
            benefit : item?.facture_price >= 0 ? totalFacturePrice - new_origin_price : 0
          };

        }
        setFacture_price_services(pre => pre + item?.facture_price)
        return item;
      });
  
      setServices(updatedArray);
    }

    const hundlChangeFacture = (value) => {

      setFacture_price_services(0)

      const updatedArray = services.map((item) => {

        if (item.id == Service.id) {

          const facture_price = item?.is_price_per_pers
            ? (value || 0) * item?.num_pers 
            : (value || 0);
          
          setFacture_price_services(pre => pre + parseFloat(facture_price))

          return {
            ...item,
            facture_price : facture_price,
            facture_price_per_pers : (value || 0),
            benefit : facture_price >= 0 ? Math.round((facture_price - item.origin_price) * 100) / 100 : 0
          };

        }

        setFacture_price_services(pre => pre + item?.facture_price)
        return item;
      });
  
      setServices(updatedArray);
    }

  return (
    <div className="flex flex-col gap-5">
      
      <div className="flex justify-between">
        
        <div className="flex items-center gap-2">
          <input disabled={action == 'show'} id={`Price_per_pers_${Service.id}`} onChange={() => hundlChangeIsPricePerPersone()} checked={Service?.is_price_per_pers} type='checkbox'/>
          <label htmlFor={`Price_per_pers_${Service.id}`} className="font-semibold">Prix pour personne</label>
        </div>

        {

          action != 'show' && (
            <FaWindowClose
              className="text-second right-0 text-[20px] cursor-pointer"
              onClick={() =>
                removeDriversAndGuidesAndServices("service", Service.id)
              }
            />
          )

        }

      </div>

      <div className="flex flex-col relative sm:static sm:flex-row items-start sm:items-center gap-5">
        
        <div className="flex flex-col w-full sm:w-[55%]">

          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <label className="w-full sm:w-2/4 font-semibold">
              Service {Service.id}
            </label>
            <div className="relative w-full sm:w-3/4">
              <input
                type="text"
                disabled={action === "show"}
                value={Service.service || ''}
                onChange={(e) => hundlChangeService(e.target.value)}
                className={` border-gray-400 border w-full rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
              />
            </div>
          </div>
          
        </div>

        <div className="flex flex-col w-full sm:w-[45%]">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <label className="w-full sm:w-2/4 font-semibold">N.Persone</label>
            <input
              type="text"
              min={0}
              value={Service.num_pers}
              onChange={(e) => hundlChangePersone(e.target.value)}
              className={` border-gray-400 border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
            />
          </div>
        </div>


      </div>

      
      <div className="flex flex-col relative sm:static sm:flex-row items-start sm:items-center gap-5">

        <div className="flex flex-col w-full sm:w-[55%]">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <label className="w-full sm:w-2/4 font-semibold">Montant Dépensé</label>
              <input
                type="text"
                min={0}
                disabled={action === "show"}
                value={Service.price_per_pers || 0}
                onChange={(e) => validate_Price(e.target.value, hundlChangePrice)}
                className={` border-gray-400 border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
              />
            </div>
        </div>

        <div className="flex flex-col w-full sm:w-[45%]">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <label className="w-full sm:w-2/4 font-semibold">M.D Total</label>
            <input
              type="text"
              min={0}
              disabled={true}
              value={Service?.origin_price}
              className={` border-gray-400 border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
            />
          </div>
        </div>

      </div>

      

      
        <div className="flex flex-col relative sm:static sm:flex-row items-start sm:items-center gap-5">
            
            <div className="flex flex-col w-full sm:w-[55%]">
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <label className="w-full sm:w-2/4 font-semibold">
                  Prix de facture
                  </label>
                  <div className="relative w-full sm:w-3/4">
                  <input
                      type="text"
                      disabled={action === "show"}
                      value={Service?.facture_price_per_pers || 0}
                      onChange={(e) => validate_Price(e.target.value, hundlChangeFacture)}
                      className={` border-gray-400 border w-full rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
                  />
                  </div>
              </div>
            </div>

            <div className="flex flex-col w-full sm:w-[45%]">
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <label className="w-full sm:w-2/4 font-semibold">P.F total</label>
                  <input
                  type="text"
                  min={0}
                  disabled={true}
                  value={Service?.facture_price}
                  className={` border-gray-400 border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
                  />
              </div>
            </div>
        </div>
      

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <label className=" w-full sm:w-1/4 font-semibold">
            Profit
          </label>
          <input
            type="text"
            min={0}
            disabled={true}
            value={Service.benefit}
            className={` border-gray-400 border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
          />          
      </div>

      {Service.err !== "" && (
        Service.err?.map((item, index) => <p key={index} className="text-red-500 py-1 font-semibold">{item}</p>)
      )}
    </div>
  );
};

const Services = ({
  services,
  AddGuideAndDriverAndService,
  removeDriversAndGuidesAndServices,
  setServices,
  TotalServices,
  Facture_price_services,
  Benefit_services,
  setFacture_price_services,
  action
}) => {
  
  return (
    <div className="flex flex-col gap-6 border border-gray-500 rounded-lg pt-2 pb-3 px-2">
      <h2 className="font-bold text-[20px] text-primary_text">Services :</h2>

      <div className="flex flex-col gap-6">
        
        {services?.length > 0 && services?.map((item, index) => (
          <div key={index}>
            {index !== 0 && <hr className="border-gray-400 mb-5" />}
            <Service
              Service={item}
              removeDriversAndGuidesAndServices={
                removeDriversAndGuidesAndServices
              }
              setFacture_price_services={setFacture_price_services}
              services={services}
              setServices={setServices}
              action={action}
            />
          </div>
        ))}

        {

          action != 'show' && (
            <a
              onClick={(e) => AddGuideAndDriverAndService("service", e)}
              className=" text-center cursor-pointer bg-transparent font-semibold w-full sm:w-[30%] self-end text-second transition-[background-color] duration-200 hover:text-white border border-second hover:bg-second p-2 rounded-lg"
            >
              Ajoute un Service
            </a>
          )

        }
        
      </div>
      
      <hr className="border border-gray-500"/>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <label className=" w-full sm:w-1/4 font-semibold">Montant Dépensé Total</label>
          <input
            type="text"
            value={TotalServices}
            disabled={true}
            className={` border-gray-400 border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <label className=" w-full sm:w-1/4 font-semibold">
            Prix de facture
          </label>
          <input
            type="text"
            value={Facture_price_services}
            disabled={true}
            className={` border-gray-400 border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <label className=" w-full sm:w-1/4 font-semibold">Profit</label>
          <input
            type="text"
            value={Benefit_services}
            disabled={true}
            className={` border-gray-400 border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
          />
        </div>
      </div>

    </div>
  );
};

export default Services;
