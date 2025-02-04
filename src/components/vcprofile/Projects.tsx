import React from "react";
import { useRouter } from "next/navigation";
import { ProjectData } from "@/hooks/useVCProfile";
import EmptyState from "../ui/EmptyState";
import { ProjectedCreated } from "@/hooks/useVCProjects";
import { useTopGainers } from "@/hooks/useTopGainers";

function Projects({ projects }: { projects?: ProjectedCreated }) {
  console.log(projects, "PROJECTS");
  const { data: topGainers } = useTopGainers();
  console.log(topGainers, "TOP GAINERS");
  // const { projectName, projectId, hardCap } = projects?.projectCreated;

  const router = useRouter();
  return (
    // <div className="w-full self-stretch h-[409.50px] flex-col justify-start items-start gap-[30px] flex">
    //   <div className="text-[#18191c] text-[25px] font-bold font-['Urbanist'] leading-7">
    //     Last 5 projects
    //   </div>

    //   <div className="w-full self-stretch h-[351.50px] flex-col justify-between items-start gap-5 flex">
    //     <div className="w-full h-[31.50px] relative">
    //       <div className="w-full ">
    //         <div className="w-full h-auto relative grid grid-cols-8 items-center text-[#afafaf] text-[15px] font-semibold gap-[10px]">
    //           <div className="col-span-2"> Project Name</div>
    //           <div> Pledge Amount</div>
    //           <div> Market Cap</div>
    //           <div> Top Gainers</div>
    //           <div> Raised Amount</div>
    //           <div> Ongoing Claim</div>
    //           <div></div>

    //           <React.Fragment>
    //             <div className="h-[55.36px] col-span-2 flex justify-start items-center">
    //               <div className="w-[55.36px] h-[55.36px] bg-[#d9d9d9]" />
    //               <div className=" ml-4 text-[#303138] text-lg font-bold font-['Urbanist'] leading-[32.85px]">
    //                 {projects?.projectCreated?.projectName}
    //               </div>
    //             </div>
    //             <div className=" text-[#505050] text-lg font-bold font-['Urbanist'] leading-[32.85px]">
    //               {projects?.projectCreated?.hardCap}
    //             </div>
    //             <div className="">
    //               <div className="text-[#303138] text-lg font-extrabold font-['Urbanist'] leading-[32.85px]">
    //                 'N.A'
    //               </div>
    //             </div>
    //             <div className=" text-[#505050] text-lg font-bold font-['Urbanist'] leading-[32.85px]">
    //               'N.A'
    //             </div>
    //             <div className="">
    //               <span className="text-[#00b828] text-lg font-bold font-['Urbanist'] leading-[32.85px]">
    //                 {/* {item.raisedAmount} */}
    //                 'N.A'
    //               </span>
    //             </div>
    //             <div className="">
    //               <span className="text-[#ff0004] text-lg font-bold font-['Urbanist'] leading-[32.85px]">
    //                 {/* {item.ongoingClaim} */}
    //                 'N.A'
    //               </span>
    //             </div>
    //             <div className="">
    //               <div className="w-24 h-[35px] p-2.5 bg-[#443cc4] rounded-[28px] justify-center items-center gap-2.5 inline-flex">
    //                 <button
    //                   className="text-white text-sm font-semibold font-['Urbanist'] capitalize tracking-tight"
    //                   onClick={() => {
    //                     router.push(
    //                       `/projectDeals/${projects?.projectCreated?.projectId}`
    //                     );
    //                   }}
    //                 >
    //                   Details
    //                 </button>
    //               </div>
    //             </div>
    //           </React.Fragment>

    //           {/* <br className="h-[1px] bg-gray w-full "></br> */}

    //           {/* {Object.keys(projects?.projectCreated || {}).map(
    //             (item: any, index: number) => (
    //               <React.Fragment key={index}>
    //                 <div className="h-[55.36px] col-span-2 flex justify-start items-center">
    //                   <div className="w-[55.36px] h-[55.36px] bg-[#d9d9d9]" />
    //                   <div className=" ml-4 text-[#303138] text-lg font-bold font-['Urbanist'] leading-[32.85px]">
    //                     {item?.projectName}Project
    //                   </div>
    //                 </div>
    //                 <div className=" text-[#505050] text-lg font-bold font-['Urbanist'] leading-[32.85px]">
    //                   {item?.hardCap}
    //                 </div>
    //                 <div className="">
    //                   <div className="text-[#303138] text-lg font-extrabold font-['Urbanist'] leading-[32.85px]">
    //                     {item?.marketCap}
    //                   </div>
    //                 </div>
    //                 <div className=" text-[#505050] text-lg font-bold font-['Urbanist'] leading-[32.85px]">
    //                   {item?.topGainers}
    //                 </div>
    //                 <div className="">
    //                   <span className="text-[#00b828] text-lg font-bold font-['Urbanist'] leading-[32.85px]">
    //                     {item.raisedAmount}
    //                   </span>
    //                 </div>
    //                 <div className="">
    //                   <span className="text-[#ff0004] text-lg font-bold font-['Urbanist'] leading-[32.85px]">
    //                     {item.ongoingClaim}
    //                   </span>
    //                 </div>
    //                 <div className="">
    //                   <div className="w-24 h-[35px] p-2.5 bg-[#443cc4] rounded-[28px] justify-center items-center gap-2.5 inline-flex">
    //                     <button
    //                       className="text-white text-sm font-semibold font-['Urbanist'] capitalize tracking-tight"
    //                       onClick={() => {
    //                         router.push("/deal");
    //                       }}
    //                     >
    //                       Details
    //                     </button>
    //                   </div>
    //                 </div>
    //               </React.Fragment>
    //             )
    //           )} */}

    //           {/* {profile?.project?.map((item: any, index: number) => (

    //           ))} */}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <React.Fragment>
      <div className="h-[55.36px] col-span-2 flex justify-start items-center">
        <div className="w-[55.36px] h-[55.36px] bg-[#d9d9d9]" />
        <div className=" ml-4 text-[#303138] text-lg font-bold font-['Urbanist'] leading-[32.85px]">
          {projects?.projectName}
        </div>
      </div>
      <div className=" text-[#505050] text-lg font-bold font-['Urbanist'] leading-[32.85px]">
        {projects?.hardCap}
      </div>
      <div className="">
        <div className="text-[#303138] text-lg font-extrabold font-['Urbanist'] leading-[32.85px]">
          'N.A'
        </div>
      </div>
      <div className=" text-[#505050] text-lg font-bold font-['Urbanist'] leading-[32.85px]">
        'N.A'
      </div>
      <div className="">
        <span className="text-[#00b828] text-lg font-bold font-['Urbanist'] leading-[32.85px]">
          {/* {item.raisedAmount} */}
          'N.A'
        </span>
      </div>
      <div className="">
        <span className="text-[#ff0004] text-lg font-bold font-['Urbanist'] leading-[32.85px]">
          {/* {item.ongoingClaim} */}
          'N.A'
        </span>
      </div>
      <div className="">
        <div className="w-24 h-[35px] p-2.5 bg-[#443cc4] rounded-[28px] justify-center items-center gap-2.5 inline-flex">
          <button
            className="text-white text-sm font-semibold font-['Urbanist'] capitalize tracking-tight"
            onClick={() => {
              router.push(`/projectDeals/${projects?.projectId}`);
            }}
          >
            Details
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Projects;
