import React from "react";
import { validate_Price } from "../../../../assets/constants/HelpFunctions";

const Restauration = ({
  action,
  Labor,
  setLabor,
  Purchasing,
  setPurchasing,
  ErrPurchasing,
  TP_Event,
  Benefit_restauration,
  Facture_price_restauration,
  setFacture_price_restauration
}) => {
  return (
    <div className="flex flex-col gap-6 border border-gray-500 rounded-lg pt-2 pb-3 px-2">
      <h2 className="font-bold text-[20px] text-primary_text">
        Restauration :
      </h2>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="flex flex-col w-full sm:w-[50%]">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <label className="w-2/4 font-semibold">La main d'oeuvre</label>
              <input
                type="text"
                disabled={action == "show"}
                value={Labor || 0}
                onChange={(e) => validate_Price(e.target.value, setLabor)}
                className={`border-gray-400 border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
              />
            </div>
          </div>

          <div className="flex flex-col w-full sm:w-[50%]">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <label className="w-2/4 font-semibold">Achats</label>
              <input
                type="text"
                disabled={action === "show"}
                value={Purchasing}
                onChange={(e) => validate_Price(e.target.value, setPurchasing)}
                className={` ${
                  ErrPurchasing ? "border-red-500" : "border-gray-400"
                } border mr-[10px] w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
              />
            </div>
            {ErrPurchasing && (
              <p className="text-red-500 font-semibold ml-[25%] px-4 py-1">
                {ErrPurchasing}
              </p>
            )}
          </div>
        </div>
        
        <hr className="border border-gray-500" />

        <div className="flex flex-col gap-3">

          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <label className=" w-full sm:w-1/4 font-semibold">
              Montant dépensé Total
            </label>
            <input
              type="text"
              value={TP_Event}
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
              value={Facture_price_restauration || 0}
              disabled={action == 'show'}
              onChange={(e) => validate_Price(e.target.value, setFacture_price_restauration)}
              className={` border-gray-400 border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <label className=" w-full sm:w-1/4 font-semibold">
              Profit
            </label>
            <input
              type="text"
              min={0}
              disabled={true}
              value={Benefit_restauration}
              // onChange={(e) => setTP_Event(e.target.value)}
              className={` border-gray-400 border w-full sm:w-3/4  rounded-lg py-2 px-3 focus:border-primary_text outline-none`}
            />
          </div>

        </div>

      </div>
    </div>
  );
};

export default Restauration;
