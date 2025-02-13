import React, { useEffect, useState } from "react";
import { VestingInput } from "./VestingInput";
import { useAddSchedulingBatch } from "@/hooks/useAddSchedulingBatch";
import { Pencil } from "lucide-react";

import { FomoDeal, Network } from "fomo-deal-sdk-v1";
import { useEditSchedulingBatch } from "@/hooks/useEditVestingSchedule";
import { toast } from "react-toastify";

type BatchList = {
  batch: string;
  date: string;
  percentage: number;
};

function Editing({ handleEdit, projectId, refetch, scheduleData }: any) {
  // const fomodeal = new FomoDeal();

  // fomodeal.getInvestorsByProjectID(Network.ETHEREUM,projectId )
  // fomodeal.distributeTokens(Network.ETHEREUM,{ethereum:})

  const [batchfields, setBatchFields] = useState<BatchList>({
    batch: "",
    date: "",
    percentage: 0,
  });

  const [batchList, setbatchList] = useState<BatchList[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const { mutateAsync, isPending: isAdding } = useAddSchedulingBatch();
  const { mutateAsync: editSchedule, isPending: isUpdating } =
    useEditSchedulingBatch();

  const handleAddFields = () => {
    const { batch, date, percentage } = batchfields;

    if (!batch || !date || !percentage) {
      alert("Please fill all the details ");
    } else {
      setbatchList([...batchList, batchfields]);
      setBatchFields({
        batch: "",
        date: "",
        percentage: 0,
      });
    }
  };

  useEffect(() => {
    if (scheduleData) {
      const addedBatchList = scheduleData.map((item: any) => {
        return {
          batch: item.name,
          date: item.date.split("T")[0],
          percentage: item.percentage,
        };
      });
      setbatchList(addedBatchList);
    }
  }, [scheduleData]);

  const handleBatchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setBatchFields((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  // useEffect(() => {
  //   if (scheduleData) {
  //     const formattedBatchList = scheduleData.map((item) => ({
  //       batch: item.name,
  //       date: new Date(item.date).toISOString(),
  //       percentage: item.percentage,
  //     }));

  //     setbatchList(formattedBatchList);
  //   }
  // }, [scheduleData]);

  const handleSaveVesting = async () => {
    const percentage = batchList.reduce((acc, curr) => {
      return acc + Number(curr.percentage); // Ensure percentage is a number
    }, 0);

    if (percentage > 100) {
      alert("Sum of batch Percentage should not be greater than 100");
    } else if (percentage < 100) {
      alert("Sum of batch Percentage should not be less than 100");
    } else {
      const formattedBatchList = batchList.map(
        ({ batch, date, percentage }) => ({
          name: batch,
          date: new Date(date).toISOString(),
          percentage: Number(percentage), // Ensuring it's a number
        })
      );

      const payload = {
        batchInterval: "MONTHLY",
        vestingBatches: formattedBatchList,
      };

      try {
        await mutateAsync({ projectId, payload });
        toast.success("Schedule Added Successfully");
        refetch();
        handleEdit();
      } catch (err) {
        toast.error("Something went wrong");

        handleEdit();
      }
    }
  };

  const handleEnableEditField = () => {
    const currentEditableBatch = batchfields;

    const { batch, date, percentage } = batchfields;

    if (!batch || !date || !percentage) {
      alert("Please fill all the details ");
    } else {
      const updatedBatchList = batchList.map((item, ind) => {
        if (ind === editId) {
          return {
            batch: currentEditableBatch.batch,
            date: currentEditableBatch.date,
            percentage: currentEditableBatch.percentage,
          };
        }
        return item;
      });

      setbatchList(updatedBatchList);
      setEditId(null);
      setBatchFields({
        batch: "",
        date: "",
        percentage: 0,
      });
    }
  };

  const handleUpdateBatch = async () => {
    const percentage = batchList.reduce((acc, curr) => {
      return acc + Number(curr.percentage); // Ensure percentage is a number
    }, 0);

    if (percentage > 100) {
      alert("Sum of batch Percentage should not be greater than 100");
    } else if (percentage < 100) {
      alert("Sum of batch Percentage should not be less than 100");
    } else {
      const formattedBatchList = batchList.map(
        ({ batch, date, percentage }) => ({
          name: batch,
          date: new Date(date).toISOString(),
          percentage: Number(percentage), // Ensuring it's a number
        })
      );

      const payload = {
        batchInterval: "MONTHLY",
        vestingBatches: formattedBatchList,
      };

      try {
        await editSchedule({ projectId, payload });

        toast.success("Schedule Updated Successfully");
        handleEdit();
        refetch();
      } catch (err: any) {
        toast.error(err.message);
        handleEdit();
      }
    }
  };

  const handleEditVesting = (id: number) => {
    setEditId(id);
    const findBatch = batchList.find((item, index) => index === id);

    setBatchFields({
      batch: findBatch?.batch || "",
      date: findBatch?.date.split("T")[0] || "",
      percentage: findBatch?.percentage || 0,
    });
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto"
      onClick={handleEdit}
    >
      <div
        className="w-[823px] h-[600px] overflow-auto relative bg-white rounded-[10px] m-[10px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className=" left-[36.50px] top-[36.74px] absolute flex-col justify-start items-start gap-8 inline-flex">
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

          {/* <div className="w-[750px] h-[73.08px] relative">
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
          </div> */}

          <div className="space-y-4  ">
            <div className="grid grid-cols-4 gap-2 font-medium text-sm text-gray-600">
              <div className="text-[#18191c] text-base font-bold font-['Urbanist']">
                Batch
              </div>
              <div className="text-[#18191c] text-base font-bold font-['Urbanist']">
                Batch date
              </div>
              <div className="text-[#18191c] text-base font-bold font-['Urbanist']">
                Batch percentage
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <VestingInput
                value={batchfields.batch}
                name="batch"
                onChange={(e) => handleBatchChange(e)}
                className="bg-gray-100"
              />
              <VestingInput
                type="date"
                name="date"
                onChange={(e) => handleBatchChange(e)}
                className="bg-gray-100"
                value={batchfields.date}
                // readOnly={index < 4}
              />
              <VestingInput
                type="number"
                name="percentage"
                onChange={(e) => handleBatchChange(e)}
                className="bg-gray-100"
                value={batchfields.percentage}
              />
              <div className=" mr-2  bg-indigo-600 rounded-[5px] justify-center items-center  flex">
                <button
                  className="text-white text-lg font-semibold font-['Urbanist'] leading-loose"
                  onClick={
                    editId !== null ? handleEnableEditField : handleAddFields
                  }
                >
                  {editId !== null ? "Update Batch" : "Add Batch"}
                </button>
              </div>
            </div>
          </div>
          {batchList.length > 0 ? (
            <div className="relative w-full overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Batch
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Percentage
                    </th>
                    <th scope="col" className="px-6 py-3">
                      action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {batchList.map((item, ind) => (
                    <tr
                      key={ind}
                      className="bg-white border-b  border-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {item.batch}
                      </th>
                      <td className="px-6 py-4">{item.date}</td>
                      <td className="px-6 py-4">{item.percentage}</td>
                      <td
                        className="px-6 py-4 cursor-pointer"
                        onClick={() => handleEditVesting(ind)}
                      >
                        <Pencil />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h1 className="text-black item-center">
              There are no batches to display
            </h1>
          )}

          <div className="w-full  relative">
            <div className="h-[18px] left-0 top-[12.50px] absolute justify-start items-center gap-2.5 inline-flex">
              <div className="w-[19.03px] h-[17.29px] relative" />
              {/* <div className="text-[#757575] text-[15px] font-semibold font-['Urbanist']">
                Distributed and confirmed batches cannot be edited.
              </div> */}
            </div>
            {batchList.length > 0 && (
              <div className="h-[43px] p-[15px] left-[541px] top-0 absolute bg-indigo-600 rounded-[5px] justify-center items-center gap-2.5 inline-flex">
                <button
                  onClick={scheduleData ? handleUpdateBatch : handleUpdateBatch}
                  className="text-white text-lg font-semibold font-['Urbanist'] leading-loose"
                >
                  {isAdding ? (
                    "Adding..."
                  ) : isUpdating ? (
                    "Updating..."
                  ) : (
                    <>
                      {scheduleData
                        ? "Update vesting schedule"
                        : "Save vesting schedule"}
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editing;
