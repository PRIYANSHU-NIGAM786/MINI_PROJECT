'use client'

import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const ItinerarySchema = Yup.object().shape({
   title: Yup.string().required('Give a title to your trip'),
   city: Yup.string().required('Destination city is required'),
   weather: Yup.string().required('Select expected weather'),
   duration: Yup.number().positive().integer().required('Number of days is required'),
   budget: Yup.string().required('Select your budget range')
});

const CreateItinerary = () => {

  const itineraryForm = useFormik({
    initialValues: {
      title: '',
      city: '',
      weather: '',
      duration: '',
      budget: ''
    },
    validationSchema: ItinerarySchema,
    onSubmit: async (values) => {
      console.log("Submitting Travel Plan to Product/Itinerary DB:", values);
      try {
        // Yeh data Product Router ke 'product/add' endpoint par jayega
        const res = await axios.post('http://localhost:5000/product/add', values);
        if(res.status === 200){
            alert("✈️ Route Locked! Travel Itinerary Created Successfully.");
            itineraryForm.resetForm();
        }
      } catch (error) {
         console.error("❌ Error creating itinerary:", error);
         alert("Server error! Make sure backend is running.");
      }
    }
  });

  return (
    <div 
      className='min-h-screen py-10 px-4 flex items-center justify-center relative bg-cover bg-center'
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.55), rgba(15, 23, 42, 0.85)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop')` 
      }}
    >
      <div className="max-w-xl w-full bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 text-white">
        
        {/* Header */}
        <div className="text-center mb-6">
          <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Plan New Adventure
          </span>
          <h2 className="text-3xl font-extrabold mt-2 text-white">Create Itinerary</h2>
          <p className="text-xs text-slate-300 mt-1">Fill in the details to generate your dream travel route</p>
        </div>

        {/* Form */}
        <form onSubmit={itineraryForm.handleSubmit} className="space-y-4">
          
          {/* Trip Title */}
          <div>
            <label className="block text-xs font-semibold text-amber-400 mb-1">Trip Plan Title</label>
            <input 
              type="text" id="title" placeholder="e.g. Summer Vacation in Mountains" 
              onChange={itineraryForm.handleChange} value={itineraryForm.values.title}
              className="w-full py-2.5 px-4 bg-slate-900/40 border border-white/20 rounded-xl text-sm focus:outline-hidden focus:border-amber-500 text-white" 
            />
            {itineraryForm.errors.title && itineraryForm.touched.title && <p className="text-xs text-red-400 mt-1">⚠️ {itineraryForm.errors.title}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Destination City */}
            <div>
              <label className="block text-xs font-semibold text-amber-400 mb-1">Destination City</label>
              <input 
                type="text" id="city" placeholder="e.g. Manali, Goa, Paris" 
                onChange={itineraryForm.handleChange} value={itineraryForm.values.city}
                className="w-full py-2.5 px-4 bg-slate-900/40 border border-white/20 rounded-xl text-sm focus:outline-hidden focus:border-amber-500 text-white" 
              />
              {itineraryForm.errors.city && itineraryForm.touched.city && <p className="text-xs text-red-400 mt-1">⚠️ {itineraryForm.errors.city}</p>}
            </div>

            {/* Weather Selection */}
            <div>
              <label className="block text-xs font-semibold text-amber-400 mb-1">Expected Weather</label>
              <select 
                id="weather" onChange={itineraryForm.handleChange} value={itineraryForm.values.weather}
                className="w-full py-2.5 px-4 bg-slate-900 border border-white/20 rounded-xl text-sm focus:outline-hidden focus:border-amber-500 text-white"
              >
                <option value="" disabled>Select Weather...</option>
                <option value="Snowy / Freezing">❄️ Snowy / Freezing</option>
                <option value="Cold / Pleasant">🍃 Cold / Pleasant</option>
                <option value="Sunny / Warm">☀️ Sunny / Warm</option>
                <option value="Rainy / Monsoon">🌧️ Rainy / Monsoon</option>
              </select>
              {itineraryForm.errors.weather && itineraryForm.touched.weather && <p className="text-xs text-red-400 mt-1">⚠️ {itineraryForm.errors.weather}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Duration Days */}
            <div>
              <label className="block text-xs font-semibold text-amber-400 mb-1">Duration (In Days)</label>
              <input 
                type="number" id="duration" placeholder="e.g. 5" 
                onChange={itineraryForm.handleChange} value={itineraryForm.values.duration}
                className="w-full py-2.5 px-4 bg-slate-900/40 border border-white/20 rounded-xl text-sm focus:outline-hidden focus:border-amber-500 text-white" 
              />
              {itineraryForm.errors.duration && itineraryForm.touched.duration && <p className="text-xs text-red-400 mt-1">⚠️ {itineraryForm.errors.duration}</p>}
            </div>

            {/* Budget Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-amber-400 mb-1">Budget Tier</label>
              <select 
                id="budget" onChange={itineraryForm.handleChange} value={itineraryForm.values.budget}
                className="w-full py-2.5 px-4 bg-slate-900 border border-white/20 rounded-xl text-sm focus:outline-hidden focus:border-amber-500 text-white"
              >
                <option value="" disabled>Select Budget...</option>
                <option value="Budget (Backpacker)">🎒 Budget (Backpacker)</option>
                <option value="Moderate (Mid-range)">💼 Moderate (Mid-range)</option>
                <option value="Luxury (Premium)">👑 Luxury (Premium)</option>
              </select>
              {itineraryForm.errors.budget && itineraryForm.touched.budget && <p className="text-xs text-red-400 mt-1">⚠️ {itineraryForm.errors.budget}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full mt-4 py-3 px-4 font-bold text-sm rounded-xl bg-amber-500 text-slate-900 hover:bg-amber-400 active:scale-98 transition-all shadow-lg cursor-pointer uppercase tracking-wider"
          >
            Generate My Route Map 🗺️
          </button>

        </form>
      </div>
    </div>
  )
}

export default CreateItinerary;