"use client";
import React from "react";
import { getProjectDetails } from "@/lib/api";
import About from "@/components/projectid/About";
import Team from "@/components/projectid/Team";
import Partner from "@/components/projectid/Partner";
import Deal from "@/components/projectid/Deal";
import Profile from "@/components/projectid/Profile";
import Token from "@/components/projectid/Token";

const ProjectDetailsPage = async ({ params }: { params: { id: string } }) => {
  const projectDetails = await getProjectDetails(params.id);

  if (!projectDetails.success) {
    return <div>Error loading project details</div>;
  }

  const {
    project,
    tokenMetrics,
    projectSocials,
    teamAndAdvisors,
    partnersAndInvestors,
  } = projectDetails.data;

  // console.log(projectDetails);

  return (
    <div className="h-[100vh] w-full bg-white items-start inline-flex overflow-y-scroll">
      <div className="pt-[35px] w-full pb-8 bg-white flex-col justify-start items-end inline-flex">
        <div className="px-8 w-full flex-col justify-start items-start flex">
          <div className="flex-col w-full justify-start items-start gap-[30px] flex">
            <div className="w-full justify-end items-center gap-[103px] inline-flex">
              <div className="w-full flex-col justify-start items-start gap-6 inline-flex">
                {/** Header */}
                <div className="w-full flex-col justify-start items-start gap-[15px] flex">
                  <div className="p-1.5 bg-[#f3f3f3] rounded-[50px] justify-center items-center gap-2.5 inline-flex">
                    <div className="text-black text-[15px] font-semibold font-['Urbanist'] leading-snug">
                      Distributing
                    </div>
                  </div>

                  <div className="text-black text-3xl font-bold font-['Urbanist'] leading-[43.50px]">
                    {project.name}
                  </div>
                </div>

                {/** Profile */}
                <Profile tokenMetrics={tokenMetrics} project={project} />
              </div>

              <div className="h-full w-full flex-col justify-end items-end gap-[25px] inline-flex">
                <div className="w-[84.84px] h-[84.84px] bg-[#d9d9d9] rounded-[60px]" />
                <div className="flex-col justify-start items-end gap-[15px] flex">
                  <div className="text-black text-[22px] font-extrabold font-['Urbanist'] leading-loose">
                    $0.00
                  </div>
                  <div className="text-[#6c6c6c] text-[15px] font-semibold font-['Urbanist'] leading-snug">
                    Your allocation
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex-col justify-start items-start gap-[30px] flex">
              <div className="w-full justify-start items-start gap-[53px] inline-flex">
                <div className="w-full flex-col justify-start items-start gap-[25px] inline-flex">
                  {/** About */}
                  <About project={project} />
                  {/** Team */}
                  <Team teamAndAdvisors={teamAndAdvisors} />
                  {/** Partners and Investors */}
                  <Partner partnersAndInvestors={partnersAndInvestors} />
                  <Token tokenMetrics={tokenMetrics} project={project} />
                </div>

                {/** Deal Info */}
                <Deal
                  socialLink={projectSocials}
                  project={project}
                  tokenMetrics={tokenMetrics}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
