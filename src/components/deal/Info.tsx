import React from "react";

function Info() {
  return (
    <div className="h-full w-full justify-between items-start gap-[53px] inline-flex">
      <div className=" flex-col justify-start items-start gap-2.5 inline-flex">
        <div className="text-[#18191c] text-2xl font-bold font-['Urbanist'] leading-loose">
          About Universal Project
        </div>
        <div className="text-[#18191c] text-lg font-medium font-['Inter'] leading-7">
          Participate in the Universal Investment Platform Token Event
        </div>
        <div className="w-[759.73px] text-[#2c2c2c] text-[17px] font-normal font-['Urbanist'] leading-normal">
          Universal is a cutting-edge Web3 project that aims to revolutionize
          investment groups and project scaling within the ecosystem. The
          Universal Investment Platform (UIP) offers a sophisticated solution to
          efficiently and securely facilitate investments in Web3. The provided
          rounds outline the terms and conditions for different investment
          rounds in the Universal fundraise.
        </div>
        <div className="w-[760px] px-2.5 py-5 bg-indigo-600/10 rounded-lg justify-center items-center gap-2.5 inline-flex">
          <div className="text-indigo-600 text-xl font-bold font-['Urbanist'] leading-[29px]">
            Join the Universal SEED round today at $2 per token.
          </div>
        </div>
        <div className="text-[#18191c] text-lg font-medium font-['Inter'] leading-7">
          Sale details
        </div>
        <div className="w-[759.73px] text-[#2c2c2c] text-[17px] font-normal font-['Urbanist'] leading-normal">
          Seed Sale starts on the 2nd of June 2024.
          <br />
          Continues until the maximum token allocation is reached or the end of
          August 2024. • A total of 250.000 tokens for sale in this raise.
          <br />
          Minimum purchase amount: $500.
        </div>
        <div className="text-[#18191c] text-lg font-medium font-['Inter'] leading-7">
          Investment rounds
        </div>
        <div className="w-[759.73px] text-[#2c2c2c] text-[17px] font-normal font-['Urbanist'] leading-normal">
          Founding Team: | $1/token | 12 month lock. Linear release over 36
          months.
          <br />
          Seed Round: | $2/token | 6 month lock-up period. Linear release over
          24 months.
          <br />
          Strategic Round: | $3/token | 9-month lock-up period. Linear release
          over 18 months.
          <br />
          Ecosystem Development: Linear release over 24 months.
        </div>
      </div>

      <div className="bg-neutral-100 rounded-[10px] flex-col justify-start items-start gap-[30px] inline-flex"></div>
    </div>
  );
}

export default Info;
