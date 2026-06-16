'use client'

import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Full name is required'),

  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),

  password: Yup.string()
    .required('Password is required')
    .matches(/[a-z]/, 'Must contain lowercase letter')
    .matches(/[A-Z]/, 'Must contain uppercase letter')
    .matches(/[0-9]/, 'Must contain number')
    .matches(/\W/, 'Must contain special character')
    .min(6, 'Minimum 6 characters required'),

  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match')
});

const Signup = () => {

  const signupForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },

    validationSchema: SignupSchema,

    onSubmit: async (values) => {
      try {
        console.log(values);

        const res = await axios.post(
          'http://localhost:5000/user/add',
          values
        );

        if (res.status === 200 || res.status === 201) {
          alert('Account Created Successfully ✈️');
        }
      } catch (error) {
        console.log(error);
        alert('Something went wrong');
      }
    }
  });

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-950 via-blue-900 to-cyan-700 flex items-center justify-center px-4 py-10">

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-400 rounded-full blur-3xl opacity-20"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20"></div>

      <div className="hidden lg:block absolute left-10 bottom-10 text-[120px] opacity-20 animate-bounce">
        🌍
      </div>

      <div className="hidden lg:block absolute right-10 top-10 text-[100px] opacity-20 animate-pulse">
        ✈️
      </div>

      {/* Card */}
      <div className="w-full max-w-lg backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">

        {/* Logo */}
        <div className="text-center">

          <div className="text-6xl mb-4 animate-bounce">
            ✈️
          </div>

          <h1 className="text-4xl font-extrabold text-white">
            TravelMate
          </h1>

          <p className="text-cyan-100 mt-3">
            Plan your dream trips and unforgettable adventures
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">

            <div>
              <h3 className="text-white text-xl font-bold">
                150+
              </h3>
              <p className="text-xs text-cyan-100">
                Destinations
              </p>
            </div>

            <div>
              <h3 className="text-white text-xl font-bold">
                10K+
              </h3>
              <p className="text-xs text-cyan-100">
                Travelers
              </p>
            </div>

            <div>
              <h3 className="text-white text-xl font-bold">
                500+
              </h3>
              <p className="text-xs text-cyan-100">
                Tours
              </p>
            </div>

          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={signupForm.handleSubmit}
          className="mt-8 space-y-5"
        >

          {/* Name */}
          <div>
            <label className="block text-white mb-2">
              Full Name
            </label>

            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              onChange={signupForm.handleChange}
              onBlur={signupForm.handleBlur}
              value={signupForm.values.name}
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-200 focus:ring-2 focus:ring-cyan-400 outline-none"
            />

            {signupForm.touched.name &&
              signupForm.errors.name && (
                <p className="text-red-300 text-sm mt-1">
                  {signupForm.errors.name}
                </p>
              )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-white mb-2">
              Email Address
            </label>

            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              onChange={signupForm.handleChange}
              onBlur={signupForm.handleBlur}
              value={signupForm.values.email}
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-200 focus:ring-2 focus:ring-cyan-400 outline-none"
            />

            {signupForm.touched.email &&
              signupForm.errors.email && (
                <p className="text-red-300 text-sm mt-1">
                  {signupForm.errors.email}
                </p>
              )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-white mb-2">
              Password
            </label>

            <input
              type="password"
              id="password"
              placeholder="Create password"
              onChange={signupForm.handleChange}
              onBlur={signupForm.handleBlur}
              value={signupForm.values.password}
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-200 focus:ring-2 focus:ring-cyan-400 outline-none"
            />

            {signupForm.touched.password &&
              signupForm.errors.password && (
                <p className="text-red-300 text-sm mt-1">
                  {signupForm.errors.password}
                </p>
              )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-white mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm password"
              onChange={signupForm.handleChange}
              onBlur={signupForm.handleBlur}
              value={signupForm.values.confirmPassword}
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-200 focus:ring-2 focus:ring-cyan-400 outline-none"
            />

            {signupForm.touched.confirmPassword &&
              signupForm.errors.confirmPassword && (
                <p className="text-red-300 text-sm mt-1">
                  {signupForm.errors.confirmPassword}
                </p>
              )}
          </div>

          {/* Terms */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="w-4 h-4"
            />

            <span className="text-cyan-100 text-sm">
              I agree to the Terms & Conditions
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            🚀 Start Exploring
          </button>

          <p className="text-center text-cyan-100 text-sm">
            Already have an account?{' '}
            <span className="text-white font-semibold cursor-pointer hover:underline">
              Sign In
            </span>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Signup;