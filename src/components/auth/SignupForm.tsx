"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { signUp, createVC } from "@/lib/api";
import { FormError } from "../ui/formError";
import VCInfoForm from "./VCInfoForm";
import VCTagsForm from "./VCTagsForm";
import imageCompression from "browser-image-compression";
import InitialSignupForm from "./InitialSignupForm";
import { jwtDecode } from "jwt-decode";
import Socials from "../projectComponents/Socials";

interface TokenPayload {
  user?: {
    id: string;
  };
}

interface UserData {
  id?: string;
  accountType: string;
  name?: string;
  description?: string;
  logoBase64?: string;
  subscriptionFee?: number;
  tags?: string[];
  kycDone?: boolean;
  socials?: {
    x?: string;
    instagram?: string;
    discord?: string;
    telegram?: string;
    medium?: string;
    youtube?: string;
  };
}

interface VCInfoFormData {
  name: string;
  description: string;
  logoFile: File;
}

interface VCTagsFormData {
  tags: string[];
  kycDone: boolean;
  subscriptionFee: number;
}

interface SocialMediaData {
  x?: string;
  instagram?: string;
  discord?: string;
  telegram?: string;
  medium?: string;
  youtube?: string;
}

interface SignUpResponse {
  success: boolean;
  data: {
    access_token: string;
  };
  message?: string;
}

const SignupForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({ accountType: "VC" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onInitialSignup = async (formData: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const signupData = { ...formData, accountType: "VC" };
      const response: SignUpResponse = await signUp(signupData);
      if (response.success) {
        const accessToken = response.data.access_token;
        Cookies.set("access_token", accessToken, {
          expires: 7,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        const decodedToken = jwtDecode<TokenPayload>(accessToken);
        const userId = decodedToken.user?.id || "";

        setUserData((prev) => ({ ...prev, ...signupData, id: userId }));
        setStep(2);
      } else {
        setError(response.message || "An error occurred during signup.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("An error occurred during signup.");
    }
  };

  const handleVCInfoSubmit = async (vcInfo: VCInfoFormData) => {
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(vcInfo.logoFile, options);
      const logoBase64 = await imageCompression.getDataUrlFromFile(
        compressedFile
      );
      setUserData((prev) => ({ ...prev, ...vcInfo, logoBase64 }));
      setStep(3);
    } catch (error) {
      console.error("Image compression error:", error);
      setError("An error occurred while compressing the image.");
    }
  };

  const handleVCTagsSubmit = async (tagsAndSubscription: VCTagsFormData) => {
    setStep(4); // Move to social media form instead of submitting
    setUserData((prev) => ({ ...prev, ...tagsAndSubscription }));
  };

  const handleSocialMediaSubmit = async (data: {
    projectSocials: SocialMediaData;
  }) => {
    setIsLoading(true);
    setError("");

    const finalVCData = {
      id: userData.id!,
      name: userData.name!,
      description: userData.description!,
      logoBase64: userData.logoBase64!,
      subscriptionFee: userData.subscriptionFee!,
      tags: userData.tags!,
      kycDone: userData.kycDone!,
      socials: data.projectSocials,
    };

    try {
      await createVC(finalVCData);
      router.push("/vc");
    } catch (error) {
      console.error("VC creation error:", error);
      setError("An error occurred while creating the VC profile.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {error && <FormError message={error} />}
      {step === 1 && <InitialSignupForm onSubmit={onInitialSignup} />}
      {step === 2 && <VCInfoForm onSubmit={handleVCInfoSubmit} />}
      {step === 3 && (
        <VCTagsForm
          onSubmit={handleVCTagsSubmit}
          isLoading={isLoading}
          userId={userData.id || ""}
        />
      )}
      {step === 4 && <Socials onComplete={handleSocialMediaSubmit} />}
    </div>
  );
};

export default SignupForm;
