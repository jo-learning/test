import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Form is valid, proceed with the submission (e.g., API call)
      console.log('Form submitted with:', { email, password });
      // Reset form and errors
      setEmail('');
      setPassword('');
      setErrors({});
    }
  };

  return (
    <div className="max-w-sm  mb-10 sm:mb-0  mx-auto p-8 bg-gray-200 dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {setEmail(e.target.value); setErrors({})}}
            className="input-field mb-1 w-full p-2 border rounded-lg"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        
        <div className="mb-3">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {setPassword(e.target.value); setErrors({})}}
            className="input-field mb-1 w-full p-2 border rounded-lg"
          />
          {errors.password && <p className="text-red-500 text-sm ">{errors.password}</p>}
        </div>

        <div className="flex justify-between mb-4">
          <label><input type='checkbox' /> Remeber me</label>
          
          <Link to={'/forgot-password'} className="text-blue-500 hover:underline ">
            Forgot Password?
          </Link>
        </div>
        
        <button type="submit" className="w-full p-2 bg-brand-primary text-white dark:text-white rounded-lg">Sign in</button>
        <p className="mt-4 text-center">
          Don’t have an account? <Link to={'/signup'} className="text-blue-500 hover:underline">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default SignInForm;
