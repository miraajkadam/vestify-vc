import React from "react";

function Editing({ handleEdit }: any) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto"
      onClick={handleEdit}
    >
      <div
        className="w-[823px] h-[901px] relative bg-white rounded-[10px] m-[10px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-[827.53px] left-[36.50px] top-[36.74px] absolute flex-col justify-start items-start gap-8 inline-flex">
          <div className="self-stretch h-[188px] flex-col justify-start items-start gap-5 flex">
            <div className="self-stretch text-[#18191c] text-[25px] font-bold font-['Urbanist'] leading-7">
              Vesting schedule for Universal Project
            </div>
            <div className="self-stretch h-[0px] border border-black"></div>
            <div className="self-stretch h-[120px] flex-col justify-start items-start gap-[15px] flex">
              <div className="self-stretch text-[#18191c] text-[25px] font-bold font-['Urbanist'] leading-7">
                Edit vesting schedule
              </div>
              <div className="self-stretch h-[77px] flex-col justify-start items-start gap-[5px] flex">
                <div className="w-[750px] text-[#2c2c2c] text-base font-normal font-['Urbanist'] leading-normal">
                  We advise you to set up a vesting schedule first to make the
                  distribution process more seanless for you and your community.
                </div>
                <div className="self-stretch text-[#2c2c2c] text-base font-normal font-['Urbanist'] leading-normal">
                  You can always set up or edit a vesting schedule later
                </div>
              </div>
            </div>
          </div>
          <div className="w-[742.16px] h-[427.45px] relative">
            <div className="left-0 top-0 absolute text-[#18191c] text-base font-bold font-['Urbanist']">
              Batch
            </div>
            <div className="left-[304.53px] top-0 absolute text-[#18191c] text-base font-bold font-['Urbanist']">
              Batch date
            </div>
            <div className="left-[535.03px] top-0 absolute text-[#18191c] text-base font-bold font-['Urbanist']">
              Batch percentage
            </div>
            <div className="w-[742.16px] h-[398.54px] left-0 top-[28.92px] absolute flex-col justify-start items-start gap-[15px] inline-flex">
              <div className="self-stretch justify-start items-center gap-[15px] inline-flex">
                <div className="w-[289.53px] h-[44.08px] relative">
                  <div className="w-[289.53px] h-[44.08px] left-0 top-0 absolute bg-[#e6e6e6] rounded-lg" />
                  <div className="left-[12.03px] top-[12.54px] absolute text-[#757575] text-base font-semibold font-['Urbanist']">
                    TGE
                  </div>
                </div>
                <div className="w-[215.50px] h-[44.08px] relative">
                  <div className="w-[215.50px] h-[44.08px] left-0 top-0 absolute bg-[#e6e6e6] rounded-lg" />
                  <div className="left-[12.64px] top-[12.54px] absolute text-[#757575] text-base font-semibold font-['Urbanist']">
                    07/09/2023
                  </div>
                </div>
                <div className="w-[171.83px] h-[44.08px] relative">
                  <div className="w-[171.83px] h-[44.08px] left-0 top-0 absolute bg-[#e6e6e6] rounded-lg" />
                  <div className="left-[12.64px] top-[12.54px] absolute text-[#757575] text-base font-semibold font-['Urbanist']">
                    25.0
                  </div>
                </div>
                <div className="w-[20.30px] h-[20.30px] relative" />
              </div>
              <div className="self-stretch justify-start items-center gap-[15px] inline-flex">
                <div className="w-[289.53px] h-[44.08px] relative">
                  <div className="w-[289.53px] h-[44.08px] left-0 top-0 absolute bg-[#e6e6e6] rounded-lg" />
                  <div className="left-[12.03px] top-[12.54px] absolute text-[#757575] text-base font-semibold font-['Urbanist']">
                    Batch 1
                  </div>
                </div>
                <div className="w-[215.50px] h-[44.08px] relative">
                  <div className="w-[215.50px] h-[44.08px] left-0 top-0 absolute bg-[#e6e6e6] rounded-lg" />
                  <div className="left-[12.64px] top-[12.54px] absolute text-[#757575] text-base font-semibold font-['Urbanist']">
                    07/09/2023
                  </div>
                </div>
                <div className="w-[171.83px] h-[44.08px] relative">
                  <div className="w-[171.83px] h-[44.08px] left-0 top-0 absolute bg-[#e6e6e6] rounded-lg" />
                  <div className="left-[12.64px] top-[12.54px] absolute text-[#757575] text-base font-semibold font-['Urbanist']">
                    25.0
                  </div>
                </div>
                <div className="w-[20.30px] h-[20.30px] relative" />
              </div>
              <div className="self-stretch justify-start items-center gap-[15px] inline-flex">
                <div className="w-[289.53px] h-[44.08px] relative">
                  <div className="w-[289.53px] h-[44.08px] left-0 top-0 absolute bg-[#e6e6e6] rounded-lg" />
                  <div className="left-[12.03px] top-[12.54px] absolute text-[#757575] text-base font-semibold font-['Urbanist']">
                    Batch 2
                  </div>
                </div>
                <div className="w-[215.50px] h-[44.08px] relative">
                  <div className="w-[215.50px] h-[44.08px] left-0 top-0 absolute bg-[#e6e6e6] rounded-lg" />
                  <div className="left-[12.64px] top-[12.54px] absolute text-[#757575] text-base font-semibold font-['Urbanist']">
                    07/09/2023
                  </div>
                </div>
                <div className="w-[171.83px] h-[44.08px] relative">
                  <div className="w-[171.83px] h-[44.08px] left-0 top-0 absolute bg-[#e6e6e6] rounded-lg" />
                  <div className="left-[12.64px] top-[12.54px] absolute text-[#757575] text-base font-semibold font-['Urbanist']">
                    25.0
                  </div>
                </div>
                <div className="w-[20.30px] h-[20.30px] relative" />
              </div>
              <div className="self-stretch justify-start items-center gap-[15px] inline-flex">
                <div className="w-[289.53px] h-[44.08px] relative">
                  <div className="w-[289.53px] h-[44.08px] left-0 top-0 absolute bg-[#e6e6e6] rounded-lg" />
                  <div className="left-[12.03px] top-[12.54px] absolute text-[#757575] text-base font-semibold font-['Urbanist']">
                    Batch 3
                  </div>
                </div>
                <div className="w-[215.50px] h-[44.08px] relative">
                  <div className="w-[215.50px] h-[44.08px] left-0 top-0 absolute bg-[#e6e6e6] rounded-lg" />
                  <div className="left-[12.64px] top-[12.54px] absolute text-[#757575] text-base font-semibold font-['Urbanist']">
                    07/09/2023
                  </div>
                </div>
                <div className="w-[171.83px] h-[44.08px] relative">
                  <div className="w-[171.83px] h-[44.08px] left-0 top-0 absolute bg-[#e6e6e6] rounded-lg" />
                  <div className="left-[12.64px] top-[12.54px] absolute text-[#757575] text-base font-semibold font-['Urbanist']">
                    25.0
                  </div>
                </div>
                <div className="w-[20.30px] h-[20.30px] relative" />
              </div>
              <div className="self-stretch justify-start items-center gap-[15px] inline-flex">
                <div className="w-[289.53px] h-[44.08px] relative">
                  <div className="w-[289.53px] h-[44.08px] left-0 top-0 absolute rounded-lg border border-[#bfbfbf]" />
                  <div className="left-[12.03px] top-[12.54px] absolute text-[#757575] text-base font-semibold font-['Urbanist']">
                    Batch 4
                  </div>
                </div>
                <div className="w-[215.50px] h-[44.08px] relative">
                  <div className="w-[215.50px] h-[44.08px] left-0 top-0 absolute rounded-lg border border-[#bfbfbf]" />
                  <div className="w-[17.53px] h-[19.50px] left-[182.64px] top-[12.29px] absolute" />
                  <div className="left-[12.64px] top-[12.54px] absolute text-[#757575] text-base font-semibold font-['Urbanist']">
                    07/09/2023
                  </div>
                </div>
                <div className="w-[171.83px] h-[44.08px] relative">
                  <div className="w-[171.83px] h-[44.08px] left-0 top-0 absolute rounded-lg border border-[#bfbfbf]" />
                  <div className="left-[12.64px] top-[12.54px] absolute text-[#757575] text-base font-semibold font-['Urbanist']">
                    25.0
                  </div>
                </div>
                <div className="w-[16.20px] h-[19.68px] relative" />
              </div>
              <div className="self-stretch justify-start items-center gap-[15px] inline-flex">
                <div className="w-[289.53px] h-[44.08px] relative">
                  <div className="w-[289.53px] h-[44.08px] left-0 top-0 absolute rounded-lg border border-[#bfbfbf]" />
                  <div className="left-[12.03px] top-[12.54px] absolute text-[#757575] text-base font-semibold font-['Urbanist']">
                    Batch 4
                  </div>
                </div>
                <div className="w-[215.50px] h-[44.08px] relative">
                  <div className="w-[215.50px] h-[44.08px] left-0 top-0 absolute rounded-lg border border-[#bfbfbf]" />
                  <div className="w-[17.53px] h-[19.50px] left-[182.64px] top-[12.29px] absolute" />
                  <div className="left-[12.64px] top-[12.54px] absolute text-[#757575] text-base font-semibold font-['Urbanist']">
                    07/09/2023
                  </div>
                </div>
                <div className="w-[171.83px] h-[44.08px] relative">
                  <div className="w-[171.83px] h-[44.08px] left-0 top-0 absolute rounded-lg border border-[#bfbfbf]" />
                  <div className="left-[12.64px] top-[12.54px] absolute text-[#757575] text-base font-semibold font-['Urbanist']">
                    25.0
                  </div>
                </div>
                <div className="w-[16.20px] h-[19.68px] relative" />
              </div>
              <div className="self-stretch justify-start items-center gap-[15px] inline-flex">
                <div className="w-[289.53px] h-[44.08px] relative">
                  <div className="w-[289.53px] h-[44.08px] left-0 top-0 absolute rounded-lg border border-[#bfbfbf]" />
                  <div className="left-[12.03px] top-[12.54px] absolute text-[#757575] text-base font-semibold font-['Urbanist']">
                    Batch 4
                  </div>
                </div>
                <div className="w-[215.50px] h-[44.08px] relative">
                  <div className="w-[215.50px] h-[44.08px] left-0 top-0 absolute rounded-lg border border-[#bfbfbf]" />
                  <div className="w-[17.53px] h-[19.50px] left-[182.64px] top-[12.29px] absolute" />
                  <div className="left-[12.64px] top-[12.54px] absolute text-[#757575] text-base font-semibold font-['Urbanist']">
                    07/09/2023
                  </div>
                </div>
                <div className="w-[171.83px] h-[44.08px] relative">
                  <div className="w-[171.83px] h-[44.08px] left-0 top-0 absolute rounded-lg border border-[#bfbfbf]" />
                  <div className="left-[12.64px] top-[12.54px] absolute text-[#757575] text-base font-semibold font-['Urbanist']">
                    25.0
                  </div>
                </div>
                <div className="w-[16.20px] h-[19.68px] relative" />
              </div>
            </div>
          </div>
          <div className="w-[750px] h-[73.08px] relative">
            <div className="left-0 top-[41.54px] absolute text-[#18191c] text-base font-bold font-['Urbanist']">
              Add more batches:
            </div>
            <div className="h-[73.08px] left-[164.34px] top-0 absolute flex-col justify-start items-start gap-2.5 inline-flex">
              <div className="text-[#18191c] text-base font-bold font-['Urbanist']">
                Number of new batches
              </div>
              <div className="w-[200px] h-[44.08px] relative">
                <div className="left-[12.15px] top-[12.54px] absolute text-[#757575] text-base font-semibold font-['Urbanist']">
                  1
                </div>
                <div className="w-[200px] h-[44.08px] left-0 top-0 absolute rounded-lg border border-[#bfbfbf]" />
              </div>
            </div>
            <div className="w-[200px] h-[73.08px] left-[379.34px] top-0 absolute flex-col justify-start items-start gap-2.5 inline-flex">
              <div className="self-stretch text-[#18191c] text-base font-bold font-['Urbanist']">
                Batches interval
              </div>
              <div className="w-[200px] h-[44.08px] relative">
                <div className="left-[12.15px] top-[12.54px] absolute text-[#757575] text-base font-semibold font-['Urbanist']">
                  Monthly
                </div>
                <div className="w-[200px] h-[44.08px] left-0 top-0 absolute rounded-lg border border-[#bfbfbf]" />
              </div>
            </div>
            <div className="left-[648.84px] top-[41.54px] absolute text-[#757575] text-base font-semibold font-['Urbanist']">
              Add Batches
            </div>
            <div className="w-[155.66px] h-[44.08px] left-[594.34px] top-[29px] absolute rounded-lg border border-[#bfbfbf]" />
            <div className="w-[44.45px] h-[44.08px] left-[594.34px] top-[29px] absolute bg-[#18191c] rounded-tl-lg rounded-bl-lg" />
            <div className="w-[16.05px] h-[16.05px] left-[608.54px] top-[43.01px] absolute" />
          </div>
          <div className="w-[750px] h-[43px] relative">
            <div className="h-[18px] left-0 top-[12.50px] absolute justify-start items-center gap-2.5 inline-flex">
              <div className="w-[19.03px] h-[17.29px] relative" />
              <div className="text-[#757575] text-[15px] font-semibold font-['Urbanist']">
                Distributed and confirmed batches cannot be edited.
              </div>
            </div>
            <div className="h-[43px] p-[15px] left-[541px] top-0 absolute bg-indigo-600 rounded-[5px] justify-center items-center gap-2.5 inline-flex">
              <div className="text-white text-lg font-semibold font-['Urbanist'] leading-loose">
                Save vesting schedule
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editing;
