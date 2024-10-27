"use client";

import React, { useEffect, useState } from "react";
import Dropdown from "../ui/Dropdown";

interface BasicInformationProps {
  onComplete: (data: {
    info: {
      name: string;
      categories: string[];
      description: string;
    };
  }) => void;
  initialData?: {
    name: string;
    categories: string[];
    description: string;
  };
}

const BasicInformation: React.FC<BasicInformationProps> = ({
  onComplete,
  initialData,
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [categories, setCategories] = useState<string[]>(
    initialData?.categories || []
  );

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setCategories(initialData.categories);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      info: {
        name,
        categories,
        description,
      },
    });
  };

  const categoryOptions = ["DeFi", "NFT", "GameFi", "Infrastructure"];

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 mx-auto text-black"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-black">
        Basic Information
      </h2>

      <div>
        <label
          htmlFor="projectName"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Project Name
        </label>
        <input
          id="projectName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Project name"
          className="w-full p-3 border border-gray-300 rounded-md text-sm text-black"
          required
        />
      </div>

      <div>
        <label
          htmlFor="projectDescription"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Project Description
        </label>
        <textarea
          id="projectDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Project Description"
          className="w-full p-3 border border-gray-300 rounded-md text-sm text-black"
          rows={4}
          required
        />
      </div>

      <div>
        <label
          htmlFor="projectCategories"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Project Categories
        </label>
        <Dropdown
          options={categoryOptions}
          value={categories}
          onChange={(selected) => setCategories(selected)}
          placeholder="Select Project categories"
          multiple={true}
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium"
      >
        Proceed
      </button>
    </form>
  );
};

export default BasicInformation;
