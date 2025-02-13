import React from "react";
import { useRouter } from "next/navigation";
import { ProjectData } from "@/hooks/useVCProfile";
import EmptyState from "../ui/EmptyState";
import { ProjectedCreated, SDKProjects } from "@/hooks/useVCProjects";
import { useTopGainers } from "@/hooks/useTopGainers";

function Projects({ projects }: { projects?: SDKProjects }) {
  const router = useRouter();
  return (
    <React.Fragment>
      <div className="h-[55.36px] col-span-2 flex justify-start items-center">
        <div className="w-[55.36px] h-[55.36px] bg-[#d9d9d9] border-2 border-blue-400 ">
          <img className="w-full h-full object-cover" src="/vestify_logo.png" />
        </div>
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
