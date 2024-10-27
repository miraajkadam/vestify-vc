"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "@/lib/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Cookies from "js-cookie";
import { Input } from "../ui/Input";
import { Button } from "../ui/button";
import { FormError } from "../ui/formError";
import TwitterIcon from "../ui/TwitterIcon";
import DiscordIcon from "../ui/DiscordIcon";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await login(data);
      if (response.success && response.data?.access_token) {
        Cookies.set("access_token", response.data.access_token, {
          expires: 7,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
        router.push("/vc");
      } else {
        setError(response.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-[100vh] relative bg-[#f7f9fc] flex justify-center items-center">
      <div className="w-[456px] px-7 py-8 left-[492px] bg-white rounded-[10px] border border-[#d0d4dd]">
        <div className="w-[400px] flex-col justify-start items-center gap-8 flex">
          <div className="w-[400px] h-[34px] flex-col justify-start items-center flex">
            <div className="text-[#101828] text-[28px] font-semibold font-['Urbanist'] leading-[33.60px]">
              WELCOME TO MAMBAX
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[400px] flex-col justify-start items-center gap-[30px] flex"
          >
            <div className="self-stretch flex-col justify-start items-start gap-8 flex">
              <div className="w-[400px] flex-col gap-6">
                <Input
                  label="Email"
                  type="email"
                  {...register("email")}
                  error={errors.email}
                />
                <Input
                  label="Password"
                  type="password"
                  {...register("password")}
                  error={errors.password}
                />
              </div>
              <div className="w-full flex justify-between gap-4">
                <button
                  type="button"
                  className="w-[200px] h-[60px] bg-[#ecf9ff] rounded-[10px] flex items-center justify-center gap-3"
                >
                  <TwitterIcon className="w-6 h-6 text-[#1DA1F2]" />
                  <span className="text-black text-base font-semibold font-['Urbanist'] leading-normal">
                    Twitter
                  </span>
                </button>
                <button
                  type="button"
                  className="w-[200px] h-[60px] bg-[#f1f2ff] rounded-[10px] flex items-center justify-center gap-3"
                >
                  <DiscordIcon className="w-6 h-6 text-[#5865F2]" />
                  <span className="text-black text-base font-semibold font-['Urbanist'] leading-normal">
                    Discord
                  </span>
                </button>
              </div>
              <Button
                type="submit"
                className="w-full h-[55px] bg-indigo-600 rounded-lg text-white text-base font-semibold font-['Urbanist'] leading-normal flex justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "SIGN IN"}
              </Button>
              {error && <FormError message={error} />}
            </div>
            <p className="text-center text-sm text-gray-600">
              Create an account?{" "}
              <Link
                href="/auth/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
