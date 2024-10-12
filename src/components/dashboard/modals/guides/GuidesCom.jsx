import React from "react";
import { FaWindowClose } from "react-icons/fa";
import { validate_Price } from "../../../../assets/constants/HelpFunctions";

const Guide = ({
  action,
  Guides,
  Guide,
  setGuides,
  removeDriversAndGuidesAndServices,
  GetGuide
}) => {
  
  const hundlChangeName = (value) => {
    const updatedArray = Guides.map((item) => {
      if (item.id == Guide.id) {
        return {
          ...item,
          id: Guide.id,
          name: value,
        };
      }
      return item;
    });

    setGuides(updatedArray);
  };

  const hundlChangePrice = (value) => {
    const updatedArray = Guides.map((item) => {
      if (item.id == Guide.id) {
        return {
          ...item,
          id: Guide.id,
          price: value || 0
        };
      }
      return item;
    });

    setGuides(updatedArray);
  };

  const hundlChangeType = (value) => {
    const updatedArray = Guides.map((item) => {
      if (item.id == Guide.id) {
        return {
          ...item,
          id: Guide.id,
          type: value,
        };
      }
      return item;
    });

    setGuides(updatedArray);
  };

  const hundlChangePhone = (value) => {
    const regex = /^\d+$/
    let updatedArray = Guides;

    if (regex.test(value) || value == '') {
      
      updatedArray = Guides.map((item) => {
        if (item.id == Guide.id) {
          return {
            ...item,
            id: Guide.id,
            phone: value,
          };
        }
        return item;
      });

    }

    setGuides(updatedArray);
  };


  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        
        {

          action != 'show' && (
            <FaWindowClose
              className="text-second sm:hidden absolute right-3 text-[20px] cursor-pointer"
              onClick={() => removeDriversAndGuidesAndServices("guide", Guide.id)}
            />
          )

        }

        <div className="flex flex-col w-full sm:w-[57%]">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <label className="w-full sm:w-2/4 font-semibold">
              Guide {Guide.id} Nom
            </label>
            <div className="relative w-full sm:w-3/4">
              <input
                type="text"
                disabled={action === "show"}
                value={Guide.name}
                onChange={(e) => hundlChangeName(e.target.value)}
                className={` border-gray-400 border rounded-lg w-full py-2 px-3 focus:border-primary_text outline-none`}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full sm:w-[43%]">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <label className="w-full sm:w-2/4 font-semibold">Prix</label>
            <input
              type="text"
              min={0}
              disabled={action === "show"}
              value={Guide.price || 0}
              onChange={(e) => validate_Price(e.target.value, hundlChangePrice)}
              className={`border-gray-400 border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
            />
          </div>
        </div>

        {

          action != 'show' && (

            <FaWindowClose
              className="text-second hidden sm:flex cursor-pointer"
              onClick={() => removeDriversAndGuidesAndServices("guide", Guide.id)}
            />

          )

        }

      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="flex flex-col w-full sm:w-[52%]">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <label className="w-full sm:w-2/4 font-semibold">Phone</label>
            <div className="relative w-full sm:w-3/4">
              <input
                type="text"
                disabled={action === "show"}
                value={Guide.phone}
                onChange={(e) => hundlChangePhone(e.target.value)}
                onBlur={(e) => GetGuide(e, Guide?.id)}
                className={` border-gray-400 border rounded-lg py-2 w-full px-3 focus:border-primary_text outline-none`}
              />
            </div>
          </div>
        </div>

        <div className="flex w-full sm:w-[40%] gap-3">
          <label className=" w-1/4 sm:w-2/4 font-semibold">Type</label>

          <select
            onChange={(e) => hundlChangeType(e.target.value)}
            disabled={action == 'show'}
            value={Guide.type || "null"}
            className={`border-gray-400 border w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
          >
            <option value="null" disabled>
              select Type
            </option>
            <option value="local">
              Local
            </option>
            <option value="agence">
              Agence
            </option>
          </select>
        </div>
      </div>

      {Guide.err.length > 0 &&
        Guide.err.map((item) => (
          <p className="text-red-500 py-1 font-semibold">{item}</p>
        ))}
    </div>
  );
};

const GuidesCom = ({
  Guides,
  removeDriversAndGuidesAndServices,
  setGuides,
  AddGuideAndDriverAndService,
  action,
  TotalGuides,
  Facture_price_guides,
  Benefit_guides,
  setFacture_price_guides,
  GetGuide
}) => {
  return (
    <div className="flex flex-col gap-6 border border-gray-500 rounded-lg pt-2 pb-3 px-2">
      <h2 className="font-bold text-[20px] text-primary_text">Guides :</h2>

      <div className="flex flex-col gap-6">
        {Guides.map((item, index) => {
          return (
            <div key={index}>
              {index !== 0 && <hr className="border-gray-400 mb-5" />}
              <Guide
                removeDriversAndGuidesAndServices={removeDriversAndGuidesAndServices}
                Guide={item}
                Guides={Guides}
                setGuides={setGuides}
                GetGuide={GetGuide}
                action={action}
              />
            </div>
          );
        })}
        {

          action != 'show' && (

            <a
            onClick={(e) => AddGuideAndDriverAndService("guide", e)}
            className=" text-center cursor-pointer bg-transparent font-semibold w-full sm:w-[30%] self-end text-second transition-[background-color] duration-200 hover:text-white border border-second hover:bg-second p-2 rounded-lg"
            >
              Ajoute un Guide
            </a>
          
          )

        }
      </div>
      
      <hr className="border border-gray-500"/>

      <div className="flex flex-col gap-3">

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <label className=" w-full sm:w-1/4 font-semibold">
            Montant dépensé Total
          </label>
          <input
            type="text"
            min={0}
            value={TotalGuides}
            disabled={true}
            className={` border-gray-400 border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <label className=" w-full sm:w-1/4 font-semibold">
            Facture price
          </label>
          <input
            type="text"
            min={0}
            value={Facture_price_guides || 0}
            onChange={(e) => validate_Price(e.target.value, setFacture_price_guides)}
            disabled={action == 'show'}
            className={` border-gray-400 border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <label className=" w-full sm:w-1/4 font-semibold">
            Benefisl
          </label>
          <input
            type="text"
            min={0}
            value={Benefit_guides}
            disabled={true}
            className={` border-gray-400 border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
          />
        </div>
      </div>

    </div>
  );
};

export default GuidesCom;
