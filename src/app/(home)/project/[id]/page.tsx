"use client";
import React, { useEffect } from "react";
import { getProjectDetails } from "@/lib/api";
import About from "@/components/projectid/About";
import Team from "@/components/projectid/Team";
import Partner from "@/components/projectid/Partner";
import Deal from "@/components/projectid/Deal";
import Profile from "@/components/projectid/Profile";
import Token from "@/components/projectid/Token";
import { useProjectDetails } from "@/hooks/useVCProjectDetails";

const ProjectDetailsPage = ({ params }: { params: { id: string } }) => {
  // console.log(params.id, "params");
  // const projectDetails = await getProjectDetails(params.id);

  // if (!projectDetails.success) {
  //   return <div>Error loading project details</div>;
  // }

  // const {
  //   project,
  //   tokenMetrics,
  //   projectSocials,
  //   teamAndAdvisors,
  //   partnersAndInvestors,
  // } = projectDetails.data;

  // console.log(projectDetails);

  const { data, isPending, isError } = useProjectDetails(params.id);

  // const {} = data?.data?.project;

  // console.log(data?.data., "PROJECT DATA");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getProjectDetails(params.id);
  //     console.log("PROJECTDATA", data);
  //   };
  //   fetchData();
  // }, [params.id]);

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
                    {data?.data?.project.name}
                  </div>
                </div>

                {/** Profile */}
                <Profile
                  tokenMetrics={data?.data?.tokenMetrics}
                  project={data?.data?.project}
                />
              </div>

              <div className="h-full w-full flex-col justify-end items-end gap-[25px] inline-flex">
                <div className="w-[84.84px] h-[84.84px] bg-[#d9d9d9] rounded-[60px] border-2 border-blue-400 overflow-hidden ">
                  <img
                    src="/vestify_logo.png"
                    className="w-full h-full object-cover"
                  />
                </div>
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
                  <About project={data?.data?.project} />
                  {/** Team */}
                  <Team teamAndAdvisors={data?.data?.teamAndAdvisors} />
                  {/** Partners and Investors */}
                  <Partner
                    partnersAndInvestors={data?.data?.partnersAndInvestors}
                  />
                  <Token
                    tokenMetrics={data?.data?.tokenMetrics}
                    project={data?.data?.project}
                  />
                </div>

                {/** Deal Info */}
                <Deal
                  socialLink={data?.data?.projectSocials}
                  project={data?.data?.project}
                  tokenMetrics={data?.data?.tokenMetrics}
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
