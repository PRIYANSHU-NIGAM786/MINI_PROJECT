'use client'

import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
// REDIRECTION KE LIYE IMPORT KIYA
import Link from 'next/link'; 

const SignupSchema = Yup.object().shape({
   name: Yup.string().min(2, 'Too Short!').required('Name is required'),
   email: Yup.string().email('Invalid email').required('Email is required'),
   password: Yup.string().min(6, 'Minimum 6 characters required').required('Password is required'),
   confirmPassword : Yup.string().required('Confirm your password').oneOf([Yup.ref('password')], 'Passwords must match')
});

const Signup = () => {
  const signupForm = useFormik({
    initialValues: { name: '', email: '', password: '', confirmPassword: '' },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post('http://localhost:5000/user/add', values);
        if(res.status === 200){
            alert("🎒 Registration Successful!");
            signupForm.resetForm();
        }
      } catch (error) {
         alert("Backend server checked? Port 5000 is not responding.");
      }
    }
  });

  return (
    <div className='min-h-screen py-12 px-4 flex items-center justify-center relative bg-cover bg-center' style={{ backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.85)), url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop')` }}>
      <div className="max-w-md w-full space-y-6 bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 text-white">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-500 rounded-full text-slate-900 shadow-lg mb-3">
            <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Travel Itinerary Planner</h2>
          <p className="mt-1 text-xs text-slate-300">Create an account to start your journey</p>
        </div>

        <form onSubmit={signupForm.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-amber-400 mb-1">Full Name</label>
            <input type="text" id="name" placeholder="Priyanshu" onChange={signupForm.handleChange} onBlur={signupForm.handleBlur} value={signupForm.values.name} className="w-full py-2 px-4 bg-slate-900/40 border border-white/20 rounded-xl text-sm text-white focus:outline-hidden focus:border-amber-500" />
            {signupForm.errors.name && signupForm.touched.name && <p className="text-xs text-red-400 mt-1">⚠️ {signupForm.errors.name}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-amber-400 mb-1">Email Address</label>
            <input type="email" id="email" placeholder="test@travel.com" onChange={signupForm.handleChange} onBlur={signupForm.handleBlur} value={signupForm.values.email} className="w-full py-2 px-4 bg-slate-900/40 border border-white/20 rounded-xl text-sm text-white focus:outline-hidden focus:border-amber-500" />
            {signupForm.errors.email && signupForm.touched.email && <p className="text-xs text-red-400 mt-1">⚠️ {signupForm.errors.email}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-amber-400 mb-1">Password</label>
            <input type="password" id="password" placeholder="Min 6 characters" onChange={signupForm.handleChange} onBlur={signupForm.handleBlur} value={signupForm.values.password} className="w-full py-2 px-4 bg-slate-900/40 border border-white/20 rounded-xl text-sm text-white focus:outline-hidden focus:border-amber-500" />
            {signupForm.errors.password && signupForm.touched.password && <p className="text-xs text-red-400 mt-1">⚠️ {signupForm.errors.password}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-amber-400 mb-1">Confirm Password</label>
            <input type="password" id='confirmPassword' placeholder="Repeat password" onChange={signupForm.handleChange} onBlur={signupForm.handleBlur} value={signupForm.values.confirmPassword} className="w-full py-2 px-4 bg-slate-900/40 border border-white/20 rounded-xl text-sm text-white focus:outline-hidden focus:border-amber-500" />
            {signupForm.errors.confirmPassword && signupForm.touched.confirmPassword && <p className="text-xs text-red-400 mt-1">⚠️ {signupForm.errors.confirmPassword}</p>}
          </div>
          <button type="submit" className="w-full mt-2 py-2.5 px-4 font-bold text-sm rounded-xl bg-amber-500 text-slate-900 hover:bg-amber-400 active:scale-98 transition-all shadow-md cursor-pointer">Sign Up 🚀</button>
        </form>

        {/* UPDATED: Next.js Link lagaya redirect ke liye */}
        <div className="text-center pt-2 border-t border-white/10 text-xs text-slate-400">
          Already have an account? <Link href="/login" className="text-amber-400 font-bold hover:underline">Log In</Link>
        </div>
      </div>
    </div>
  )
}
export default Signup;