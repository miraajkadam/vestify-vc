import React from "react";
import { Projects, TokenMetrics } from "./types";

function Token({
  tokenMetrics,
  project,
}: {
  tokenMetrics?: TokenMetrics;
  project?: Projects;
}) {
  // const firsttoken = tokenMetrics[0];
  return (
    <>
      <div className="w-full px-2.5 py-5 bg-indigo-600/10 rounded-lg justify-center items-center gap-2.5 inline-flex">
        <div className="text-indigo-600 text-xl font-bold font-['Urbanist'] leading-[29px]">
          Join the Universal {tokenMetrics?.round} round today at $
          {tokenMetrics?.price} per token.
        </div>
      </div>
      <div className="w-full flex-col justify-start items-start gap-2.5 flex">
        <div className="w-full text-[#18191c] text-lg font-medium font-['Inter'] leading-7">
          Sale details
        </div>
        <div className="w-full text-[#2c2c2c] text-[17px] font-normal font-['Urbanist'] leading-normal">
          {tokenMetrics?.round} Sale starts on the 2nd of June 2024.
          <br />
          Continues until the maximum token allocation is reached or the end of
          August 2024. • A total of 250.000 tokens for sale in this raise.
          <br />
          Minimum purchase amount: ${tokenMetrics?.price}.
        </div>
      </div>
      <div className="w-full flex-col justify-start items-start gap-2.5 flex">
        <div className="w-full text-[#18191c] text-lg font-medium font-['Inter'] leading-7">
          Investment rounds
        </div>
        <div className="w-full text-[#2c2c2c] text-[17px] font-normal font-['Urbanist'] leading-normal">
          {/* {tokenMetrics?.map((token: any) => (
          ))} */}
          <div>
            {tokenMetrics?.round} Round: | ${tokenMetrics?.price}/token | 6
            month lock-up period. Linear release over 24 months.
          </div>
        </div>
      </div>
    </>
  );
}

export default Token;
