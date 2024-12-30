"use client";
import React, { useState, useEffect } from "react";
import Dropdown from "../ui/Dropdown";

interface tokenMetric {
  round: string;
  fdv: string;
  price: string;
  tgeUnlock: number;
  tge: string;
  tgeSummary: string;
  lockupPeriod: string;
  noOfMonths: number;
  releaseType: string;
}

interface TokenMetricsProps {
  onComplete: (data: { tokenMetrics: tokenMetric[] }) => void;
  initialData?: tokenMetric[];
}

const TokenMetrics: React.FC<TokenMetricsProps> = ({
  onComplete,
  initialData = [],
}) => {
  const [rounds, setRounds] = useState<tokenMetric[]>([]);

  useEffect(() => {
    setRounds(
      initialData.length > 0
        ? initialData
        : [
            {
              round: "",
              fdv: "",
              price: "",
              tgeUnlock: 0,
              tge: "",
              tgeSummary: "",
              lockupPeriod: "",
              noOfMonths: 0,
              releaseType: "",
            },
          ]
    );
  }, [initialData]);

  const handleInputChange = (
    index: number,
    field: keyof tokenMetric,
    value: string | number
  ) => {
    const updatedRounds = rounds.map((round, i) =>
      i === index ? { ...round, [field]: value } : round
    );
    setRounds(updatedRounds);
  };

  const addAnotherRound = () => {
    setRounds([
      ...rounds,
      {
        round: "",
        fdv: "",
        price: "",
        tgeUnlock: 0,
        tge: "",
        tgeSummary: "",
        lockupPeriod: "",
        noOfMonths: 0,
        releaseType: "",
      },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredRounds = rounds
      .filter((round) => Object.values(round).every((value) => value !== ""))
      .map((round) => ({
        ...round,
        tge: new Date(round.tge).toISOString(), // Ensure ISO-8601 formatting
      }));

    onComplete({
      tokenMetrics: filteredRounds,
    });
  };

  const roundOptions = [
    "PRE_SEED",
    "SEED",
    "PRIVATE_1",
    "PRIVATE_2",
    "PRIVATE_3",
    "PUBLIC",
  ];

  const releaseTypes = ["Linear", "Quarterly"];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-black">
      <h2 className="text-2xl font-bold mb-6 text-black text-center">
        Token Metrics
      </h2>

      {rounds.map((round, index) => (
        <div key={index} className="space-y-4 pb-6 border-b">
          <div>
            <label
              htmlFor={`round-${index}`}
              className="block mb-2 font-medium text-black"
            >
              Project Round
            </label>

            <Dropdown
              options={roundOptions}
              value={round.round}
              onChange={(value) => {
                if (typeof value === "string" || typeof value === "number") {
                  handleInputChange(index, "round", value);
                } else {
                  console.error("Invalid value type:", value);
                }
              }}
              placeholder="Select Round"
            />
          </div>
          <div>
            <label
              htmlFor={`fdv-${index}`}
              className="block mb-2 font-medium text-black"
            >
              FDV
            </label>
            <input
              id={`fdv-${index}`}
              type="text"
              value={round.fdv}
              onChange={(e) => handleInputChange(index, "fdv", e.target.value)}
              placeholder="Enter FDV"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor={`price-${index}`}
              className="block mb-2 font-medium text-black"
            >
              Price
            </label>
            <input
              id={`price-${index}`}
              type="text"
              value={round.price}
              onChange={(e) =>
                handleInputChange(index, "price", e.target.value)
              }
              placeholder="Enter price"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor={`tgeUnlock-${index}`}
              className="block mb-2 font-medium text-black"
            >
              TGE Unlock
            </label>
            <input
              id={`tgeUnlock-${index}`}
              type="number"
              value={round.tgeUnlock}
              onChange={(e) =>
                handleInputChange(index, "tgeUnlock", Number(e.target.value))
              }
              placeholder="Enter TGE unlock"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor={`tge-${index}`}
              className="block mb-2 font-medium text-black"
            >
              TGE
            </label>
            <input
              id={`tge-${index}`}
              type="date"
              value={round.tge}
              onChange={(e) => handleInputChange(index, "tge", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor={`noOfMonths-${index}`}
              className="block mb-2 font-medium text-black"
            >
              No of Months
            </label>
            <input
              id={`noOfMonths-${index}`}
              type="text"
              value={round.noOfMonths}
              onChange={(e) =>
                handleInputChange(index, "noOfMonths", e.target.value)
              }
              placeholder="No Of Months"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor={`price-${index}`}
              className="block mb-2 font-medium text-black"
            >
              Lockup Period
            </label>
            <input
              id={`lockupPeriod-${index}`}
              type="text"
              value={round.lockupPeriod}
              onChange={(e) =>
                handleInputChange(index, "lockupPeriod", e.target.value)
              }
              placeholder="Enter price"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label
              htmlFor={`releaseType-${index}`}
              className="block mb-2 font-medium text-black"
            >
              Release Type
            </label>

            <Dropdown
              options={releaseTypes}
              value={round.releaseType}
              onChange={(value) => {
                if (typeof value === "string" || typeof value === "number") {
                  handleInputChange(index, "releaseType", value);
                } else {
                  console.error("Invalid value type:", value);
                }
              }}
              placeholder="Select Release Type"
            />
          </div>

          <div>
            <label
              htmlFor={`tgeSummary-${index}`}
              className="block mb-2 font-medium text-black"
            >
              TGE Summary
            </label>
            <input
              id={`tgeSummary-${index}`}
              type="text"
              value={round.tgeSummary}
              onChange={(e) =>
                handleInputChange(index, "tgeSummary", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-md text-black"
              required
            />
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={addAnotherRound}
          className="w-[166px] p-3 bg-white text-[#4F46E5] rounded-md border border-[#4F46E5] mb-4 font-urbanist font-semibold text-[12px]"
        >
          Add Another Round
        </button>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Proceed
      </button>
    </form>
  );
};

export default TokenMetrics;

// "use client";
// import React, { useState, useEffect } from "react";
// import Dropdown from "../ui/Dropdown";

// interface TokenMetric {
//   round: string;
//   fdv: string;
//   price: string;
//   tgeUnlock: number;
//   tge: string;
//   tgeSummary: string;
// }

// interface TokenMetricsProps {
//   onComplete: (data: { tokenMetrics: TokenMetric[] }) => void;
//   initialData?: TokenMetric[];
// }

// const TokenMetrics: React.FC<TokenMetricsProps> = ({
//   onComplete,
//   initialData = [],
// }) => {
//   const [rounds, setRounds] = useState<TokenMetric[]>([]);
//   const [currentRound, setCurrentRound] = useState<TokenMetric>({
//     round: "",
//     fdv: "",
//     price: "",
//     tgeUnlock: 0,
//     tge: "",
//     tgeSummary: "",
//   });

//   useEffect(() => {
//     setRounds(initialData.length > 0 ? initialData : []);
//   }, [initialData]);

//   const handleInputChange = (
//     field: keyof TokenMetric,
//     value: string | number
//   ) => {
//     setCurrentRound((prevRound) => ({
//       ...prevRound,
//       [field]: value,
//     }));
//   };

//   const addAnotherRound = () => {
//     // Add the current round to the rounds array and reset currentRound
//     setRounds([...rounds, currentRound]);
//     setCurrentRound({
//       round: "",
//       fdv: "",
//       price: "",
//       tgeUnlock: 0,
//       tge: "",
//       tgeSummary: "",
//     });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Include the last entered round before submission
//     const allRounds = [...rounds, currentRound].filter((round) =>
//       Object.values(round).every((value) => value !== "")
//     );

//     onComplete({
//       tokenMetrics: allRounds.map((round) => ({
//         ...round,
//         tge: new Date(round.tge).toISOString(),
//       })),
//     });
//   };

//   const roundOptions = [
//     "PRE_SEED",
//     "SEED",
//     "PRIVATE_1",
//     "PRIVATE_2",
//     "PRIVATE_3",
//     "PUBLIC",
//   ];

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6 text-black">
//       <h2 className="text-2xl font-bold mb-6 text-black text-center">
//         Token Metrics
//       </h2>

//       <div className="space-y-4 pb-6 border-b">
//         <div>
//           <label htmlFor="round" className="block mb-2 font-medium text-black">
//             Project Round
//           </label>
//           <Dropdown
//             options={roundOptions}
//             value={currentRound.round}
//             onChange={(value) => handleInputChange("round", value)}
//             placeholder="Select Round"
//           />
//         </div>
//         <div>
//           <label htmlFor="fdv" className="block mb-2 font-medium text-black">
//             FDV
//           </label>
//           <input
//             id="fdv"
//             type="text"
//             value={currentRound.fdv}
//             onChange={(e) => handleInputChange("fdv", e.target.value)}
//             placeholder="Enter FDV"
//             className="w-full p-3 border border-gray-300 rounded-md"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="price" className="block mb-2 font-medium text-black">
//             Price
//           </label>
//           <input
//             id="price"
//             type="text"
//             value={currentRound.price}
//             onChange={(e) => handleInputChange("price", e.target.value)}
//             placeholder="Enter price"
//             className="w-full p-3 border border-gray-300 rounded-md"
//             required
//           />
//         </div>
//         <div>
//           <label
//             htmlFor="tgeUnlock"
//             className="block mb-2 font-medium text-black"
//           >
//             TGE Unlock
//           </label>
//           <input
//             id="tgeUnlock"
//             type="number"
//             value={currentRound.tgeUnlock}
//             onChange={(e) =>
//               handleInputChange("tgeUnlock", Number(e.target.value))
//             }
//             placeholder="Enter TGE unlock"
//             className="w-full p-3 border border-gray-300 rounded-md"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="tge" className="block mb-2 font-medium text-black">
//             TGE
//           </label>
//           <input
//             id="tge"
//             type="date"
//             value={currentRound.tge}
//             onChange={(e) => handleInputChange("tge", e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-md text-black"
//             required
//           />
//         </div>
//         <div>
//           <label
//             htmlFor="tgeSummary"
//             className="block mb-2 font-medium text-black"
//           >
//             TGE Summary
//           </label>
//           <input
//             id="tgeSummary"
//             type="text"
//             value={currentRound.tgeSummary}
//             onChange={(e) => handleInputChange("tgeSummary", e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-md text-black"
//             required
//           />
//         </div>
//       </div>

//       <div className="flex justify-end">
//         <button
//           type="button"
//           onClick={addAnotherRound}
//           className="w-[166px] p-3 bg-white text-[#4F46E5] rounded-md border border-[#4F46E5] mb-4 font-urbanist font-semibold text-[12px]"
//         >
//           Add Another Round
//         </button>
//       </div>

//       <button
//         type="submit"
//         className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//       >
//         Proceed
//       </button>
//     </form>
//   );
// };

// export default TokenMetrics;
