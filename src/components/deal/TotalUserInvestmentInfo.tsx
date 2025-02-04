import { PoolDetails } from "./types";

type TotalUserInvestmentInfoProps = {
  poolDetails?: PoolDetails;
};

const TotalUserInvestmentInfo = ({
  poolDetails,
}: TotalUserInvestmentInfoProps) => {
  return (
    <>
      <div className="w-full  justify-between items-center inline-flex">
        <div className="justify-between items-center gap-[11px] flex">
          <div className="w-[46px] flex-col justify-start items-start gap-[13px] inline-flex">
            <div className="self-stretch text-[#18191c] text-lg font-bold font-['Urbanist'] capitalize">
              {/* {isTabChange ? "Loading..." : poolDetails?.investments?.length} */}
              {poolDetails?.investments?.length}
            </div>
            <div className="self-stretch text-[#979797] text-[15px] font-bold font-['Urbanist'] capitalize">
              Entries
            </div>
          </div>
          <div className="w-[200px] flex-col justify-start items-start gap-[13px] inline-flex">
            <div className="self-stretch text-[#18191c] text-lg font-bold font-['Urbanist'] capitalize">
              {poolDetails?.investments?.reduce(
                (acc, curr) => acc + (curr?.investment.amount || 0),
                0
              )}
            </div>
            <div className="self-stretch text-[#979797] text-[15px] font-bold font-['Urbanist'] capitalize">
              Raised
            </div>
          </div>
          <div className="w-16 flex-col justify-start items-start gap-[13px] inline-flex">
            <div className="self-stretch text-[#18191c] text-lg font-bold font-['Urbanist'] capitalize">
              {poolDetails?.info?.minAllocation}
            </div>
            <div className="self-stretch text-[#979797] text-[15px] font-bold font-['Urbanist'] capitalize">
              Min.
            </div>
          </div>
          <div className="w-[90px] flex-col justify-start items-start gap-[13px] inline-flex">
            <div className="self-stretch text-[#18191c] text-lg font-bold font-['Urbanist'] capitalize">
              {poolDetails?.info?.maxAllocation}
            </div>
            <div className="self-stretch text-[#979797] text-[15px] font-bold font-['Urbanist'] capitalize">
              Max.
            </div>
          </div>
          <div className="w-[31px] flex-col justify-start items-start gap-[13px] inline-flex">
            <div className="self-stretch text-[#18191c] text-lg font-bold font-['Urbanist'] capitalize">
              {poolDetails?.info?.fee}
            </div>
            <div className="self-stretch text-[#979797] text-[15px] font-bold font-['Urbanist'] capitalize">
              Fee
            </div>
          </div>
        </div>
        {/* <div className="justify-start items-center gap-5 flex">
            <div className="justify-start items-center gap-[5px] flex">
              <div className="w-[15px] h-[15px] relative" />
              <div className="text-[#18191c] text-sm font-semibold font-['Urbanist'] leading-tight">
                Pool link
              </div>
            </div>
            <div className="justify-start items-center gap-[5px] flex">
              <div className="w-[15.76px] h-[15px] relative" />
              <div className="text-[#18191c] text-sm font-semibold font-['Urbanist'] leading-tight">
                Settings
              </div>
            </div>
          </div>
          <div className="px-[11px] py-[3px] rounded-[20px] border border-[#303138]/20 justify-start items-center gap-[29px] flex">
            <div className="text-[#afafaf] text-[13px] font-medium font-['Inter'] leading-7">
              Search by wallet, email, socials...
            </div>
            <div className="w-[18px] h-[18px] relative" />
          </div>
          <div className="justify-start items-center gap-2.5 flex">
            <div className="w-[15px] h-[15px] relative" />
            <div className="px-[15px] py-[3px] bg-[#e4e4e4] rounded-[5px] justify-center items-center gap-2.5 flex">
              <div className="text-[#18191c] text-sm font-semibold font-['Urbanist'] leading-loose">
                Refund
              </div>
            </div>
          </div>
          <div className="justify-start items-center gap-2.5 flex">
            <div className="w-[51px] h-7 p-1 rounded-[15px] border-2 border-[#d6d5d6] justify-start items-center gap-2.5 flex">
              <div className="w-5 h-5 bg-[#868686] rounded-full" />
            </div>
            <div className="text-[#868686] text-[13px] font-medium font-['Inter'] leading-7">
              Show os alloctions
            </div>
          </div> */}
      </div>
    </>
  );
};

export default TotalUserInvestmentInfo;
