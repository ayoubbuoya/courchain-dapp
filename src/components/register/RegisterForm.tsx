"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterForm({ email }: { email: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidFirstName, setIsValidFirstName] = useState(true);
  const [isValidLastName, setIsValidLastName] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSubmitted) {
      setIsSubmitted(true);
    }
    // reset all the validation
    setIsValidFirstName(true);

    const id = toast.loading("Creating account...", {});
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("first-name") as string;
    const lastName = formData.get("last-name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;
    if (firstName === "") {
      setIsValidFirstName(false);
      toast.update(id, {
        render: "Please enter your first name",
        type: "error",
        isLoading: false,
        autoClose: 2000,
        transition: Bounce,
      });
      return;
    }
    setIsValidLastName(true);

    if (lastName === "") {
      setIsValidLastName(false);
      toast.update(id, {
        render: "Please enter your last name",
        type: "error",
        isLoading: false,
        autoClose: 2000,
        transition: Bounce,
      });
      return;
    }
    setIsValidPassword(true);
    if (password === "") {
      setIsValidPassword(false);
      toast.update(id, {
        render: "Please enter your password",
        type: "error",
        isLoading: false,
        autoClose: 2000,
        transition: Bounce,
      });
      return;
    }

    if (password.length < 8) {
      setIsValidPassword(false);
      toast.update(id, {
        render: "Password must be at least 8 characters long",
        type: "error",
        isLoading: false,
        autoClose: 2000,
        transition: Bounce,
      });
      return;
    }

    if (password.length > 20) {
      setIsValidPassword(false);
      toast.update(id, {
        render: "Password must be less than 20 characters long",
        type: "error",
        isLoading: false,
        autoClose: 2000,
        transition: Bounce,
      });
      return;
    }
    setIsValidConfirmPassword(true);
    if (confirmPassword !== password) {
      setIsValidConfirmPassword(false);
      toast.update(id, {
        render: "Passwords do not match",
        type: "error",
        isLoading: false,
        autoClose: 2000,
        transition: Bounce,
      });
      return;
    }

    if (confirmPassword === "") {
      setIsValidConfirmPassword(false);
      return;
    }

    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: firstName + " " + lastName,
        email,
        password,
      }),
    });

    console.log({ response });

    if (response.ok) {
      toast.update(id, {
        render: "Account created!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
        transition: Bounce,
      });
      // wait for 2 seconds then router
      setTimeout(() => {
        router.push("/login");
        router.refresh();
      }, 2100);
    } else {
      toast.update(id, {
        render: "Something went wrong!",
        type: "error",
        isLoading: false,
        autoClose: 2000,
        transition: Bounce,
      });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value === "") {
      setIsValidPassword(false);
    } else if (e.target.value.length < 8) {
      setIsValidPassword(false);
    } else if (e.target.value.length > 20) {
      setIsValidPassword(false);
    } else {
      setIsValidPassword(true);
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    if (e.target.value === "") {
      setIsValidConfirmPassword(false);
    }
    if (e.target.value !== password) {
      setIsValidConfirmPassword(false);
    } else {
      setIsValidConfirmPassword(true);
    }
  };

  return (
    <form
      className="space-y-4 mt-3 md:mt-0 text-left w-[90%] md:w-[60%] mx-auto "
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-start justify-start gap-2">
        <label
          htmlFor="email"
          className="font-poppins font-normal text-base text-darkslategray-400"
        >
          Email
        </label>
        <input
          type="email"
          placeholder="student@courai.com"
          name="email"
          className={`border-2 outline-none border-green-500 rounded-lg py-3 px-4 w-full font-poppins font-normal text-dimgray-600 text-xs`}
          value={email}
          readOnly
        />
      </div>
      <div className="flex flex-col items-start justify-start gap-2">
        <label
          htmlFor="password"
          className="font-poppins font-normal text-base text-darkslategray-400"
        >
          Password
        </label>
        <input
          type="password"
          placeholder="***********"
          name="password"
          className={`border-2 ${
            isSubmitted && !isValidPassword
              ? "border-red-500"
              : isSubmitted && isValidPassword
              ? "border-green-500"
              : ""
          } outline-none focus:border-slate-500 rounded-lg py-3 px-4 w-full font-poppins font-normal text-dimgray-600 text-xs`}
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div className="flex flex-col items-start justify-start gap-2">
        <label
          htmlFor="confirm-password"
          className="font-poppins font-normal text-base text-darkslategray-400"
        >
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="***********"
          name="confirm-password"
          className={`border-2 ${
            confirmPassword !== "" && isValidConfirmPassword
              ? "focus-visible:border-green-500"
              : "focus-visible:border-red-500"
          } outline-none focus:border-slate-500 rounded-lg py-3 px-4 w-full font-poppins font-normal text-dimgray-600 text-xs`}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </div>

      <div className="flex items-center gap-4 py-2 ">
        <div className="flex flex-col items-start justify-start gap-2">
          <label
            htmlFor="first-name"
            className="font-poppins font-normal text-base text-darkslategray-400"
          >
            First Name
          </label>
          <input
            type="text"
            placeholder="Your First name"
            name="first-name"
            className={`border-2 ${
              isSubmitted && !isValidFirstName
                ? "border-red-500"
                : isSubmitted && isValidFirstName
                ? "border-green-500"
                : ""
            } outline-none focus:border-slate-500 rounded-lg py-3 px-4 w-full font-poppins font-normal text-dimgray-600 text-xs`}
          />
        </div>
        <div className="flex flex-col items-start justify-start gap-2">
          <label
            htmlFor="last-name"
            className="font-poppins font-normal text-base text-darkslategray-400"
          >
            Last Name
          </label>
          <input
            type="text"
            placeholder="your last name"
            name="last-name"
            className={`border-2 ${
              isSubmitted && !isValidLastName
                ? "border-red-500"
                : isSubmitted && isValidLastName
                ? "border-green-500"
                : ""
            } outline-none focus:border-slate-500 rounded-lg py-3 px-4 w-full font-poppins font-normal text-dimgray-600 text-xs`}
          />
        </div>
      </div>

      <div className="text-center pb-2">
        <button
          type="submit"
          className="w-[80%] py-[0.6rem] rounded-full mx-auto text-white font-poppins font-normal text-base bg-aqua-blue border-white border-2  "
        >
          Create Account
        </button>
      </div>
    </form>
  );
}
