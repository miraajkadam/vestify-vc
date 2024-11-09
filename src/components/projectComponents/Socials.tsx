"use client";
import React, { useState } from "react";
import {
  FaXTwitter,
  FaInstagram,
  FaDiscord,
  FaTelegram,
  FaMedium,
  FaYoutube,
} from "react-icons/fa6";

interface SocialsProps {
  onComplete: (data: { projectSocials: Record<string, string> }) => void;
}

const Socials: React.FC<SocialsProps> = ({ onComplete }) => {
  const [socials, setSocials] = useState<Record<string, string>>({});

  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const handleChange =
    (platform: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSocials((prev) => ({ ...prev, [platform]: value }));

      // Reset error when the input changes
      setErrors((prev) => ({ ...prev, [platform]: null }));
    };

  const validateInput = (platform: string, value: string) => {
    if (value === "") return;

    let regex;

    switch (platform) {
      case "x":
        regex = /^(https?:\/\/)?(www\.)?(twitter\.com\/\S+)/;
        break;

      case "discord":
        regex = /^(https?:\/\/)?(www\.)?(discord\.gg\/\S+)/;
        break;
      case "telegram":
        regex = /^(https?:\/\/)?(www\.)?(t\.me\/\S+)/;
        break;
      case "medium":
        regex = /^(https?:\/\/)?(www\.)?(medium\.com\/\S+)/;
        break;
      case "youtube":
        regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/\S+)/;
        break;
      default:
        return;
    }

    if (!regex.test(value)) {
      setErrors((prev) => ({
        ...prev,
        [platform]: `Invalid ${platform} link.`,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all inputs before submitting
    Object.keys(socials).forEach((platform) => {
      validateInput(platform, socials[platform]);
    });

    // Check for any errors, but allow empty fields
    if (Object.values(errors).some((error) => error && error !== null)) {
      return;
    }

    // Filter out empty social media links
    const filteredSocials = Object.entries(socials).reduce(
      (acc, [key, value]) => {
        if (value.trim() !== "") {
          acc[key] = value.trim();
        }
        return acc;
      },
      {} as Record<string, string>
    );
    console.log("filersocial", filteredSocials);
    onComplete({ projectSocials: filteredSocials });
  };

  const socialIcons = {
    x: FaXTwitter,
    website: FaInstagram,
    discord: FaDiscord,
    telegram: FaTelegram,
    medium: FaMedium,
    youtube: FaYoutube,
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-black">
        Socials
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {Object.keys(socialIcons).map((platform) => {
            const Icon = socialIcons[platform as keyof typeof socialIcons];
            return (
              <div key={platform} className="flex flex-col">
                <div className="flex items-center bg-white border rounded-md overflow-hidden">
                  <div className="p-3 bg-gray-100">
                    <Icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <input
                    type="text"
                    placeholder={`Enter ${platform} link here`}
                    className="flex-grow p-3 outline-none text-gray-600"
                    value={socials[platform] || ""}
                    onChange={handleChange(platform)}
                    onBlur={() =>
                      validateInput(platform, socials[platform] || "")
                    }
                  />
                </div>
                {errors[platform] && (
                  <span className="text-red-600 text-sm mt-1">
                    {errors[platform]}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <button
          type="submit"
          className="w-full mt-6 py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Socials;
