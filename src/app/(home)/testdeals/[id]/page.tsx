"use client";
import { useState } from "react";
import Table from "@/components/deal/Table";
import Info from "@/components/deal/Info";
import React from "react";
import Fundrasing from "@/components/deal/Fundrasing";
import Distribution from "@/components/deal/Distribution";
import { useProjectDetails } from "@/hooks/useVCProjectDetails";
import { useDistPools } from "@/hooks/useDistPools";

function page({ params }: { params: { id: string } }) {
  console.log(params.id, "params");

  const { data, isPending, isError } = useProjectDetails(params.id);
  const { data: walletPools } = useDistPools(params.id);

  console.log(walletPools, "walletPools");
  const [selectedOption, setSelectedOption] = useState("Deal Info");

  const handleSelect = (option: string) => {
    setSelectedOption(option);
  };

  const renderComponent = () => {
    switch (selectedOption) {
      case "Fundraising":
        return <Fundrasing projectId={params.id} />;
      case "Distributions":
        return <Distribution projectId={params.id} />;
      default:
        return (
          <Info
            tokenMetrics={data?.data?.tokenMetrics}
            project={data?.data?.project}
          />
        );
    }
  };

  return (
    <div className="h-full w-full bg-white justify-start items-start inline-flex">
      <div className="h-full w-full pt-[35px] pb-8 bg-white flex-col justify-start items-end inline-flex">
        <div className="h-full w-full px-8 flex-col justify-start items-start flex">
          <div className="h-full w-full flex-col justify-start items-start gap-[30px] flex">
            {/**Top */}
            <div className=" w-full justify-between items-end gap-[103px] inline-flex">
              <div className="flex-col justify-start items-start gap-6 inline-flex">
                <div className="flex-col justify-start items-start gap-[15px] flex">
                  <div className="p-1.5 bg-[#f3f3f3] rounded-[50px] justify-center items-center gap-2.5 inline-flex">
                    <div className="text-black text-[15px] font-semibold font-['Urbanist'] leading-snug">
                      Distributing
                    </div>
                  </div>
                  <div className="text-black text-3xl font-bold font-['Urbanist'] leading-[43.50px]">
                    {data?.data?.project?.name}
                  </div>
                </div>
                <div className="justify-start items-start gap-6 inline-flex">
                  <div className="p-[15px] bg-[#f3f3f3] rounded-[10px] flex-col justify-start items-start gap-[15px] inline-flex">
                    <div className="text-black text-[25px] font-extrabold font-['Urbanist'] leading-9">
                      ${data?.data?.tokenMetrics?.price}
                    </div>
                    <div className="text-[#6c6c6c] text-base font-semibold font-['Urbanist'] leading-normal">
                      Seed Round
                    </div>
                  </div>
                  <div className="p-[15px] bg-[#f3f3f3] rounded-[10px] flex-col justify-start items-start gap-[15px] inline-flex">
                    <div className="text-black text-[25px] font-extrabold font-['Urbanist'] leading-9">
                      {data?.data?.project?.tokensReceived || "N/A"}
                    </div>
                    <div className="text-[#6c6c6c] text-base font-semibold font-['Urbanist'] leading-normal">
                      Tokens received
                    </div>
                  </div>
                </div>
                <div className="justify-start items-center gap-2.5 inline-flex">
                  <div className="w-[1012.05px] h-[16.08px] relative">
                    <div className="w-[1012.05px] h-[16.08px] left-0 top-0 absolute bg-[#f3f3f3] rounded-[18px]" />
                    <div className="w-[543.72px] h-[16.08px] left-0 top-0 absolute bg-gradient-to-r from-[#5047e6] to-[#7068f5] rounded-[18px]" />
                  </div>
                  <div className="text-black text-[17px] font-bold font-['Urbanist'] leading-normal">
                    50%
                  </div>
                </div>
              </div>
              <div className="flex-col justify-start items-end gap-[25px] inline-flex">
                <div className="w-[84.84px] h-[84.84px] bg-[#d9d9d9] rounded-[60px]" />
                <div className="flex-col justify-start items-end gap-[15px] flex">
                  <div className="text-black text-[22px] font-extrabold font-['Urbanist'] leading-loose">
                    $0.00
                  </div>
                  <div className="text-[#6c6c6c] text-[15px] font-semibold font-['Urbanist'] leading-snug">
                    Your allocation
                  </div>
                </div>
              </div>
            </div>

            <div className=" w-full flex-col justify-start items-start gap-[30px] flex">
              <div className="h-full w-full flex-col justify-start items-start flex">
                <div className="justify-center items-start gap-[39px] inline-flex">
                  {/* Deal Info */}
                  <div
                    className={`py-[15px] px-[15px] justify-center items-center gap-2.5 flex ${
                      selectedOption === "Deal Info"
                        ? "pt-[15px] pb-5 bg-[#f7f7ff] rounded-tl-[10px] rounded-tr-[10px] text-[#7870fc] border-b-[3px] border-[#7870fc]"
                        : ""
                    }`}
                    onClick={() => handleSelect("Deal Info")}
                  >
                    <div className="text-[#505050] text-lg font-semibold font-['Urbanist'] capitalize">
                      Deal Info
                    </div>
                  </div>

                  {/* Fundraising */}
                  <div
                    className={`px-[15px] py-[15px]  justify-center items-center gap-2.5 flex ${
                      selectedOption === "Fundraising"
                        ? "pt-[15px] pb-5 bg-[#f7f7ff] rounded-tl-[10px] rounded-tr-[10px] text-[#7870fc] border-b-[3px] border-[#7870fc]"
                        : ""
                    }`}
                    onClick={() => handleSelect("Fundraising")}
                  >
                    <div className="text-[#505050] text-lg font-semibold font-['Urbanist'] capitalize">
                      Fundraising
                    </div>
                  </div>

                  {/* Distributions */}
                  <div
                    className={`py-[15px] px-[15px] justify-center items-center gap-2.5 flex ${
                      selectedOption === "Distributions"
                        ? "pt-[15px] pb-5 bg-[#f7f7ff] rounded-tl-[10px] rounded-tr-[10px] text-[#7870fc] border-b-[3px] border-[#7870fc]"
                        : ""
                    }`}
                    onClick={() => handleSelect("Distributions")}
                  >
                    <div className="text-[#505050] text-lg font-semibold font-['Urbanist'] capitalize">
                      Distributions
                    </div>
                  </div>
                </div>
                <div className="w-full h-[0px] relative">
                  <div className="w-full h-[0px] left-0 top-0 absolute border border-[#e1e1e1]"></div>
                </div>
              </div>
              <div className="w-full">{renderComponent()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
