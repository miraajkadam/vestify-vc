import React, { useState } from "react";

interface SocialLinksData {
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  discord?: string;
  telegram?: string;
  medium?: string;
  youtube?: string;
}

const SocialLinksForm: React.FC<{
  onSubmit: (data: SocialLinksData) => void;
}> = ({ onSubmit }) => {
  const [socialLinks, setSocialLinks] = useState({
    twitter: "",
    instagram: "",
    discord: "",
    telegram: "",
    medium: "",
    youtube: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialLinks((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(socialLinks);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Socials</h2>
      {Object.entries(socialLinks).map(([platform, link]) => (
        <div key={platform}>
          <label
            htmlFor={platform}
            className="block text-sm font-medium text-gray-700 capitalize"
          >
            {platform}
          </label>
          <input
            type="text"
            id={platform}
            name={platform}
            value={link}
            onChange={handleChange}
            placeholder={`Enter ${platform} link here`}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      ))}
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        Submit
      </button>
    </form>
  );
};

export default SocialLinksForm;
