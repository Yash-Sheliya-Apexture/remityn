// app/auth/login/LoginForm.tsx

"use client";

import { useState, useEffect, FormEvent } from "react";
import authService from "../../services/auth";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IoMdCloseCircle } from "react-icons/io";
import { FiX, FiCheckCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import apiConfig from "../../config/apiConfig";
import { LuEye, LuEyeOff } from "react-icons/lu";

const pageContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    y: -10,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

const errorVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  exit: { opacity: 0, y: 10 },
};

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [notVerifiedError, setNotVerifiedError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const registerSuccess = searchParams.get("registerSuccess");
    if (registerSuccess) {
      setSuccessMessage("Account verified! Please log in.");
      router.replace("/auth/login", { scroll: false }); // Clean URL
    }
  }, [searchParams, router]);

  const clearMessages = () => {
    setEmailError("");
    setPasswordError("");
    setGeneralError("");
    setNotVerifiedError(false);
    setSuccessMessage("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearMessages();
    let isValid = true;
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    }
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      const { user: loggedInUser, token } = await authService.login({
        email,
        password,
      });
      setSuccessMessage("Login successful! Redirecting...");
      setTimeout(() => {
        login(loggedInUser, token);
      }, 1000);
    } catch (err: any) {
      if (err.notVerified) {
        setGeneralError(err.message || "Your account is not verified.");
        setNotVerifiedError(true);
      } else {
        setGeneralError(err.message || "Invalid email or password.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendVerification = () => {
    if (!email.trim()) {
      setGeneralError("Please enter your email to resend the code.");
      setNotVerifiedError(false);
      return;
    }
    router.push(
      `/auth/register?email=${encodeURIComponent(email)}&verify=true`
    );
  };

  const handleGoogleLogin = () => {
    window.location.href = `${apiConfig.baseUrl}/auth/google`;
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen lg:p-3">
      <div className="hidden lg:flex lg:w-[55%] xl:w-[60%] bg-[url(/assets/images/leftPartImage.png)] bg-cover bg-no-repeat bg-center p-10 xl:p-16 rounded-3xl flex-col justify-between relative">
        <div className="absolute top-16 xl:left-16 ">
          <Link href={"/"}>
            <Image
              src="/assets/images/main_logo.svg"
              width={200}
              height={90}
              alt="Remityn Logo"
            />
          </Link>
        </div>
        <div className="flex-grow flex flex-col justify-end items-start text-white pt-20">
          <motion.h1
            className="text-4xl xl:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Get Started
            <br />
            with Us
          </motion.h1>
          <motion.p
            className="text-base xl:text-lg text-gray-200 mb-10 xl:mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Complete these easy steps
            <br />
            to register your account.
          </motion.p>
          <div className="flex xl:flex-row flex-col gap-4 w-full">
            {[
              { num: 1, title: "Sign up your account", active: false },
              { num: 2, title: "Sign in your account", active: true },
              { num: 3, title: "Set up your KYC", active: false },
            ].map((s) => (
              <motion.div
                key={s.num}
                className={`flex flex-col justify-between xl:w-50 xl:h-50 w-full h-26 p-3.5 xl:p-4 rounded-xl transition-all duration-300 ${
                  s.active ? "bg-white shadow-lg" : "bg-white/12"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className={`flex items-center justify-center size-7 xl:size-10 rounded-full mr-3 xl:mr-4 shrink-0 ${
                    s.active
                      ? "bg-background text-white"
                      : "bg-white/12 text-white"
                  } font-semibold text-lg`}
                >
                  {s.num}
                </div>
                <span
                  className={`text-lg ${
                    s.active ? "font-medium text-mainheading" : "text-gray-200"
                  }`}
                >
                  {s.title}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col items-center justify-center p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 overflow-y-auto">
        <div className="lg:hidden mb-10 self-center">
          <Link href={"/"}>
            <Image
              src="/assets/images/mobile-logo.svg"
              width={150}
              height={100}
              alt="Remityn Logo"
            />
          </Link>
        </div>
        
        <motion.div
          className="w-full max-w-sm md:max-w-md"
          key="login-form-container"
          variants={pageContainerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="space-y-1 mb-6 lg:text-left text-center"
            variants={itemVariants}
          >
            <h2 className="text-3xl lg:text-4xl text-mainheadingWhite font-semibold">
              Welcome back.
            </h2>
            <p className="text-gray-400">
              New to Remityn?{" "}
              <Link
                href="/auth/register"
                className="text-primary hover:text-primaryhover font-medium underline underline-offset-2 transition-all duration-75 ease-linear"
              >
                Sign up
              </Link>
            </p>
          </motion.div>

          <AnimatePresence>
            {successMessage && (
              <motion.div
                className="bg-primary-foreground p-4 rounded-xl flex items-center gap-3 mb-5"
                variants={errorVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <div className="flex bg-green-600/20 justify-center rounded-full items-center sm:size-12 size-10 shrink-0">
                  <FiCheckCircle className="text-green-500 size-6" />
                </div>
                <div>
                  <p className="text-white">{successMessage}</p>
                </div>
              </motion.div>
            )}
            {generalError && (
              <motion.div
                className="bg-primary-foreground rounded-xl p-4 flex items-center gap-3 mb-5"
                variants={errorVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <div className="flex bg-red-600/20 justify-center rounded-full items-center sm:size-12 size-10 shrink-0">
                  <FiX className="text-red-500 size-6" />
                </div>
                <div>
                  <p className="text-white">{generalError}</p>
                  {notVerifiedError && (
                    <button
                      onClick={handleResendVerification}
                      className="text-primary hover:text-primaryhover text-sm font-medium cursor-pointer underline mt-1 text-left"
                    >
                      Resend verification code  
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <motion.div variants={itemVariants}>
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex hover:bg-primarybox transition-all duration-75 ease-linear border justify-center rounded-lg h-14 text-white w-full cursor-pointer font-medium gap-2.5 items-center px-4 py-3"
              >
                <Image
                  src="/assets/icon/google.svg"
                  width={25}
                  height={24}
                  alt="Google"
                />
                Continue with Google
              </button>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex items-center py-2"
            >
              <hr className="flex-grow border-t border-gray-600" />
              <span className="px-3 text-white">Or</span>
              <hr className="flex-grow border-t border-gray-600" />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="text-white inline-block mb-1.5">
                Your email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={clearMessages}
                className={`block px-4 py-3 bg-primarybox border text-white placeholder-gray-400 h-14 w-full rounded-lg focus:outline-none transition-all duration-75 ease-linear ${
                  emailError
                    ? "border-red-600 ring-1 ring-red-600"
                    : "border-primarybox"
                }`}
              />
              {emailError && (
                <p className="flex text-red-500 text-sm items-center mt-1">
                  <IoMdCloseCircle className="size-3.5 mr-1" />
                  {emailError}
                </p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <label
                htmlFor="password"
                className="text-white inline-block mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={clearMessages}
                  className={`block px-4 py-3 bg-primarybox border text-white placeholder-gray-400 h-14 w-full rounded-lg focus:outline-none transition-all duration-75 ease-linear pr-10 ${
                    passwordError
                      ? "border-red-600 ring-1 ring-red-600"
                      : "border-primarybox"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-500 hover:text-gray-300 focus:outline-none"
                >
                  {showPassword ? <LuEye size={18} /> : <LuEyeOff size={18} />}
                </button>
              </div>
              {passwordError && (
                <p className="flex text-red-500 text-sm items-center mt-1">
                  <IoMdCloseCircle className="size-3.5 mr-1" />
                  {passwordError}
                </p>
              )}
            </motion.div>

            <motion.div className="text-right pt-1" variants={itemVariants}>
              <Link href="/auth/forgot-password" className="inline-block">
                <span className="text-subheadingWhite hover:text-primary font-medium underline underline-offset-2 transition-all duration-75 ease-linear">
                  Forgot Password?
                </span>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting || !!successMessage}
                className={`bg-primary hover:bg-primaryhover w-full text-mainheading font-semibold py-3 px-8 h-14 rounded-lg transition-all duration-75 ease-linear flex items-center justify-center ${
                  isSubmitting || !!successMessage
                    ? "opacity-70 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                {isSubmitting ? "Logging in..." : "Log in"}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}