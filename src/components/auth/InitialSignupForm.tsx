import React, { useState, useEffect } from "react";
import TwitterIcon from "../ui/TwitterIcon";
import DiscordIcon from "../ui/DiscordIcon";
import EyeIcon from "../ui/Icons/EyeIcon";
import Link from "next/link";

interface SignupFormData {
  email: string;
  password: string;
  username: string;
}

const InitialSignupForm: React.FC<{
  onSubmit: (data: SignupFormData) => Promise<void>;
}> = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Clear the error after 5 seconds
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleInputChange = (name: string, value: string) => {
    if (error) {
      setError(""); // Clear error on input change
    }
    if (name === "username") setUsername(value);
    else if (name === "email") setEmail(value);
    else setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simple validation
    if (!username || !email || !password) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }
    // Password validation
    const passwordValidation =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordValidation.test(password)) {
      setError(
        "Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character."
      );
      setLoading(false);
      return;
    }

    try {
      await onSubmit({ username, email, password });
    } catch (err) {
      setError("An error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  const renderInputField = (label: string, name: string, type: string) => (
    <div className="w-full mb-6">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label.toUpperCase()}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={
            name === "password" ? (showPassword ? "text" : "password") : type
          }
          value={
            name === "username" ? username : name === "email" ? email : password
          }
          onChange={(e) => handleInputChange(name, e.target.value)}
          className={`w-full px-3 py-2 border ${
            error ? "border-red-600" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black`}
          required
        />
        {name === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          >
            <EyeIcon
              className={`h-5 w-5 ${
                showPassword ? "text-indigo-600" : "text-gray-400"
              }`}
            />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-[456px] px-7 py-8 bg-white rounded-[10px] border border-[#d0d4dd]">
      <div className="w-[400px] flex-col justify-start items-center gap-8 flex">
        <h1 className="text-[#101828] text-[28px] font-semibold font-['Urbanist'] leading-[33.60px]">
          WELCOME TO MAMBAX
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full flex-col justify-start items-center gap-[30px] flex"
        >
          <div className="self-stretch flex-col justify-start items-start gap-6 flex">
            <div className="w-full flex-col gap-6">
              {renderInputField("Username", "username", "text")}
              {renderInputField("Email", "email", "email")}
              {renderInputField("Password", "password", "password")}
              {error && <p className="text-red-600 text-sm">{error}</p>}
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
            <button
              type="submit"
              className="w-full h-[55px] px-6 py-4 bg-indigo-600 rounded-lg text-white text-base font-semibold font-['Urbanist'] leading-normal flex justify-center items-center gap-2.5"
              disabled={loading}
            >
              {loading ? "Signing up..." : "SIGN UP"}
            </button>
          </div>
          <p className="text-center text-gray-700">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default InitialSignupForm;
