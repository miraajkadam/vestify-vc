import React from "react";

function page() {
  const dealsData = [
    {
      deal: "Deal 1",
      allocation: "1000",
      contributed: "800",
      refunded: "200",
      tokensReceived: "100",
      receivingEVM: "EVM1",
      otc: "Yes",
    },
    {
      deal: "Deal 2",
      allocation: "2000",
      contributed: "1500",
      refunded: "500",
      tokensReceived: "200",
      receivingEVM: "EVM2",
      otc: "No",
    },
    // Add more deals as needed
  ];
  return (
    <div className="h-[100vh] w-full bg-white justify-start items-start inline-flex overflow-y-scroll">
      <div className="w-full pb-8 bg-white flex-col justify-start items-start inline-flex">
        {/**header */}
        <div className=" p-8 w-full flex-col justify-between items-start gap-2.5 flex">
          <div className="w-full justify-start items-center gap-4 inline-flex">
            <div className="grow shrink basis-0 text-[#18191c] text-2xl font-extrabold font-['Plus Jakarta Sans'] leading-[38px]">
              Hi, Spicy Capital
            </div>
          </div>
        </div>

        {/**grid */}
        <div className="gap-4 px-8 w-full h-[789px] flex items-center justify-center">
          <div className="grid grid-rows-3 grid-cols-5 gap-4 w-full h-full ">
            {/**item 0 */}
            <div className="bg-blue-500 col-span-2 flex items-center justify-center text-white text-lg rounded-xl">
              Item 1 (2 cols)
            </div>

            {/**item 1 */}
            <div className=" flex items-center w-full h-full relative justify-center text-white text-lg rounded-xl">
              <div className="w-full h-full left-0 top-0 absolute bg-[#f8f8f8] rounded-[18.97px] border border-black/10" />
              <div className="left-[19.11px] top-[18.97px] absolute text-[#18191c] text-[15px] font-medium font-['Urbanist'] leading-[17.39px]">
                Active Investors
              </div>
              <div className="w-[171.65px] h-[171.65px] left-[40.93px] top-[53.86px] absolute">
                <div className="w-[171.65px] h-[171.65px] left-0 top-0 absolute rounded-full border-4 border-white" />
                <div className="w-[171.65px] h-[171.65px] left-0 top-0 absolute rounded-full border-4 border-indigo-600/30" />
                <div className="w-[171.65px] h-[171.65px] left-0 top-0 absolute rounded-full border-4 border-indigo-600/30" />
                <div className="w-[110px] h-[75.22px] left-[30.82px] top-[46.47px] absolute flex-col justify-start items-center gap-[14.22px] inline-flex">
                  <div className="text-[#18191c] text-[37.50px] font-extrabold font-['Urbanist'] leading-[48.25px]">
                    853
                  </div>
                  <div className="text-center text-[#8f8f8f] text-sm font-medium font-['Urbanist'] leading-[17.07px]">
                    Total Number of
                    <br />
                    Active Investors
                  </div>
                </div>
              </div>
            </div>

            {/**item 2 */}
            <div className="w-full flex items-center justify-center text-white text-lg rounded-xl">
              <div className="w-full h-full relative">
                <div className="w-full h-full left-0 top-0 absolute bg-[#4aac86]/5 rounded-[18.97px] border border-[#4aac86]/10" />
                <div className="left-[19.47px] top-[19.40px] absolute text-[#18191c] text-[15px] font-medium font-['Urbanist'] leading-[17.39px]">
                  Current AVG ROI (USD)
                </div>
                <div className="left-[28.97px] top-[144.05px] absolute text-[#18191c]/70 text-[25px] font-semibold font-['Urbanist'] leading-[30px]">
                  3.86x
                </div>
                <div className="left-[28.97px] top-[179.05px] absolute text-[#4aac86] text-[40px] font-extrabold font-['Urbanist'] leading-10">
                  +286.4%
                </div>
              </div>
            </div>

            {/**item 3 */}
            <div className=" w-full h-full relative flex items-center justify-center text-white text-lg rounded-xl">
              <div className="w-full h-full left-0 top-0 absolute bg-[#f4f4ff] rounded-[18.97px] border border-indigo-600/10" />
              <div className="left-[19.47px] top-[19.40px] absolute text-[#18191c] text-[15px] font-medium font-['Urbanist'] leading-[17.39px]">
                Top Performing pool
              </div>
              <div className="w-36 h-[145.50px] left-[56.15px] top-[70.50px] absolute rounded-full border-8 border-white" />
              <div className="w-36 h-[145.50px] left-[56.91px] top-[69.75px] absolute rounded-full border-8 border-indigo-600" />
              <div className="w-[73.66px] h-[26.85px] left-[91.40px] top-[129.75px] absolute text-[#18191c] text-[37.50px] font-extrabold font-['Urbanist'] leading-[45.55px]">
                75%
              </div>
            </div>

            {/**item 4 */}
            <div className="w-full h-full flex flex-col  justify-center align-center gap-[18.97px] inline-flex text-white text-lg rounded-xl ">
              <div className="w-full h-full  bg-[#f8f8f8] p-6 rounded-[18.97px] border border-black/10">
                <div className="text-[#18191c] text-[15px] font-medium font-['Urbanist'] leading-[17.39px]">
                  Last Month’s Investment
                </div>
                <div className="flex-col justify-start items-start gap-[51.21px] flex">
                  <div className="text-[#18191c] text-[37.50px] font-extrabold font-['Urbanist'] leading-[45.55px]">
                    563K
                  </div>
                </div>
              </div>
            </div>

            {/**item 5 */}
            <div className="bg-blue-500 col-span-2 flex items-center justify-center text-white text-lg rounded-xl">
              Item 5
            </div>

            {/**item 6 */}
            <div className="relative flex items-center justify-center text-white text-lg rounded-xl">
              <div className="w-full h-full left-0 top-0 absolute bg-[#f8f8f8] rounded-[18.97px] border border-black/10" />
              <div className="left-[18.90px] top-[18.97px] absolute text-[#18191c] text-[15px] font-medium font-['Urbanist'] leading-[17.39px]">
                Top Investors
              </div>
              <div className="w-full h-full p-2 top-[56.70px] absolute flex-col justify-start items-start gap-[9.48px] inline-flex">
                <div className="self-stretch p-[7.59px] bg-white rounded-[9.48px] justify-start items-center gap-[79.66px] inline-flex">
                  <div className="justify-start items-center gap-[7.59px] flex">
                    <div className="w-[28.45px] h-[28.45px] bg-[#d9d9d9] rounded-[25.60px]" />
                    <div className="text-[#8f8f8f] text-sm font-medium font-['Urbanist'] leading-[17.39px]">
                      Name
                    </div>
                  </div>
                  <div className="justify-start items-center gap-[9.48px] flex">
                    <div className="text-[#757575] text-sm font-bold font-['Urbanist'] leading-[17.39px]">
                      ROI
                    </div>
                    <div className="px-[4.74px] py-[7.59px] bg-[#50c673]/10 rounded-[9.48px] justify-center items-center gap-[4.74px] flex">
                      <div className="w-[10.43px] h-[10.43px] relative" />
                      <div className="text-[#50c673] text-[15.17px] font-bold font-['Urbanist'] leading-[17.39px]">
                        35%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full self-stretch p-[7.59px] bg-white rounded-[9.48px] justify-start items-center gap-[79.66px] inline-flex">
                  <div className="justify-start items-center gap-[7.59px] flex">
                    <div className="w-[28.45px] h-[28.45px] bg-[#d9d9d9] rounded-[25.60px]" />
                    <div className="text-[#8f8f8f] text-sm font-medium font-['Urbanist'] leading-[17.39px]">
                      Name
                    </div>
                  </div>
                  <div className="justify-start items-center gap-[9.48px] flex">
                    <div className="text-[#757575] text-sm font-bold font-['Urbanist'] leading-[17.39px]">
                      ROI
                    </div>
                    <div className="px-[4.74px] py-[7.59px] bg-[#50c673]/10 rounded-[9.48px] justify-center items-center gap-[4.74px] flex">
                      <div className="w-[10.43px] h-[10.43px] relative" />
                      <div className="text-[#50c673] text-[15.17px] font-bold font-['Urbanist'] leading-[17.39px]">
                        35%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch p-[7.59px] bg-white rounded-[9.48px] justify-start items-center gap-[79.66px] inline-flex">
                  <div className="justify-start items-center gap-[7.59px] flex">
                    <div className="w-[28.45px] h-[28.45px] bg-[#d9d9d9] rounded-[25.60px]" />
                    <div className="text-[#8f8f8f] text-sm font-medium font-['Urbanist'] leading-[17.39px]">
                      Name
                    </div>
                  </div>
                  <div className="justify-start items-center gap-[9.48px] flex">
                    <div className="text-[#757575] text-sm font-bold font-['Urbanist'] leading-[17.39px]">
                      ROI
                    </div>
                    <div className="px-[4.74px] py-[7.59px] bg-[#50c673]/10 rounded-[9.48px] justify-center items-center gap-[4.74px] flex">
                      <div className="w-[10.43px] h-[10.43px] relative" />
                      <div className="text-[#50c673] text-[15.17px] font-bold font-['Urbanist'] leading-[17.39px]">
                        35%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/**item 7 */}
            <div className=" flex relative items-center justify-center text-white text-lg rounded-xl">
              <div className="w-full h-full left-0 top-0 absolute bg-[#f8f8f8] rounded-[18.97px] border border-black/10" />
              <div className="w-[46.97px] h-[40.81px] left-[28.74px] top-[61.51px] absolute" />
              <div className="left-[28.74px] top-[131.99px] absolute text-[#18191c]/70 text-[25px] font-semibold font-['Urbanist'] leading-[30px]">
                164.35x
              </div>
              <div className="left-[28.74px] top-[166.99px] absolute text-[#4aac86] text-[40px] font-extrabold font-['Urbanist'] leading-10">
                +16,335.1%
              </div>
              <div className="left-[18.90px] top-[18.97px] absolute text-[#18191c] text-[15px] font-medium font-['Urbanist'] leading-[17.39px]">
                ATH AVG ROI (USD)
              </div>
            </div>

            {/**item 8 */}
            <div className=" w-full  relative col-span-4 gap-[18.97px] flex items-center justify-center text-white text-lg rounded-xl">
              <div className="w-full h-[259.50px] left-0 top-0 absolute bg-[#f8f8f8] rounded-[18.97px] border border-black/10" />
              <div className="left-[19.47px] top-[19.40px] absolute text-[#18191c] text-[15px] font-medium font-['Urbanist'] leading-[17.39px]">
                Top Performing pool
              </div>
              <div className="h-[68px] left-[465px] top-[95.75px] absolute justify-start items-center gap-[33px] inline-flex">
                <div className="w-[188px] flex-col justify-start items-start gap-8 inline-flex">
                  <div className="self-stretch justify-start items-center gap-3.5 inline-flex">
                    <div className="w-[13px] h-[13px] bg-[#4f66c8] rounded-full" />
                    <div>
                      <span className="text-[#18191c] text-[22px] font-bold font-['Urbanist'] leading-[17.39px]">
                        54.5%
                      </span>
                      <span className="text-[#18191c] text-[22px] font-medium font-['Urbanist'] leading-[17.39px]">
                        {" "}
                      </span>
                      <span className="text-[#838383] text-[22px] font-medium font-['Urbanist'] leading-[17.39px]">
                        GameFI
                      </span>
                    </div>
                  </div>
                  <div className="justify-start items-center gap-3.5 inline-flex">
                    <div className="w-[13px] h-[13px] bg-[#a8e79a] rounded-full" />
                    <div>
                      <span className="text-[#18191c] text-[22px] font-bold font-['Urbanist'] leading-[17.39px]">
                        13.6%
                      </span>
                      <span className="text-[#18191c] text-[22px] font-medium font-['Urbanist'] leading-[17.39px]">
                        {" "}
                      </span>
                      <span className="text-[#838383] text-[22px] font-medium font-['Urbanist'] leading-[17.39px]">
                        Meme
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-60 flex-col justify-start items-start gap-8 inline-flex">
                  <div className="justify-start items-center gap-3.5 inline-flex">
                    <div className="w-[13px] h-[13px] bg-[#43485e] rounded-full" />
                    <div>
                      <span className="text-[#18191c] text-[22px] font-bold font-['Urbanist'] leading-[17.39px]">
                        18.2%
                      </span>
                      <span className="text-[#18191c] text-[22px] font-medium font-['Urbanist'] leading-[17.39px]">
                        {" "}
                      </span>
                      <span className="text-[#838383] text-[22px] font-medium font-['Urbanist'] leading-[17.39px]">
                        Other
                      </span>
                    </div>
                  </div>
                  <div className="self-stretch justify-start items-center gap-3.5 inline-flex">
                    <div className="w-[13px] h-[13px] bg-[#8bd449] rounded-full" />
                    <div>
                      <span className="text-[#18191c] text-[22px] font-bold font-['Urbanist'] leading-[17.39px]">
                        13.6%
                      </span>
                      <span className="text-[#18191c] text-[22px] font-medium font-['Urbanist'] leading-[17.39px]">
                        {" "}
                      </span>
                      <span className="text-[#838383] text-[22px] font-medium font-['Urbanist'] leading-[17.39px]">
                        Blockchain s...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[82px] left-[278.87px] top-[88.58px] absolute flex-col justify-start items-start gap-[7px] inline-flex">
                <div className="justify-start items-center gap-[7px] inline-flex">
                  <div className="w-[13px] h-[13px] bg-[#a8e79a] rounded-full" />
                  <div className="text-[#18191c]/60 text-xl font-medium font-['Urbanist'] leading-relaxed">
                    Meme
                  </div>
                </div>
                <div className="text-[#18191c] text-[40px] font-bold font-['Urbanist'] leading-[48.81px]">
                  13.6%
                </div>
              </div>
              <div className="w-36 h-[145.50px] left-[86.97px] top-[57px] absolute rounded-full border-8 border-white" />
              <div className="w-36 h-[145.50px] left-[87.72px] top-[57px] absolute rounded-full border-8 border-[#4f66c8]" />
              <div className="w-36 h-[145.50px] left-[87.72px] top-[57px] absolute rounded-full border-8 border-[#43485e]" />
              <div className="w-36 h-[145.50px] left-[87.72px] top-[57px] absolute rounded-full border-8 border-[#a8e79a]" />
              <div className="w-36 h-[145.50px] left-[87.72px] top-[57px] absolute rounded-full border-8 border-[#8bd449]" />
            </div>

            {/**item 9 */}
            <div className="relative  flex items-center justify-center text-white text-lg rounded-xl">
              <div className="w-full h-[259.50px] left-0 top-0 absolute bg-[#3891e1]/5 rounded-[18.97px] border border-[#3892e1]/10" />
              <div className="left-[19.11px] top-[18.97px] absolute text-[#18191c] text-[15px] font-medium font-['Urbanist'] leading-[17.39px]">
                Number of IDOs
              </div>
              <div className="h-[85px] p-5 left-[70.15px] top-[87.25px] absolute rounded-[20px] border-2 border-black/5 justify-start items-center gap-[22px] inline-flex">
                <div className="w-[46px] h-[45px] relative" />
                <div className="text-[#18191c] text-[40px] font-extrabold font-['Urbanist'] leading-10">
                  44
                </div>
              </div>
            </div>
          </div>
        </div>

        {/**project2 */}
        <div className="  px-4 w-full flex-col justify-between items-start gap-6 flex">
          <div className="w-full px-[20px] pt-[20px] flex-col justify-start items-end gap-[30px] flex">
            <div className="w-full ">
              <h1 className="text-[#18191c] text-2xl font-extrabold font-['Plus Jakarta Sans'] leading-[38px] mb-[15px]">
                Projects
              </h1>
              <div className="w-full h-auto relative grid grid-cols-8 items-center text-[#afafaf] text-[15px] font-semibold gap-[10px]">
                <div className="col-span-2">Project Name</div>
                <div>Pledge Amount</div>
                <div>Market Cap</div>
                <div>Exchange</div>
                <div>Raised Amount</div>
                <div>Ongoing Claim</div>

                <div></div>

                {dealsData.map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="h-[55.36px] col-span-2 flex justify-start items-center">
                      <div className="w-[55.36px] h-[55.36px] bg-[#d9d9d9]" />
                      <div className=" ml-4 text-[#303138] text-lg font-bold font-['Urbanist'] leading-[32.85px]">
                        Hypermove
                      </div>
                    </div>
                    <div className=" text-[#505050] text-lg font-bold font-['Urbanist'] leading-[32.85px]">
                      $23.000
                    </div>
                    <div className="">
                      <div className="text-[#303138] text-lg font-extrabold font-['Urbanist'] leading-[32.85px]">
                        56.00M
                      </div>
                    </div>
                    <div className=" text-[#505050] text-lg font-bold font-['Urbanist'] leading-[32.85px]">
                      43
                    </div>
                    <div className="">
                      <span className="text-[#505050] text-lg font-bold font-['Urbanist'] leading-[32.85px]">
                        +$3.00
                      </span>
                    </div>
                    <div className="">
                      <span className="text-[#505050] text-lg font-bold font-['Urbanist'] leading-[32.85px]">
                        8.00
                      </span>
                    </div>
                    <div className="">
                      <div className="w-24 h-[35px] p-2.5   bg-[#443cc4] rounded-[28px] justify-center items-center gap-2.5 inline-flex">
                        <div className="text-white text-sm font-semibold font-['Urbanist'] capitalize tracking-tight">
                          Details
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
