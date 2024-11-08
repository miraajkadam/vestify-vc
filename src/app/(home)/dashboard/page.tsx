// Dashboard.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { getVCProjects } from "@/lib/api";
import ProjectCard from "@/components/projectComponents/ProjectCard";
import { FaArrowLeft, FaPlus, FaSearch } from "react-icons/fa";

interface DecodedToken {
  user: { id: string };
  iat: number;
}

interface Project {
  id: string;
  name: string;
  description: string;
  round: string;
  status: "Success" | "In Progress";
  progress: number;
}

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = Cookies.get("access_token");
        if (!token) throw new Error("No access token found");

        const decodedToken = jwtDecode<DecodedToken>(token);
        const vcId = decodedToken.user.id;

        const response = await getVCProjects(vcId);
        console.log("dashboard", response);

        if (response.success) {
          setProjects(
            response.data.projects.map((project) => ({
              ...project,
              status: Math.random() > 0.5 ? "Success" : "In Progress",
              progress: Math.floor(Math.random() * 100),
            }))
          );
        } else {
          throw new Error(response.message || "Failed to fetch projects");
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleAddProject = () => router.push("/add-project");

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header>
        <div className=" mx-auto pt-[32px] px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects"
                  className="pl-10 pr-4 py-2 border rounded-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button
                onClick={handleAddProject}
                className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 flex items-center transition duration-300"
              >
                <FaPlus className="mr-2" />
                Add New Project
              </button>
            </div>
          </div>
          <div className="mt-[32px] mb-[24px] bg-gray-200 p-2 rounded-full w-[30px]">
            <FaArrowLeft
              className="text-gray-500 cursor-pointer"
              onClick={() => router.back()}
            />
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className=" mx-auto py-2 px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : error ? (
            <div className="text-red-500 mb-4 text-center">{error}</div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                {searchTerm
                  ? "No projects found matching your search."
                  : "No projects found. Create your first project!"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
