import React, { useEffect, useState } from "react";
import { FileUploadModal } from "./UploadFile";
import { useAddPools } from "@/hooks/useCreatePool";
import { ToastContainer, toast } from "react-toastify";
import { useDistPools } from "@/hooks/useDistPools";
import { TabBar } from "../ui/TabBar";
import { useQueryClient } from "@tanstack/react-query";
import { useDistPoolDetails } from "@/hooks/useDistPoolDetails";
import { PoolDetails } from "./types";
import TotalUserInvestmentInfo from "./TotalUserInvestmentInfo";
import UserInvestmentTable from "./UserInvestmentTable";
import { LoadingSpinner } from "../Loader/Loader";
function Fundrasing({ projectId }: { projectId: string }) {
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);
  const [groupName, setGroupName] = useState<string>("");
  const [isGroupNameAdded, setIsGroupNameAdded] = useState<boolean>(false);
  const [excelData, setExcelData] = useState<any[]>([]);
  const [poolDetails, setPoolDetails] = useState<PoolDetails>();
  const { mutateAsync, isPending } = useAddPools();
  const {
    mutateAsync: getPoolDetails,
    isPending: isTabChange,
    data,
    error,
  } = useDistPoolDetails();

  const { data: walletPools, refetch } = useDistPools(projectId);

  // const { data: pools } = walletPools;

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
    if (e.target.value.length === 0) {
      setIsGroupNameAdded(true);
    } else {
      setIsGroupNameAdded(false);
    }
  };

  const handleDistribute = async () => {
    if (!groupName) {
      setIsGroupNameAdded(true);
    } else {
      const payload = {
        name: groupName,
        addresses: excelData
          .splice(0, excelData.length - 1)
          .map((item) => item.walletAddress),
        projectId: projectId,
        fee: 433,
        maxAllocation: 40,
        minAllocation: 30,
      };
      try {
        await mutateAsync(payload);
        toast.success("Uploaded success fully");
        refetch();
        setOpenModal(false);
      } catch (err) {
        setOpenModal(false);
        toast.error("API got failed ");
      }
    }
  };

  const handleTabClick = async (poolId: string) => {
    try {
      const res = await getPoolDetails(poolId);
      setPoolDetails(res?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
    setExcelData([]);
    setGroupName("");
  };

  return (
    <div className="w-full  flex-col justify-start items-start gap-5 flex">
      <div className="  self-stretch  flex-col justify-start items-start gap-10 flex">
        <div className="w-full  justify-between items-center gap-[456px] inline-flex">
          <div className="justify-start items-center gap-2.5 flex">
            <div className="text-[#18191c] text-2xl font-bold font-['Urbanist'] leading-loose">
              Pools
            </div>
            <div className="w-5 h-5 relative" />
          </div>
          <div className="h-[43px] justify-start items-center gap-[18px] flex">
            <div className="h-full px-2 bg-indigo-600 rounded-[5px] justify-center items-center gap-2.5 flex">
              <button
                onClick={() => setOpenModal(true)}
                className="text-white text-lg font-semibold font-['Urbanist'] leading-loose"
              >
                Add Pool
              </button>
            </div>
            {/* <div className="h-full px-2 rounded-[5px] border border-[#908eb6] justify-center items-center gap-2.5 flex">
              <div className="text-[#908eb6] text-lg font-semibold font-['Urbanist'] leading-loose">
                Pool links
              </div>
            </div>
            <div className="h-full px-2 rounded-[5px] border border-[#908eb6] justify-center items-center gap-2.5 flex">
              <div className="text-[#908eb6] text-lg font-semibold font-['Urbanist'] leading-loose">
                Export
              </div>
            </div>
            <div className="h-full px-2 rounded-[5px] border border-[#619b6a] justify-center items-center gap-2.5 flex">
              <div className="text-[#619b6a] text-lg font-semibold font-['Urbanist'] leading-loose">
                Import spreadsheets
              </div>
            </div>
            <div className="h-full px-2 rounded-[5px] border border-[#908eb6] justify-center items-center gap-2.5 flex">
              <div className="text-[#908eb6] text-lg font-semibold font-['Urbanist'] leading-loose">
                Add investor
              </div>
            </div> */}
          </div>
        </div>
        <TabBar tabs={walletPools?.data} handleTabClick={handleTabClick} />

        {/* <div className="w-full h-full flex-col justify-start items-start flex">
          <div className="justify-center items-start gap-[39px] inline-flex">
            <div className="py-[15px] justify-center items-center gap-2.5 flex">
              <div className="text-[#505050] text-lg font-semibold font-['Urbanist']">
                All allocations
              </div>
            </div>
            <div className="px-[15px] pt-[15px] pb-5 bg-[#f7f7ff] rounded-tl-[10px] rounded-tr-[10px] justify-center items-center gap-2.5 flex">
              <div className="justify-center items-center gap-2.5 flex">
                <div className="text-[#7870fc] text-lg font-semibold font-['Urbanist'] capitalize">
                  Main Investors
                </div>
              </div>
            </div>
            <div className="py-[15px] justify-center items-center gap-2.5 flex">
              <div className="text-[#505050] text-lg font-semibold font-['Urbanist'] capitalize">
                Investors
              </div>
            </div>

            {pools?.map((item: any) => (
              <div
                key={item?.id}
                className="py-[15px] justify-center items-center gap-2.5 flex"
              >
                <div className="text-[#505050] text-lg font-semibold font-['Urbanist'] capitalize">
                  {item?.name}
                </div>
              </div>
            ))}
          </div>
          <div className="w-full h-[0px] relative">
            <div className="w-full h-[0px] left-0 top-0 absolute border border-[#e1e1e1]"></div>
            <div className="w-[147px] h-[0px] left-[150px] top-0 absolute border-2 border-[#7870fc]"></div>
          </div>
        </div> */}
      </div>

      {/* Bottom */}

      {isTabChange ? (
        <div className="flex h-10 mt-20 justify-center items-center w-full">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="  w-full h-full  relative">
          <TotalUserInvestmentInfo poolDetails={poolDetails} />
          <UserInvestmentTable tableInfo={poolDetails?.investments} />

          {/**Table */}
          {/* <div className="w-full h-[11px] left-[32.05px] top-[77px] absolute">
          <div className="w-full h-[11px] left-0 top-0 absolute justify-between items-center gap-[5px] inline-flex">
            <div className="text-[#afafaf] text-[15px] font-semibold font-['Urbanist'] capitalize">
              Telegram
            </div>
          </div>
          <div className="left-[114.53px] top-0 absolute text-[#afafaf] text-[15px] font-semibold font-['Urbanist'] capitalize">
            Discord
          </div>
          <div className="left-[252.07px] top-0 absolute text-[#afafaf] text-[15px] font-semibold font-['Urbanist'] capitalize">
            Account EVM
          </div>
          <div className="h-[11px] left-[377.71px] top-0 absolute justify-start items-center gap-[5px] inline-flex">
            <div className="text-[#afafaf] text-[15px] font-semibold font-['Urbanist'] capitalize">
              KYC
            </div>
            <div className="w-2 h-[11px] relative" />
          </div>
          <div className="h-[11px] left-[448.36px] top-0 absolute justify-start items-center gap-[5px] inline-flex">
            <div className="text-[#afafaf] text-[15px] font-semibold font-['Urbanist'] capitalize">
              Allocation
            </div>
            <div className="w-2 h-[11px] relative" />
          </div>
          <div className="h-[11px] left-[552px] top-0 absolute justify-start items-center gap-[5px] inline-flex">
            <div className="text-[#afafaf] text-[15px] font-semibold font-['Urbanist'] capitalize">
              Pool
            </div>
            <div className="w-2 h-[11px] relative" />
          </div>
          <div className="h-[11px] left-[689px] top-0 absolute justify-start items-center gap-[5px] inline-flex">
            <div className="text-[#afafaf] text-[15px] font-semibold font-['Urbanist'] capitalize">
              Currency
            </div>
            <div className="w-2 h-[11px] relative" />
          </div>
          <div className="h-[11px] left-[801.87px] top-0 absolute justify-start items-center gap-[5px] inline-flex">
            <div className="text-[#afafaf] text-[15px] font-semibold font-['Urbanist'] capitalize">
              Contributed
            </div>
            <div className="w-2 h-[11px] relative" />
          </div>
          <div className="h-[11px] left-[934.74px] top-0 absolute justify-start items-center gap-[5px] inline-flex">
            <div className="text-[#afafaf] text-[15px] font-semibold font-['Urbanist'] capitalize">
              Refunded
            </div>
            <div className="w-2 h-[11px] relative" />
          </div>
          <div className="left-[1042.27px] top-0 absolute text-[#afafaf] text-[15px] font-semibold font-['Urbanist'] capitalize">
            OTC
          </div>
          <div className="left-[1119.45px] top-0 absolute text-[#afafaf] text-[15px] font-semibold font-['Urbanist'] capitalize">
            Receiving EVM wallet
          </div>
        </div>

        <div className="w-full h-[195px] left-0 top-[128.43px] absolute flex-col justify-between items-start gap-[30px] inline-flex">
          <div className="w-full h-[15px] relative">
            <div className="h-[11px] left-[146.58px] top-[2px] absolute justify-start items-center gap-[5px] inline-flex">
              <div className="text-[#18191c] text-[15px] font-semibold font-['Urbanist'] capitalize">
                airotilc#5180
              </div>
            </div>
            <div className="left-[284.12px] top-[2px] absolute text-[#18191c] text-[15px] font-semibold font-['Urbanist'] capitalize">
              0xb709...a521
            </div>
            <div className="left-[480.40px] top-[2px] absolute text-[#18191c] text-[15px] font-semibold font-['Urbanist'] capitalize">
              $500.00
            </div>
            <div className="left-[584.05px] top-[2px] absolute text-[#18191c] text-[15px] font-semibold font-['Urbanist'] capitalize">
              Main Investors
            </div>
            <div className="left-[833.92px] top-[2px] absolute text-[#18191c] text-[15px] font-semibold font-['Urbanist'] capitalize">
              $0.00
            </div>
            <div className="left-[966.79px] top-[2px] absolute text-[#18191c] text-[15px] font-semibold font-['Urbanist'] capitalize">
              $0.00
            </div>
            <div className="left-[1074.32px] top-[2px] absolute text-[#18191c] text-[15px] font-semibold font-['Urbanist'] capitalize">
              $0.00
            </div>
            <div className="left-[1151.50px] top-[2px] absolute text-[#18191c] text-[15px] font-semibold font-['Urbanist'] capitalize">
              0xb709..a521
            </div>
            <div className="h-[11px] left-[32.05px] top-[2px] absolute justify-start items-center gap-[5px] inline-flex">
              <div className="text-[#18191c] text-[15px] font-semibold font-['Urbanist'] capitalize">
                airotilc
              </div>
            </div>
            <div className="w-[15px] h-[15px] left-[423.26px] top-0 absolute rounded-full border-2 border-[#9b9b9b]" />
            <div className="w-3.5 h-3.5 left-0 top-[0.50px] absolute rounded border-2 border-[#9b9b9b]/50" />
          </div>
        </div> */}

          {/* <Table /> */}
          <div className="w-full h-[0px] left-[0.45px] top-[108.46px] absolute border border-[#18191c]/10"></div>
        </div>
      )}

      <FileUploadModal
        isOpen={openModal}
        onClose={handleClose}
        groupName={groupName}
        isGroupNameAdded={isGroupNameAdded}
        handleTextInput={handleTextInput}
        isPending={isPending}
        handleUpload={handleDistribute}
        excelData={excelData}
        setExcelData={setExcelData}
      />
      <ToastContainer autoClose={5000} />
    </div>
  );
}

export default Fundrasing;
