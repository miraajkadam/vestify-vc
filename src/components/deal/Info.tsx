import React from "react";
import Deal from "../projectid/Deal";

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

      <div className="bg-neutral-100 rounded-[10px] flex-col justify-start items-start gap-[30px] inline-flex">
        <Deal />
        {/* <div className="text-[#18191c] text-2xl font-bold font-['Urbanist'] leading-loose">
           Deal Info
         </div>
         <div className="flex-col justify-start items-center gap-5 flex">
           <div className="self-stretch h-[108px] flex-col justify-start items-start gap-2.5 flex">
             <div className="self-stretch justify-between items-center inline-flex">
               <div className="text-[#18191c] text-[17px] font-bold font-['Urbanist'] leading-loose">
                 Token price
               </div>
               <div className="text-right text-[#a5a5a5] text-[17px] font-bold font-['Urbanist'] leading-loose">
                 Seed Round $0.01
               </div>
             </div>
             <div className="justify-start items-start gap-[89px] inline-flex">
               <div className="text-[#18191c] text-[17px] font-bold font-['Urbanist'] leading-loose">
                 Vesting
               </div>
               <div className="text-right text-[#a5a5a5] text-[17px] font-bold font-['Urbanist'] leading-[33px]">
                 20% on TGE,3 Month cliff, 10% monthly
                 <br />
                 thereafter.
               </div>
             </div>
           </div>
           <div className="flex-col justify-start items-center gap-2.5 flex">
             <div className="justify-start items-center gap-2.5 inline-flex">
               <div className="px-[15px] py-3 bg-white rounded-lg justify-start items-center gap-[25.34px] flex">
                 <div className="justify-start items-center gap-[16.89px] flex">
                   <div className="w-[42.23px] h-[42.23px] bg-[#f3f3f3] rounded-lg justify-center items-center gap-[0.84px] flex" />
                   <div className="text-[#18191c] text-sm font-semibold font-['Urbanist'] leading-tight">
                     Medium
                   </div>
                 </div>
                 <div className="w-[13.51px] h-[13.51px] relative" />
               </div>
               <div className="px-[15px] py-3 bg-white rounded-lg justify-start items-center gap-[25.34px] flex">
                 <div className="justify-start items-center gap-[16.89px] flex">
                   <div className="w-[42.23px] h-[42.23px] bg-[#ffeee8] rounded-lg flex-col justify-center items-center gap-[8.45px] inline-flex">
                     <div className="w-[19.43px] h-[18.58px] relative" />
                   </div>
                   <div className="text-[#18191c] text-sm font-semibold font-['Urbanist'] leading-tight">
                     Website
                   </div>
                 </div>
                 <div className="w-[13.51px] h-[13.51px] relative" />
               </div>
             </div>
             <div className="self-stretch justify-start items-center gap-2.5 inline-flex">
               <div className="px-[15px] py-3 bg-white rounded-lg justify-start items-center gap-[25.34px] flex">
                 <div className="justify-start items-center gap-[16.89px] flex">
                   <div className="w-[42.23px] h-[42.23px] p-[8.45px] bg-[#eef9ff] rounded-lg flex-col justify-center items-center gap-[8.45px] inline-flex" />
                   <div className="text-[#18191c] text-sm font-semibold font-['Urbanist'] leading-tight">
                     Twitter
                   </div>
                 </div>
                 <div className="w-[13.51px] h-[13.51px] relative" />
               </div>
               <div className="px-[15px] py-3 bg-white rounded-lg justify-start items-center gap-[25.34px] flex">
                 <div className="justify-start items-center gap-[16.89px] flex">
                   <div className="w-[42.23px] h-[42.23px] bg-[#eaf7fd] rounded-lg flex-col justify-center items-center gap-[8.45px] inline-flex" />
                   <div className="text-[#18191c] text-sm font-semibold font-['Urbanist'] leading-tight">
                     Telegram
                   </div>
                 </div>
                 <div className="w-[13.51px] h-[13.51px] relative" />
               </div>
             </div>
           </div>
         </div> */}
      </div>
    </div>
  );
}

export default Info;
