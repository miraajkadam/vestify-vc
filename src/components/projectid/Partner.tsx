import React from "react";
import { Partners } from "./types";

function Partner({
  partnersAndInvestors,
}: {
  partnersAndInvestors?: Partners[];
}) {
  return (
    <>
      <div className="w-full h-[0px] border border-[#18191c]/20"></div>
      <div className="w-full p-[30px] bg-[#f8f8f8] rounded-lg flex-col justify-start items-center gap-[30px] flex">
        <div className="w-full text-center text-[#18191c] text-2xl font-bold font-['Urbanist'] leading-loose">
          Partners and Investors
        </div>
        <div className="self-stretch justify-between items-start gap-[85px] inline-flex">
          {partnersAndInvestors?.map((partner: any, index: number) => (
            <img
              key={index}
              className="w-[124.27px] h-[25px]"
              src={partner?.logoBase64}
              alt={partner?.name}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Partner;
