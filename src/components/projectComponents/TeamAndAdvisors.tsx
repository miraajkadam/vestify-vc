"use client";
import React, { useState, useEffect } from "react";

interface TeamMember {
  name: string;
  title: string;
  description: string;
  imgBase64?: string;
}

interface TeamAndAdvisorsProps {
  onComplete: (data: { teamAndAdvisors: TeamMember[] }) => void;
  initialData?: TeamMember[]; // Accept initial data for editing
}

const TeamAndAdvisors: React.FC<TeamAndAdvisorsProps> = ({
  onComplete,
  initialData,
}) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setTeamMembers(initialData);
    } else {
      setTeamMembers([{ name: "", title: "", description: "", imgBase64: "" }]); // Start with one empty form
    }
  }, [initialData]);

  const handleInputChange = (
    index: number,
    field: keyof TeamMember,
    value: string
  ) => {
    const updatedMembers = teamMembers.map((member, i) => {
      if (i === index) {
        return { ...member, [field]: value };
      }
      return member;
    });
    setTeamMembers(updatedMembers);
  };

  const handleLogoChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedMembers = teamMembers.map((member, i) => {
          if (i === index) {
            return { ...member, imgBase64: reader.result as string };
          }
          return member;
        });
        setTeamMembers(updatedMembers);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTeamMember = () => {
    setTeamMembers([
      ...teamMembers,
      { name: "", title: "", description: "", imgBase64: "" },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      teamAndAdvisors: teamMembers.filter(
        (member) => member.name && member.title && member.description
      ),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-black">
      <h2 className="text-2xl font-bold mb-6 text-black">Team & Advisors</h2>

      {teamMembers.map((member, index) => (
        <div key={index} className="space-y-4 pb-6 border-b">
          <div>
            <label
              htmlFor={`name-${index}`}
              className="block mb-2 font-medium text-black"
            >
              Name
            </label>
            <input
              id={`name-${index}`}
              type="text"
              value={member.name}
              onChange={(e) => handleInputChange(index, "name", e.target.value)}
              placeholder="Enter name"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label
              htmlFor={`title-${index}`}
              className="block mb-2 font-medium text-black"
            >
              Title
            </label>
            <input
              id={`title-${index}`}
              type="text"
              value={member.title}
              onChange={(e) =>
                handleInputChange(index, "title", e.target.value)
              }
              placeholder="Enter title"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label
              htmlFor={`description-${index}`}
              className="block mb-2 font-medium text-black"
            >
              Brief Description
            </label>
            <textarea
              id={`description-${index}`}
              value={member.description}
              onChange={(e) =>
                handleInputChange(index, "description", e.target.value)
              }
              placeholder="Enter brief description"
              className="w-full p-3 border border-gray-300 rounded-md"
              rows={3}
              required
            />
          </div>

          <div>
            <label
              htmlFor={`logoUpload-${index}`}
              className="block mb-2 font-medium text-black"
            >
              Partner Logo
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleLogoChange(index, e)}
                className="hidden"
                id={`logoUpload-${index}`}
              />
              <label
                htmlFor={`logoUpload-${index}`}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
              >
                <svg
                  className="mr-2 h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                Upload
              </label>
              <span className="text-xs text-gray-500">
                SVG, PNG, JPG • Max. 5MB
              </span>
            </div>
            {member.imgBase64 && (
              <p className="mt-1 text-sm text-gray-600">Logo uploaded</p>
            )}
          </div>
        </div>
      ))}

      {/* <button
        type="button"
        onClick={addTeamMember}
        className="text-indigo-600 underline"
      >
        Add another team member
      </button> */}
      <div className="flex justify-end">
        <button
          type="button" // Change to button type
          onClick={addTeamMember}
          className="w-[166px] p-2 bg-white text-[#4F46E5] rounded-md border border-[#4F46E5] mb-4 font-urbanist font-semibold text-[12px]"
        >
          Add another team member
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

export default TeamAndAdvisors;
