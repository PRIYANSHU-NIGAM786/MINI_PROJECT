'use client'

import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

const CreateItinerary = () => {
  const [isVerifying, setIsVerifying] = useState(true);

  // 🌟 1. PAGE GUARD: Page open hote hi security check karega
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (!storedUser || storedUser === "undefined") {
        alert("Security Alert: Please login first! 🔐");
        window.location.replace('/login');
      } else {
        setIsVerifying(false); // Logged in hai toh page render karne do
      }
    }
  }, []);

  const itineraryForm = useFormik({
    initialValues: {
      title: '',
      city: '',
      weather: '☀️ Sunny / Warm',
      duration: 1,
      budget: '💼 Moderate (Mid-range)',
      daysSchedule: [''] // Array to hold per day activities
    },
    onSubmit: async (values, { setSubmitting }) => {
      console.log("Submitting Full Travel Plan with Daily Schedule:", values);
      
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('user');
        const loggedInUser = JSON.parse(storedUser);
        
        // Form values ke sath user ki unique _id merge kar di
        const finalFormData = { ...values, createdBy: loggedInUser._id };

        try {
          const res = await axios.post('http://localhost:5000/product/add', finalFormData);
          if (res.status === 200) {
            alert("🚀 Route & Daily Schedule Locked Successfully!");
            itineraryForm.resetForm();
            
            // 🌟 REDIRECTION FIXED: Ab alert ke baad direct dashboard khulega
            window.location.replace('/dashboard');
          }
        } catch (error) {
          console.error("❌ Error:", error);
          alert("Server error! Make sure backend is running.");
        } finally {
          setSubmitting(false); // Button loading state se bahar aa jayega
        }
      }
    }
  });

  // 🌟 2. DYNAMIC INPUTS: Duration change hone par input boxes create karna
  useEffect(() => {
    const targetCount = parseInt(itineraryForm.values.duration) || 1;
    const currentArray = itineraryForm.values.daysSchedule;
    if (currentArray.length !== targetCount) {
      const newArray = Array.from({ length: targetCount }, (_, i) => currentArray[i] || '');
      itineraryForm.setFieldValue('daysSchedule', newArray);
    }
  }, [itineraryForm.values.duration]);

  // Jab tak verification chal rahi hai, screen blank ya loading dikhegi
  if (isVerifying) {
    return <div className="min-h-screen bg-slate-950 text-slate-400 flex items-center justify-center">📡 Securing route...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl w-full max-w-2xl shadow-2xl">
        <h2 className="text-3xl font-black text-center text-white mb-1">Create Itinerary</h2>
        <p className="text-xs text-slate-400 text-center mb-6">Set duration to unlock day-by-day scheduling</p>

        <form onSubmit={itineraryForm.handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Trip Plan Title</label>
            <input type="text" name="title" onChange={itineraryForm.handleChange} value={itineraryForm.values.title} className="w-full py-2 px-3 bg-slate-950 border border-slate-800 rounded-xl text-white" placeholder="e.g. Europe Backpacking" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Destination City</label>
              <input type="text" name="city" onChange={itineraryForm.handleChange} value={itineraryForm.values.city} className="w-full py-2 px-3 bg-slate-950 border border-slate-800 rounded-xl text-white" placeholder="Goa, Paris, etc." required />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Expected Weather</label>
              <select name="weather" onChange={itineraryForm.handleChange} value={itineraryForm.values.weather} className="w-full py-2 px-3 bg-slate-950 border border-slate-800 rounded-xl text-white">
                <option value="☀️ Sunny / Warm">☀️ Sunny / Warm</option>
                <option value="🌧️ Monsoon / Rainy">🌧️ Monsoon / Rainy</option>
                <option value="❄️ Snowy / Freezing">❄️ Snowy / Freezing</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Duration (In Days)</label>
              <input type="number" name="duration" min="1" max="30" onChange={itineraryForm.handleChange} value={itineraryForm.values.duration} className="w-full py-2 px-3 bg-slate-950 border border-slate-800 rounded-xl text-white" required />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Budget Tier</label>
              <select name="budget" onChange={itineraryForm.handleChange} value={itineraryForm.values.budget} className="w-full py-2 px-3 bg-slate-950 border border-slate-800 rounded-xl text-white">
                <option value="🎒 Budget (Backpacker)">🎒 Budget (Backpacker)</option>
                <option value="💼 Moderate (Mid-range)">💼 Moderate (Mid-range)</option>
                <option value="👑 Luxury (Premium)">👑 Luxury (Premium)</option>
              </select>
            </div>
          </div>

          {/* Micro Day-by-Day Schedule Boxes */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
            <span className="text-xs font-bold text-amber-500 block">🗺️ Day-by-Day Micro Plans</span>
            <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
              {itineraryForm.values.daysSchedule.map((dayText, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-500 font-bold">DAY {index + 1} ACTIVITY</span>
                  <input type="text" value={dayText} onChange={(e) => itineraryForm.setFieldValue(`daysSchedule.${index}`, e.target.value)} className="w-full py-2 px-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200" placeholder={`What are you planning for Day ${index + 1}?`} required />
                </div>
              ))}
            </div>
          </div>

          <button type="submit" disabled={itineraryForm.isSubmitting} className="w-full bg-amber-500 text-slate-900 py-3 rounded-xl font-bold uppercase tracking-wider hover:bg-amber-400 transition-all cursor-pointer disabled:opacity-50 mt-2">
            {itineraryForm.isSubmitting ? 'PROCESSING RADAR... 📡' : 'Generate My Route Map 🗺️'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateItinerary;