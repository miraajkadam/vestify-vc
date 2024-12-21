import { ProjectData } from "@/hooks/useVCProfile";
import React from "react";

function Descp(profile: ProjectData) {
  return (
    <div className="h-full w-full flex-col justify-start items-start gap-[15px] flex">
      <div className="text-[#18191c] text-[25px] font-bold font-['Urbanist'] leading-7">
        VC Description
      </div>
      <div className="self-stretch text-[#2c2c2c] text-base font-normal font-['Urbanist'] leading-normal">
        {profile?.description}
      </div>
    </div>
  );
}

export default Descp;
