"use client";
import React, { useEffect, useState } from "react";
import { getVCProfile, VCProfile } from "@/lib/api";
import Navbar from "@/components/vcprofile/Navbar";
import Profile from "@/components/vcprofile/Profile";
import Descp from "@/components/vcprofile/Descp";
import { GetVCProjectsResponse } from "@/lib/api";
import Projects from "@/components/vcprofile/Projects";
import { useVCProfileData } from "@/hooks/useVCProfile";
import { FomoDeal, Network } from "fomo-deal-sdk-v1";


const VCProfilePage2: React.FC = () => {
  const fomoDeal = new FomoDeal();
  // const [profile, setProfile] = useState<VCProfile | null>(null);
  // const [profile, setProfile] = useState<GetVCProjectsResponse | null>(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  const { data: profileData, isError, error, isLoading } = useVCProfileData();
  console.log("profileData", profileData)

  const getAllProjects = async () => {
    const projects = await fomoDeal.getAllProjects(Network.ETHEREUM);
    console.log("projects", projects);
  };
  getAllProjects()
  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await getVCProfile();
  //       if (response.success) {
  //         console.log(response, "RESPONSE");
  //         setProfile(response.data);
  //       } else {
  //         console.log(response, "ERROR");
  //         setError(response.message ?? "An error occurred");
  //       }
  //     } catch (err) {
  //       setError("Failed to fetch VC profile");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchProfile();
  // }, []);

  if (isLoading) return <LoadingSpinner />;
  if (isError) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return <ErrorMessage message={errorMessage} />;
  }
  if (!profileData?.data) return <NoProfileData />;

  return (
    <div className=" h-[100vh] w-full bg-white justify-start items-start inline-flex overflow-y-scroll ">
      <div className="w-full px-8 pb-8 bg-white flex-col justify-start items-start gap-[25px] inline-flex">
        <div className="w-full flex-col justify-start items-end flex">
          <Navbar profile={profileData?.data} />
          <Profile profile={profileData?.data} />
        </div>
        <Descp profile={profileData?.data} />
        <Projects profile={profileData?.data} />
      </div>
    </div>
  );
};

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
  </div>
);

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex justify-center items-center h-screen text-red-500">
    Error: {message}
  </div>
);

const NoProfileData: React.FC = () => (
  <div className="flex justify-center items-center h-screen">
    No profile data available
  </div>
);

export default VCProfilePage2;
