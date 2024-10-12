import React from "react";
import { FaWindowClose } from "react-icons/fa";
import { validate_Price } from "../../../../assets/constants/HelpFunctions";

const Extra = ({action, Extra, setTotal_Extras, setExtras, Extras, removeDriversAndGuidesAndServices}) => {

    const hundlChangeExtra = (value) => {

        const updatedArray = Extras.map((item) => {
  
          if (item.id == Extra.id) {
            return {
              ...item,
              name : value
            };
          }
  
          return item;
        });
    
        setExtras(updatedArray);

    }

    const hundlChangePrice = (value) => {
      
      setTotal_Extras(0)
        const updatedArray = Extras.map((item) => {
          
          if (item.id == Extra.id) {
            setTotal_Extras(pre => pre + parseFloat((value) || 0))
            return {
              ...item,
              price : ((value) || 0)
            };
          }
          setTotal_Extras(pre => pre + parseFloat(item?.price))
          return item;
        });
    
        setExtras(updatedArray);

    }
    
  return (
    <div className="flex flex-col gap-5">
      <div className="w-full">
        {

          action != 'show' && (
            <FaWindowClose
              className="text-second float-end text-[20px] cursor-pointer"
              onClick={() =>
                removeDriversAndGuidesAndServices("Extra", Extra.id)
              }
            />
          )

        }

      </div>

      <div className="flex flex-col relative sm:static sm:flex-row items-start sm:items-center gap-5">
        <div className="flex flex-col w-full sm:w-[55%]">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <label className="w-full sm:w-2/4 font-semibold">
              Extra {Extra.id}
            </label>
            <div className="relative w-full sm:w-3/4">
              <input
                type="text"
                disabled={action === "show"}
                value={Extra.name}
                onChange={(e) => hundlChangeExtra(e.target.value)}
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
              value={Extra.price || 0}
              onChange={(e) => validate_Price(e.target.value, hundlChangePrice)}
              className={` border-gray-400 border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
            />
          </div>
        </div>
      </div>

      {Extra.err !== "" && (
        <p className="text-red-500 py-1 font-semibold">{Extra.err}</p>
      )}
    </div>
  );
};

const ExtrasCom = ({
    Extras,
    action,
    setExtras,
    removeDriversAndGuidesAndServices,
    AddGuideAndDriverAndService,
    Total_Extras,
    setTotal_Extras
}) => {
  
  return (
    <div className="flex flex-col gap-6 border border-gray-500 rounded-lg pt-2 pb-3 px-2">
      <h2 className="font-bold text-[20px] text-primary_text">Les extra :</h2>

      <div className="flex flex-col gap-6">
        {
            Extras?.length > 0 && Extras?.map((item, index) => (
              <div key={index}>
                { index !== 0 && <hr className="mb-5 border border-gray-300" />}
                <Extra 
                    Extra={item}
                    action={action}
                    Extras={Extras}
                    setTotal_Extras={setTotal_Extras}
                    setExtras={setExtras}
                    removeDriversAndGuidesAndServices={removeDriversAndGuidesAndServices}
                />
              </div>
            ))
        }

        {

          action != 'show' && (
            <a
              onClick={(e) => AddGuideAndDriverAndService("extras", e)}
              className=" text-center cursor-pointer bg-transparent font-semibold w-full sm:w-[30%] self-end text-second transition-[background-color] duration-200 hover:text-white border border-second hover:bg-second p-2 rounded-lg"
            >
              Ajoute un Extra
            </a>
          )

        }

      </div>

      <hr className="border border-gray-500"/>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <label className=" w-full sm:w-1/4 font-semibold">Price Total</label>
          <input
            type="text"
            value={Total_Extras}
            disabled={true}
            className={` border-gray-400 border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <label className=" w-full sm:w-1/4 font-semibold">Benefisl</label>
          <input
            type="text"
            value={Total_Extras}
            disabled={true}
            className={` border-gray-400 border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
          />
        </div>
      </div>

    </div>
  );
};

export default ExtrasCom;
