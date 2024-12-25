import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { authRepository } from "../../data/repositories/authRepository";
import { signinUser } from "../../domain/useCases/signinUser";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import UserContext from "../../shared/utils/UserContext";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate  = useNavigate()
  const {user, LoggedInUser} = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("user");

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const toggleMode = (newMode) => {
    setMode(newMode);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (validateForm()) {
      
      // Form is valid, proceed with the submission (e.g., API call)
      console.log("Form submitted with:", { email, password });
      const data = await signinUser({ email, password }, authRepository);
      // console.log(data);
      if (data.message) {
        console.log(data);
        LoggedInUser({token: data.accessToken})
        toast.success(data.message);
        if (user == "user"){
        navigate('/');}else{
          navigate('/dashboard')
        }
      } else {
        toast.error(data.msg);
      }
      // Reset form and errors
      setEmail("");
      setPassword("");
      setErrors({});
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm  mb-10 sm:mb-0  mx-auto p-8 bg-gray-200 dark:bg-gray-800 shadow-md rounded-lg">
      <div className="flex justify-center mb-4 space-x-1">
        <button
          className={`px-4 py-2 ${
            mode === "user" ? "bg-blue-500 text-white" : "bg-gray-300"
          } rounded-r`}
          onClick={() => toggleMode("user")}
        >
          User
        </button>
        <button
          className={`px-4 py-2 ${
            mode === "driver" ? "bg-blue-500 text-white" : "bg-gray-300"
          } rounded-lg`}
          onClick={() => toggleMode("driver")}
        >
          Driver
        </button>
        <button
          className={`px-4 py-2 ${
            mode === "provider" ? "bg-blue-500 text-white" : "bg-gray-300"
          } rounded-l`}
          onClick={() => toggleMode("provider")}
        >
          Provider
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
      <form onSubmit={handleSubmit}>
        {
          mode == "user" ? (
            <div className="mb-3">
          <input
            type="number"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              setErrors({});
            }}
            className="input-field mb-1 w-full p-2 border rounded-lg"
          />
          {/* {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )} */}
        </div>
          ) : (
            <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({});
            }}
            className="input-field mb-1 w-full p-2 border rounded-lg"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
          )
        }
        

        <div className="mb-3">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors({});
            }}
            className="input-field mb-1 w-full p-2 border rounded-lg"
          />
          {errors.password && (
            <p className="text-red-500 text-sm ">{errors.password}</p>
          )}
        </div>

        <div className="flex justify-between mb-4">
          <label>
            <input type="checkbox" /> Remeber me
          </label>

          <Link
            to={"/forgot-password"}
            className="text-blue-500 hover:underline "
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-brand-primary text-white dark:text-white rounded-lg"
        >
          { loading ? "Loading..." :"Sign in"}
        </button>
        <p className="mt-4 text-center">
          Don’t have an account?{" "}
          <Link to={"/signup"} className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignInForm;
