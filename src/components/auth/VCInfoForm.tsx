"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { SVGProps } from "react";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const vcInfoSchema = z.object({
  name: z.string().min(1, "VC name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  logoFile: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});
type VCInfoFormData = z.infer<typeof vcInfoSchema>;

interface VCInfoFormProps {
  onSubmit: SubmitHandler<VCInfoFormData>;
}

const VCInfoForm: React.FC<VCInfoFormProps> = ({ onSubmit }) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<VCInfoFormData>({
    resolver: zodResolver(vcInfoSchema),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setValue("logoFile", file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitWrapper: SubmitHandler<VCInfoFormData> = (data) => {
    onSubmit(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[456px] px-7 py-8 bg-white rounded-[10px] border border-[#d0d4dd] flex flex-col justify-start items-center gap-6">
        {/* Percent bar */}
        <div className="self-stretch justify-end items-start gap-[15px] inline-flex">
          <div className="grow shrink basis-0 flex-col justify-start items-end gap-2 inline-flex">
            <div className="h-2 relative rounded-lg">
              <div className="w-[400px] h-2 left-0 top-0 bg-[#f2f3f6] rounded" />
              <div className="w-2.5 h-2 left-0 top-0 absolute bg-[#33c90e] rounded" />
            </div>
            <div className="text-[#344053] text-sm font-medium font-['Inter'] leading-tight">
              0%
            </div>
          </div>
        </div>

        {/* Form title */}
        <div className="w-full flex-col justify-start items-center flex">
          <div className="text-[#101828] text-[28px] font-semibold font-['Urbanist'] leading-[33.60px]">
            Add new VC
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmitWrapper)}
          className="w-full self-stretch flex-col justify-start items-center gap-6 flex text-black"
        >
          {/* Logo upload */}
          <div className="w-full self-stretch flex-col justify-start items-start gap-1 flex">
            <label className="self-stretch text-[#101828] text-sm font-medium font-['Urbanist'] leading-tight">
              Upload logo
            </label>
            <div className="w-full h-[150px] px-[15px] py-4 bg-white rounded-md border border-[#d0d5dd]/60 flex-col justify-center items-center gap-2.5 flex">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="logo-upload"
                accept={ACCEPTED_IMAGE_TYPES.join(",")}
              />
              <label
                htmlFor="logo-upload"
                className="cursor-pointer flex flex-col items-center justify-center h-full"
              >
                {logoPreview ? (
                  <Image
                    src={logoPreview}
                    alt="Logo preview"
                    width={100}
                    height={100}
                    className="mx-auto mb-2 object-contain"
                  />
                ) : (
                  <UploadIcon className="w-[30px] h-[30px] mb-2" />
                )}
                <div className="flex-col justify-start items-center gap-[5px] flex">
                  <div className="justify-start items-center gap-0.5 inline-flex">
                    <span className="text-[#101828] text-sm font-semibold font-['Urbanist'] leading-tight">
                      Drop your logo here, or
                    </span>
                    <span className="text-[#3996f5] text-sm font-semibold font-['Urbanist'] leading-tight">
                      browse
                    </span>
                  </div>
                  <div className="text-[#98a1b2] text-[13px] font-semibold font-['Urbanist'] leading-[18.85px]">
                    Support: JPG, PNG, WebP
                  </div>
                </div>
              </label>
            </div>
            {errors.logoFile && (
              <p className="text-red-500 text-xs mt-1">
                {errors.logoFile.message as string}
              </p>
            )}
          </div>

          {/* VC Name */}
          <div className="w-full self-stretch h-20 flex-col justify-start items-start gap-2 flex">
            <label className="self-stretch text-[#101828] text-sm font-medium font-['Urbanist'] leading-tight">
              VC Name
            </label>
            <input
              {...register("name")}
              placeholder="Enter VC name"
              className='w-full self-stretch h-14 p-4 bg-white rounded-md border border-[#d0d5dd]/60 text-[#98a1b2] text-sm font-normal font-["Urbanist"] leading-tight'
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* VC Description */}
          <div className="w-full self-stretch h-[111px] flex-col justify-start items-start gap-2 flex">
            <label className="self-stretch text-[#101828] text-sm font-medium font-['Urbanist'] leading-tight">
              VC Description
            </label>
            <textarea
              {...register("description")}
              placeholder="VC Description"
              className='w-full self-stretch h-[87px] p-4 bg-white rounded-md border border-[#d0d5dd]/60  text-sm font-normal font-["Urbanist"] leading-tight resize-none'
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full self-stretch h-[55px] px-6 py-4 bg-indigo-600 rounded-lg flex-col justify-center items-center gap-2.5 flex"
          >
            <span className="text-center text-white text-base font-semibold font-['Urbanist'] leading-normal">
              Proceed
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

const UploadIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_1126_18748)">
      <path
        d="M30 4.24476V25.7536C30 27.794 28.5601 29.4999 26.6406 29.9076C26.3555 29.9681 26.0593 30 25.755 30H4.24498C1.90029 30 0 28.0982 0 25.7536V4.24476C0 1.90019 1.90029 0 4.24498 0H25.755C28.0997 0 30 1.90019 30 4.24476Z"
        fill="#BAD7FF"
      />
      <path
        d="M24.8391 19.0901C22.9978 17.2489 20.0127 17.2489 18.1714 19.0901L16.9975 20.264L13.2861 16.5528C11.4447 14.7116 8.4597 14.7116 6.61676 16.5528L0 23.1692V25.7527C0 28.0973 1.90029 29.9991 4.24498 29.9991H25.755C26.0593 29.9991 26.3555 29.9672 26.6406 29.9067C28.5601 29.4989 30 27.7931 30 25.7527V24.2507L24.8391 19.0901Z"
        fill="#549BFF"
      />
      <path
        d="M18.3614 14.652C20.9319 14.652 23.0157 12.5682 23.0157 9.99785C23.0157 7.42746 20.9319 5.34375 18.3614 5.34375C15.7909 5.34375 13.707 7.42746 13.707 9.99785C13.707 12.5682 15.7909 14.652 18.3614 14.652Z"
        fill="#549BFF"
      />
    </g>
    <defs>
      <clipPath id="clip0_1126_18748">
        <rect width="30" height="30" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default VCInfoForm;
