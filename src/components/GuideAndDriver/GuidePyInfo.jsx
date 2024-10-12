import React from "react";

const GuidePyInfo = ({GuideWorks}) => {
  return (
    <table className="w-full mt-1">
      <thead className="border-b border-gray-400">
        <tr>
          <th className="p-2 text-nowrap text-[16px]">Ref</th>
          <th className="p-2 text-nowrap text-[16px]">Date</th>
          <th className="p-2 text-nowrap text-[16px]">Prix</th>
        </tr>
      </thead>

      <tbody>
        {GuideWorks.map((item, index) => (
          <tr key={index} className={`border-b border-gray-400 ${item.pivot.cancelled ? 'bg-red-200' : ''} hover:bg-gray-200`}>
            <td className="py-1 text-nowrap border-x md:border-none border-gray-400 text-center">{item.ref}</td>
            <td className="py-1 text-nowrap border-x md:border-none border-gray-400 text-center">{item.modify_date}</td>
            <td className="py-1 text-nowrap border-x md:border-none border-gray-400 text-center">{item.pivot.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GuidePyInfo;
