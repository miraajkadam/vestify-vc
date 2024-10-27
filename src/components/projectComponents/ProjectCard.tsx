import React, { useState } from "react";
import { FaTwitter } from "react-icons/fa";
import Link from "next/link";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description: string;
    round: string;
    status: "Success" | "In Progress";
    progress: number;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => setIsExpanded(!isExpanded);

  return (
    <div className="w-[308px] h-[312px] p-4 bg-white rounded-3xl shadow-sm flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
            <FaTwitter className="text-white text-xl" />
          </div>
          <h3 className="text-lg font-semibold text-black">{project.name}</h3>
        </div>
        <div
          className={`px-3 py-1 rounded-full ${
            project.status === "Success"
              ? "bg-green-100 text-green-600"
              : "bg-gray-100 text-gray-600"
          } text-xs font-medium`}
        >
          {project.status}
        </div>
      </div>

      <div className="px-2  bg-indigo-100 rounded-lg self-start">
        <span className="text-indigo-600 text-xs font-bold">
          {project.round}
        </span>
      </div>

      <div className="flex-grow">
        <p
          className={`text-sm text-gray-600 ${
            isExpanded ? "" : "line-clamp-3"
          }`}
        >
          {project.description}
        </p>
        {project.description.length > 100 && (
          <button
            onClick={toggleDescription}
            className="text-blue-500 text-sm font-semibold mt-1 hover:underline"
          >
            {isExpanded ? "See Less" : "See More"}
          </button>
        )}
      </div>

      <div className="w-full flex items-center gap-2">
        <div className="flex-grow bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-400 h-2 rounded-full"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
        <span className="text-sm font-medium text-gray-600 ">
          {project.progress}%
        </span>
      </div>

      <Link
        href={`/project/${project.id}`}
        className="w-[103px] bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-indigo-700 transition duration-300 text-center"
      >
        Details →
      </Link>
    </div>
  );
};

export default ProjectCard;
