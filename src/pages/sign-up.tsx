import { useNavigate } from "react-router-dom";
import SignUpForm from "../components/form/SignUpForm";
import { useEffect } from "react";
import { LS_TOKEN } from "../utils/constants";

import bgImage from "../assets/bg.jpg"; 

const SignUpPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(LS_TOKEN);
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div
      className="h-screen w-screen flex items-center justify-end p-8 bg-gray-100"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-[6px_6px_2px_white] border-4 border-blue-400">
        <h2 className="text-2xl font-bold text-black">Sign Up</h2>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
