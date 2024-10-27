"use client";
import React, { useState } from "react";
import Editing from "./Editing";

function Distribution() {
  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing(!editing);
  };
  return (
    <div className="h-[531.85px] flex-col justify-start items-start gap-10 flex">
      <div className="self-stretch justify-between items-start gap-[523px] inline-flex">
        <div className="justify-start items-end gap-[49px] flex">
          <div className="w-[71px] flex-col justify-start items-start gap-3.5 inline-flex">
            <div className="self-stretch justify-start items-center gap-2 inline-flex">
              <div className="text-[#3a7fff] text-lg font-bold font-['Urbanist'] capitalize">
                SAND
              </div>
              <div className="w-[15px] h-[15px] relative" />
            </div>
            <div className="text-[#979797] text-[15px] font-semibold font-['Urbanist'] capitalize">
              Token
            </div>
          </div>
          <div className="w-[172px] flex-col justify-start items-start gap-4 inline-flex">
            <div className="self-stretch text-[#18191c] text-lg font-bold font-['Urbanist'] capitalize">
              Binance Smart Chain
            </div>
            <div className="text-[#979797] text-[15px] font-semibold font-['Urbanist'] capitalize">
              Network
            </div>
          </div>
          <div className="w-28 flex-col justify-start items-start gap-[15px] inline-flex">
            <div className="self-stretch text-[#18191c] text-lg font-bold font-['Urbanist'] capitalize">
              Batch 3
            </div>
            <div className="text-[#979797] text-[15px] font-semibold font-['Urbanist']">
              Next distribution
            </div>
          </div>
        </div>
        <div className="h-[43px] justify-start items-center gap-[18px] flex">
          <div className="h-full px-2 bg-indigo-600 rounded-[5px] justify-center items-center gap-2.5 flex">
            <button
              className="text-white text-lg font-semibold font-['Urbanist'] leading-loose"
              onClick={() => handleEdit()}
            >
              Edit schedule
            </button>
          </div>
          <div className="-full px-2  rounded-[5px] border border-[#908eb6] justify-center items-center gap-2.5 flex">
            <button className="text-[#908eb6] text-lg font-semibold font-['Urbanist'] leading-loose">
              Start distribution
            </button>
          </div>
        </div>
      </div>
      <div className="justify-start items-center gap-[30px] inline-flex">
        <div className="w-[110.54px] h-[47.85px] relative">
          <div className="w-[110.54px] h-[47.85px] left-0 top-0 absolute bg-[#f8f8ff] rounded-tl-[10px] rounded-tr-[10px]" />
          <div className="left-[16.27px] top-[16.43px] absolute text-[#7870fc] text-lg font-semibold font-['Urbanist'] capitalize">
            Overview
          </div>
          <div className="w-[110.54px] h-[0px] left-0 top-[47.85px] absolute border-2 border-[#7870fc]"></div>
        </div>
        <div className="justify-start items-center gap-[5px] flex">
          <div className="text-[#979797] text-lg font-semibold font-['Urbanist'] capitalize">
            TGE
          </div>
          <div className="w-[15px] h-[15px] relative" />
        </div>
        <div className="justify-start items-center gap-[5px] flex">
          <div className="text-[#979797] text-lg font-semibold font-['Urbanist'] capitalize">
            Batch 1
          </div>
          <div className="w-[15px] h-[15px] relative" />
        </div>
        <div className="justify-start items-center gap-[5px] flex">
          <div className="text-[#979797] text-lg font-semibold font-['Urbanist'] capitalize">
            Batch 2
          </div>
          <div className="w-[15px] h-[15px] relative" />
        </div>
        <div className="justify-start items-start gap-[5px] flex">
          <div className="text-[#979797] text-lg font-semibold font-['Urbanist'] capitalize">
            Batch 3
          </div>
          <div className="w-[15px] h-[15px] relative" />
        </div>
        <div className="text-[#979797] text-lg font-semibold font-['Urbanist'] capitalize">
          Batch 4
        </div>
        <div className="text-[#979797] text-lg font-semibold font-['Urbanist'] capitalize">
          Batch 5
        </div>
        <div className="text-[#979797] text-lg font-semibold font-['Urbanist'] capitalize">
          Batch 6
        </div>
      </div>
      <div className="self-stretch h-[361px] flex-col justify-start items-start gap-5 flex">
        <div className="w-full h-[11px] relative">
          <div className="left-0 top-0 absolute text-[#afafaf] text-[15px] font-semibold font-['Urbanist'] capitalize">
            Investor
          </div>
          <div className="left-[283.83px] top-0 absolute text-[#afafaf] text-[15px] font-semibold font-['Urbanist']">
            EVM receive address
          </div>
          <div className="left-[554.17px] top-0 absolute text-[#afafaf] text-[15px] font-semibold font-['Urbanist']">
            Allocation
          </div>
          <div className="left-[762.07px] top-0 absolute text-[#afafaf] text-[15px] font-semibold font-['Urbanist']">
            Share
          </div>
          <div className="left-[889.60px] top-0 absolute text-[#afafaf] text-[15px] font-semibold font-['Urbanist']">
            Tokens received
          </div>
          <div className="left-[1088.66px] top-0 absolute text-[#afafaf] text-[15px] font-semibold font-['Urbanist']">
            Vesting progress
          </div>
        </div>
        <div className="w-full h-[0px] border border-[#18191c]/10"></div>
        <div className="self-stretch h-[310px] flex-col justify-start items-start gap-[35px] flex">
          <div className="w-full h-[34px] relative">
            <div className="left-0 top-[11.50px] absolute text-[#18191c] text-[15px] font-semibold font-['Urbanist']">
              adam@presail.com
            </div>
            <div className="h-[21px] left-[283.90px] top-[6.50px] absolute justify-start items-center gap-2.5 inline-flex">
              <div className="text-[#18191c] text-[15px] font-semibold font-['Urbanist']">
                0xa190...0b6d
              </div>
              <div className="w-[18px] h-[21px] relative" />
            </div>
            <div className="left-[758.07px] top-[11.50px] absolute text-[#18191c] text-[15px] font-semibold font-['Urbanist']">
              24.02%
            </div>
            <div className="w-[206.89px] h-[33.15px] left-[1088.66px] top-[0.42px] absolute flex-col justify-start items-end gap-2.5 inline-flex">
              <div className="w-[206.89px] h-[12.15px] relative">
                <div className="w-[206.89px] h-[12.15px] left-0 top-0 absolute bg-[#efefff] rounded-[18px]" />
                <div className="w-[108.35px] h-[12.15px] left-0 top-0 absolute bg-gradient-to-r from-[#5047e6] to-[#7068f5] rounded-[18px]" />
              </div>
              <div className="self-stretch text-right text-[#18191c] text-[15px] font-semibold font-['Urbanist']">
                50%
              </div>
            </div>
            <div className="w-[127px] h-[34px] left-[554.17px] top-0 absolute flex-col justify-start items-start gap-[5px] inline-flex">
              <div className="self-stretch text-[#18191c] text-[15px] font-semibold font-['Urbanist']">
                $8,000.00
              </div>
              <div className="self-stretch text-[#18191c] text-sm font-semibold font-['Urbanist']">
                $7,200.00 after free
              </div>
            </div>
            <div className="w-[98px] h-[34px] left-[889.60px] top-0 absolute flex-col justify-start items-start gap-[5px] inline-flex">
              <div className="self-stretch text-[#18191c] text-[15px] font-semibold font-['Urbanist']">
                360,000 SAND
              </div>
              <div className="self-stretch text-[#18191c] text-sm font-semibold font-['Urbanist']">
                720,000 SAND
              </div>
            </div>
          </div>
          <div className="w-full h-[34px] relative">
            <div className="left-0 top-[11.50px] absolute text-[#18191c] text-[15px] font-semibold font-['Urbanist']">
              adam@presail.com
            </div>
            <div className="h-[21px] left-[283.90px] top-[6.50px] absolute justify-start items-center gap-2.5 inline-flex">
              <div className="text-[#18191c] text-[15px] font-semibold font-['Urbanist']">
                0xa190...0b6d
              </div>
              <div className="w-[18px] h-[21px] relative" />
            </div>
            <div className="left-[758.07px] top-[11.50px] absolute text-[#18191c] text-[15px] font-semibold font-['Urbanist']">
              24.02%
            </div>
            <div className="w-[206.89px] h-[33.15px] left-[1088.66px] top-[0.42px] absolute flex-col justify-start items-end gap-2.5 inline-flex">
              <div className="w-[206.89px] h-[12.15px] relative">
                <div className="w-[206.89px] h-[12.15px] left-0 top-0 absolute bg-[#efefff] rounded-[18px]" />
                <div className="w-[108.35px] h-[12.15px] left-0 top-0 absolute bg-gradient-to-r from-[#5047e6] to-[#7068f5] rounded-[18px]" />
              </div>
              <div className="self-stretch text-right text-[#18191c] text-[15px] font-semibold font-['Urbanist']">
                50%
              </div>
            </div>
            <div className="w-[127px] h-[34px] left-[554.17px] top-0 absolute flex-col justify-start items-start gap-[5px] inline-flex">
              <div className="self-stretch text-[#18191c] text-[15px] font-semibold font-['Urbanist']">
                $8,000.00
              </div>
              <div className="self-stretch text-[#18191c] text-sm font-semibold font-['Urbanist']">
                $7,200.00 after free
              </div>
            </div>
            <div className="w-[98px] h-[34px] left-[889.60px] top-0 absolute flex-col justify-start items-start gap-[5px] inline-flex">
              <div className="self-stretch text-[#18191c] text-[15px] font-semibold font-['Urbanist']">
                360,000 SAND
              </div>
              <div className="self-stretch text-[#18191c] text-sm font-semibold font-['Urbanist']">
                720,000 SAND
              </div>
            </div>
          </div>
          {editing && <Editing handleEdit={handleEdit} />}
        </div>
      </div>
    </div>
  );
}

export default Distribution;
