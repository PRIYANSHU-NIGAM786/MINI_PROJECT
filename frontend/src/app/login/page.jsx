'use client'

import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
// REDIRECTION KE LIYE IMPORT KIYA
import Link from 'next/link'; 

const LoginSchema = Yup.object().shape({
   email: Yup.string().email('Invalid email').required('Email is required'),
   password: Yup.string().required('Password is required')
});

const Login = () => {
  const loginForm = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post('http://localhost:5000/user/authenticate', values);
        if(res.status === 200){
            alert("👋 Welcome Back, Traveler! Login Successful.");
            loginForm.resetForm();
        }
      } catch (error) {
         alert("Invalid Email or Password. Please try again!");
      }
    }
  });

  return (
    <div className='min-h-screen py-12 px-4 flex items-center justify-center relative bg-cover bg-center' style={{ backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.85)), url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop')` }}>
      <div className="max-w-md w-full space-y-6 bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 text-white">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-500 rounded-full text-slate-900 shadow-lg mb-3">
            <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Welcome Back</h2>
          <p className="mt-1 text-xs text-slate-300">Log in to access your travel itineraries</p>
        </div>

        <form onSubmit={loginForm.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-amber-400 mb-1">Email Address</label>
            <input type="email" id="email" placeholder="explorer@travel.com" onChange={loginForm.handleChange} onBlur={loginForm.handleBlur} value={loginForm.values.email} className="w-full py-2 px-4 bg-slate-900/40 border border-white/20 rounded-xl text-sm text-white focus:outline-hidden focus:border-amber-500" />
            {loginForm.errors.email && loginForm.touched.email && <p className="text-xs text-red-400 mt-1">⚠️ {loginForm.errors.email}</p>}
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-amber-400">Password</label>
            </div>
            <input type="password" id="password" placeholder="••••••••" onChange={loginForm.handleChange} onBlur={loginForm.handleBlur} value={loginForm.values.password} className="w-full py-2 px-4 bg-slate-900/40 border border-white/20 rounded-xl text-sm text-white focus:outline-hidden focus:border-amber-500" />
            {loginForm.errors.password && loginForm.touched.password && <p className="text-xs text-red-400 mt-1">⚠️ {loginForm.errors.password}</p>}
          </div>
          <button type="submit" className="w-full mt-2 py-2.5 px-4 font-bold text-sm rounded-xl bg-amber-500 text-slate-900 hover:bg-amber-400 active:scale-98 transition-all shadow-md cursor-pointer">Let's Go 🚀</button>
        </form>

        {/* UPDATED: Next.js Link lagaya redirect ke liye */}
        <div className="text-center pt-2 border-t border-white/10 text-xs text-slate-400">
          New to Roamify? <Link href="/signup" className="text-amber-400 font-bold hover:underline">Create Account</Link>
        </div>
      </div>
    </div>
  )
}
export default Login;