import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { FormError } from "../ui/formError";

const vcTagsSchema = z.object({
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  kycDone: z.preprocess((val) => val === "true", z.boolean()),
  subscriptionFee: z.number().min(0, "Subscription fee must be 0 or greater"),
});

type VCTagsFormData = z.infer<typeof vcTagsSchema> & {
  id?: string;
};

interface VCTagsFormProps {
  onSubmit: (data: VCTagsFormData) => void;
  isLoading: boolean;
  userId: string;
}

const VCTagsForm: React.FC<VCTagsFormProps> = ({
  onSubmit,
  isLoading,
  userId,
}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<VCTagsFormData>({
    resolver: zodResolver(vcTagsSchema),
    defaultValues: {
      tags: [],
      kycDone: true,
      subscriptionFee: 70,
    },
  });

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      const newTags = [...tags, currentTag];
      setTags(newTags);
      setValue("tags", newTags);
      setCurrentTag("");
    }
  };

  const onSubmitForm: SubmitHandler<VCTagsFormData> = (data) => {
    onSubmit({
      ...data,
      id: userId,
    });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#f7f9fc]">
      <div className="w-[456px] bg-white rounded-[10px] border border-[#d0d4dd] p-7 shadow-sm">
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          {/* Progress bar */}
          <div className="flex justify-end items-center mb-8">
            <div className="w-full h-2 bg-[#f2f3f6] rounded-full">
              <div className="w-[1%] h-full bg-[#33c90e] rounded-full"></div>
            </div>
            <span className="ml-2 text-sm font-medium text-[#344053]">0%</span>
          </div>

          <h2 className="text-[#101828] text-2xl font-semibold font-['Urbanist'] text-center  ">
            VC Details
          </h2>

          {/* VC tags input */}
          <div>
            <label className="block text-sm font-medium text-[#101828] mb-1">
              VC tags
            </label>
            <div className="w-[400px] h-[87px] pt-4 border border-[#d0d5dd]/60 rounded-tl-[6px] relative text-[#101828]">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddTag())
                }
                placeholder="Add project tags"
                className="w-full p-3 outline-none"
              />
              <div className="absolute bottom-2 left-2 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-200 px-2 py-1 rounded text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {errors.tags && (
            <FormError message={errors.tags.message || "Tags are required"} />
          )}

          {/* KYC section */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium text-[#101828]">KYC</span>
            </div>
            <div className="flex gap-5">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  {...register("kycDone")}
                  value="true"
                  className="w-4 h-4 text-[#00b828] border-[#00b828]"
                />
                <span className="text-sm font-medium text-[#101828]">Yes</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  {...register("kycDone")}
                  value="false"
                  className="w-4 h-4 text-[#d1d1d1] border-[#d1d1d1]"
                />
                <span className="text-sm font-medium text-[#101828]">No</span>
              </label>
            </div>
          </div>

          {/* Subscription fee */}
          <div className="w-[400px] h-[53px] px-2  flex justify-between align-middle items-center bg-[#f2f2ff] rounded-tl-[8px]">
            <span className="text-lg font-medium text-[#101828]">
              Subscription fee
            </span>
            <div className="">
              <span className=" text-lg font-black text-[#101828]">$</span>
              <input
                type="number"
                {...register("subscriptionFee", { valueAsNumber: true })}
                className=" w-[50px] text-lg font-black text-[#101828] bg-transparent border-none outline-none"
              />
            </div>
          </div>
          {errors.subscriptionFee && (
            <FormError
              message={
                errors.subscriptionFee.message || "Invalid subscription fee"
              }
            />
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg"
          >
            {isLoading ? "Creating VC..." : "Proceed"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default VCTagsForm;
