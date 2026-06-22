'use client'

import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import Link from 'next/link';

const Login = () => {
  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await axios.post('http://localhost:5000/user/login', values);
        if (res.status === 200) {
          alert("👋 Welcome Back, Traveler! Login Successful.");
          
          // Backend response structure ke hisab se safe extraction
          const userData = res.data.user || res.data;
          localStorage.setItem('user', JSON.stringify(userData));
          
          // Hard routing redirection taaki cache clear hokar dashboard render ho
          window.location.replace('/dashboard');
        }
      } catch (error) {
        console.error(error);
        alert("Invalid Email or Password. Please try again!");
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl w-full max-w-md shadow-2xl backdrop-blur-md">
        <h2 className="text-2xl font-black text-center text-amber-400 mb-2">Welcome Back</h2>
        <p className="text-xs text-slate-400 text-center mb-6">Log in to access your personal travel itineraries</p>
        
        <form onSubmit={loginForm.handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Email Address</label>
            <input type="email" name="email" onChange={loginForm.handleChange} value={loginForm.values.email} className="w-full py-2.5 px-4 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-amber-500 focus:outline-none" required />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Password</label>
            <input type="password" name="password" onChange={loginForm.handleChange} value={loginForm.values.password} className="w-full py-2.5 px-4 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-amber-500 focus:outline-none" required />
          </div>
          <button type="submit" disabled={loginForm.isSubmitting} className="w-full bg-amber-500 text-slate-900 py-3 rounded-xl font-bold uppercase tracking-wider hover:bg-amber-400 transition-all cursor-pointer disabled:opacity-50 mt-2">
            {loginForm.isSubmitting ? 'Verifying... 📡' : "Let's Go 🚀"}
          </button>
        </form>
        <p className="text-xs text-center text-slate-500 mt-4">New to Roamify? <Link href="/signup" className="text-amber-400 hover:underline">Create Account</Link></p>
      </div>
    </div>
  );
};

export default Login;