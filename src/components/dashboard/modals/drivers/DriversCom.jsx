import React from "react";
import { FaWindowClose } from "react-icons/fa";
import { validate_Price } from "../../../../assets/constants/HelpFunctions";

const Cheffeur = ({
  action,
  Drivers,
  setDrivers,
  removeDriversAndGuidesAndServices,
  Driver,
  GetDriver
}) => {
  
  const hundlChangeName = (value) => {
    const updatedArray = Drivers.map((item) => {
      if (item.id == Driver.id) {
        return {
          ...item,
          id: Driver.id,
          name: value,
        };
      }
      return item;
    });

    setDrivers(updatedArray);
  };

  const hundlChangePrice = (value) => {
    const updatedArray = Drivers.map((item) => {
      if (item.id == Driver.id) {
        return {
          ...item,
          id: Driver.id,
          price: value,
        };
      }
      return item;
    });

    setDrivers(updatedArray);
  };

  const hundlChangePhone = (value) => {
    const regex = /^\d+$/;
    let updatedArray = Drivers;
    
    if (regex.test(value) || value == '') {

      updatedArray = Drivers.map((item) => {
        if (item.id == Driver.id) {
          return {
            ...item,
            id: Driver.id,
            phone: value,
          };
        }
        return item;
      });

    }

    setDrivers(updatedArray);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col relative sm:static sm:flex-row items-start sm:items-center gap-5">
        
        {

          action != 'show' && (

            <FaWindowClose
              className="text-second sm:hidden absolute right-0 text-[20px] cursor-pointer"
              onClick={() => removeDriversAndGuidesAndServices("driver", Driver.id)}
            />

          )

        }

        <div className="flex flex-col w-full sm:w-[55%]">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <label className="w-full sm:w-2/4 font-semibold">
              Chauf {Driver.id} Nom
            </label>
            <div className="relative w-full sm:w-3/4">
              <input
                type="text"
                disabled={action === "show"}
                value={Driver.name}
                onChange={(e) => hundlChangeName(e.target.value)}
                className={` border-gray-400 border w-full rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
              />
            </div>
          </div>
          
        </div>

        <div className="flex flex-col w-full sm:w-[45%]">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <label className="w-full sm:w-2/4 font-semibold">Prix</label>
            <input
              type="text"
              min={0}
              disabled={action === "show"}
              value={Driver.price || 0}
              onChange={(e) => validate_Price(e.target.value, hundlChangePrice)}
              className={` border-gray-400 border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
            />
          </div>
        </div>

        {

          action != 'show' && (

            <FaWindowClose
              className="text-second hidden sm:flex cursor-pointer"
              onClick={() => removeDriversAndGuidesAndServices("driver", Driver.id)}
            />

          )

        }

      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full">
        <label className="w-full sm:w-1/4 font-semibold">Telephone</label>
        <input
          type="text"
          disabled={action === "show"}
          value={Driver.phone}
          onBlur={(e) => GetDriver(e, Driver.id)}
          onChange={(e) => hundlChangePhone(e.target.value)}
          className={` border-gray-400 border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
        />
        
      </div>

      {Driver.err !== "" && (
        Driver.err?.map((item, index) => <p key={index} className="text-red-500 py-1 font-semibold">{item}</p>)
      )}
    </div>
  );
};

const DriversCom = ({
  Drivers,
  removeDriversAndGuidesAndServices,
  setDrivers,
  AddGuideAndDriverAndService,
  action,
  TotalDrivers,
  Facture_price_drivers,
  setFacture_price_drivers,
  Benefit_drivers,
  GetDriver
}) => {
  
  return (
    <div className="flex flex-col gap-6 border border-gray-500 rounded-lg pt-2 pb-3 px-2">
      <h2 className="font-bold text-[20px] text-primary_text">Chauffeurs :</h2>

      <div className="flex flex-col gap-6">
        {Drivers?.map((item, index) => {
          return (
            <div key={index}>
              <Cheffeur
                removeDriversAndGuidesAndServices={
                  removeDriversAndGuidesAndServices
                }
                Driver={item}
                Drivers={Drivers}
                setDrivers={setDrivers}
                GetDriver={GetDriver}
                action={action}
              />
              {index != Drivers.length - 1 && (<hr className="border-gray-400 mt-5" />)}
            </div>
          );
        })}

        {

          action != 'show' && (
            <a
              onClick={(e) => AddGuideAndDriverAndService("driver", e)}
              className=" text-center cursor-pointer bg-transparent font-semibold w-full sm:w-[30%] self-end text-second transition-[background-color] duration-200 hover:text-white border border-second hover:bg-second p-2 rounded-lg"
            >
              Ajoute un Cheffeur
            </a>
          )

        }

      </div>

      <hr className="border border-gray-500"/>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <label className=" w-full sm:w-1/4 font-semibold">Montant dépensé Total</label>
          <input
            type="text"
            min={0}
            value={TotalDrivers}
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
            min={0}
            value={Facture_price_drivers || 0}
            disabled={action == 'show'}
            onChange={(e) => validate_Price(e.target.value, setFacture_price_drivers)}
            className={` border-gray-400 border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <label className=" w-full sm:w-1/4 font-semibold">Profit</label>
          <input
            type="text"
            min={0}
            value={Benefit_drivers}
            disabled={true}
            className={` border-gray-400 border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
          />
        </div>
      </div>
    </div>
  );
};

export default DriversCom;
