"use client";

import { useState } from "react";
import { Pools } from "../deal/types";

interface TabProps {
  tabs: Pools[];
  handleTabClick: (poolId: string) => void;
}

export function TabBar({ tabs, handleTabClick }: TabProps) {
  console.log(tabs, "tabs");
  const [selectedTabId, setSelectedTabId] = useState("");

  const handleSelectTab = (id: string) => {
    setSelectedTabId(id);
    handleTabClick(id);
  };

  return (
    <ul className="flex flex-wrap w-full text-lg font-medium text-center text-gray-500 border-b border-gray-200 ">
      <li className="me-2">
        <div className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active ">
          All allocations
        </div>
      </li>
      {/* <li className="me-2">
        <div className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active ">
          Main Investor
        </div>
      </li>
      <li className="me-2">
        <div className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active ">
          Investor
        </div>
      </li> */}
      {tabs?.map((item) => (
        <li
          className="me-2"
          key={item.id}
          onClick={() => handleSelectTab(item?.id)}
        >
          <div
            className={` ${
              selectedTabId === item?.id
                ? "text-blue-600 bg-gray-100"
                : "text-black bg-transparent"
            } inline-block  hover:bg-gray-100 p-4   rounded-t-lg active cursor-pointer`}
          >
            {item?.name}
          </div>
        </li>
      ))}
    </ul>
  );
}
