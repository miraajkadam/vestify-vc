"use client";
import React, { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";

interface Partner {
  name: string;
  logoBase64: string | null;
}

interface PartnersAndInvestorsProps {
  onComplete: (data: { partnersAndInvestors: Partner[] }) => void;
  initialData?: Partner[]; // Accept initial data as a prop
}

const PartnersAndInvestors: React.FC<PartnersAndInvestorsProps> = ({
  onComplete,
  initialData = [], // Default to an empty array if no initial data is provided
}) => {
  const [partners, setPartners] = useState<Partner[]>(() => {
    // Show existing data or at least one empty form
    return initialData.length > 0
      ? initialData
      : [{ name: "", logoBase64: null }];
  });

  // Update partners if initial data changes
  useEffect(() => {
    setPartners((prevPartners) => {
      return initialData.length > 0
        ? initialData
        : [{ name: "", logoBase64: null }];
    });
  }, [initialData]);

  const handleNameChange = (index: number, value: string) => {
    const updatedPartners = partners.map((partner, i) =>
      i === index ? { ...partner, name: value } : partner
    );
    setPartners(updatedPartners);
  };

  const handleLogoChange = async (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        });

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          const updatedPartners = partners.map((partner, i) =>
            i === index ? { ...partner, logoBase64: base64String } : partner
          );
          setPartners(updatedPartners);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };

  const addPartner = () => {
    setPartners([...partners, { name: "", logoBase64: null }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validPartners = partners.filter(
      (partner) => partner.name && partner.logoBase64
    );
    onComplete({ partnersAndInvestors: validPartners });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-black">
      <h2 className="text-2xl font-bold mb-6 text-black">
        Partners & Investors
      </h2>

      {partners.map((partner, index) => (
        <div key={index} className="space-y-4 pb-6 border-b">
          <div>
            <label
              htmlFor={`partnerName-${index}`}
              className="block mb-2 font-medium text-black"
            >
              Partner name
            </label>
            <input
              id={`partnerName-${index}`}
              type="text"
              value={partner.name}
              onChange={(e) => handleNameChange(index, e.target.value)}
              placeholder="Enter partner name"
              className="w-full p-3 border border-gray-300 rounded-md"
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
                Upload logo
              </label>
              <span className="text-xs text-gray-500">
                SVG, PNG, JPG • Max. 5MB
              </span>
            </div>
            {partner.logoBase64 && (
              <p className="mt-1 text-sm text-gray-600">Logo uploaded</p>
            )}
          </div>
        </div>
      ))}

      {/* <button
        type="button"
        onClick={addPartner}
        className="text-indigo-600 underline"
      >
        Add another partner
      </button> */}

      <div className="flex justify-end">
        <button
          type="button" // Change to button type
          onClick={addPartner}
          className="w-[166px] p-3 bg-white text-[#4F46E5] rounded-md border border-[#4F46E5] mb-4 font-urbanist font-semibold text-[12px]"
        >
          Add another partner
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

export default PartnersAndInvestors;
