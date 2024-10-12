import React from "react";

const DriverPyInfo = ({DriverWorks}) => {
  return (
    <table className="w-full mt-1">
      <thead className="border-b border-gray-400">
        <tr>
          <th className="p-2 text-[16px]">Ref</th>
          <th className="p-2 text-[16px]">Date</th>
          <th className="p-2 text-[16px]">Prix</th>
        </tr>
      </thead>

      <tbody>
        {DriverWorks.map((item, index) => (
          <tr key={index} className={`border-b border-gray-400 ${item.pivot.cancelled ? 'bg-red-200' : ''} hover:bg-gray-200`}>
            <td className="py-1 border-x border-gray-400 md:border-none text-center">{item.ref}</td>
            <td className="py-1 border-x border-gray-400 md:border-none text-center">{item.modify_date}</td>
            <td className="py-1 border-x border-gray-400 md:border-none text-center">{item.pivot.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DriverPyInfo;
