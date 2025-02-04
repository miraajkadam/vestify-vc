import React from "react";
import { Investment } from "./types";
import { FomoDeal } from "fomo-deal-sdk-v1";
import { formatWalletAddress } from "@/lib/utils";

const tableHeaders = [
  {
    id: 3,
    title: "Telegram",
  },
  {
    id: 4,
    title: "Discord",
  },
  {
    id: 5,
    title: "Account EVM",
  },
  //   {
  //     id: 6,
  //     title: "KYC",
  //   },
  {
    id: 7,
    title: "Allocation",
  },
  {
    id: 8,
    title: "Pool",
  },
  {
    id: 9,
    title: "Currency",
  },
  {
    id: 10,
    title: "Contributed",
  },
  {
    id: 11,
    title: "OTC",
  },
  {
    id: 12,
    title: "Receiving EVM wallet",
  },
];

interface UserInvestmentTableProps {
  tableInfo?: Investment[];
}

const UserInvestmentTable: React.FC<UserInvestmentTableProps> = ({
  tableInfo,
}) => {
  return (
    <div className="relative overflow-x-auto mt-1">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-base font-semibold font-['Urbanist'] capitalize  bg-gray-50 ">
          <tr>
            {tableHeaders.map((item) => (
              <th key={item.id} scope="col" className="px-6 py-3 ">
                {item?.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableInfo?.map((item) => (
            <tr className="bg-white border-b  border-gray-200">
              <th className="px-6 py-4">
                {item?.socials?.telegram || "Not Linked Yet"}
              </th>
              <td className="px-6 py-4">
                {item?.socials?.discord || "Not Linked Yet"}
              </td>
              <td className="px-6 py-4">
                {formatWalletAddress(
                  "0x4e01832Ed404e29c161ce48DB40ec64426B2401B"
                )}
              </td>
              {/* <td className="px-6 py-4">$2999</td> */}
              <td className="px-6 py-4">{item?.investment?.amount}</td>
              <td className="px-6 py-4">Main Investor</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4">
                {formatWalletAddress(
                  "0x4e01832Ed404e29c161ce48DB40ec64426B2401B"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserInvestmentTable;
