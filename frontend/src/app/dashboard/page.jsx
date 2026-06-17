'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Dashboard = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Database se saari itineraries fetch karne ka function
  const fetchItineraries = async () => {
    try {
      const res = await axios.get('http://localhost:5000/product/getall');
      setItineraries(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItineraries();
  }, []);

  // 2. Itinerary Delete karne ka function
  const deleteItinerary = async (id) => {
    if (window.confirm("Are you sure you want to cancel this trip plan? 🎒")) {
      try {
        const res = await axios.delete(`http://localhost:5000/product/delete/${id}`);
        if (res.status === 200) {
          alert("Trip successfully deleted!");
          // State update taaki card screen se gayab ho jaye bina page refresh kiye
          setItineraries(itineraries.filter(item => item._id !== id));
        }
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("Failed to delete trip.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      {/* Dynamic Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-black tracking-wider text-amber-400">🌐 ROAMIFY</h1>
        <Link href="/create-itinerary" className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-md">
          + Plan New Trip
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-white">Travel Dashboard</h2>
          <p className="text-slate-400 text-sm mt-1">Welcome back, Explorer! Here are your curated wanderlust routes.</p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <p className="text-xs font-semibold text-slate-400 uppercase">Total Routes Built</p>
            <p className="text-3xl font-black text-amber-400 mt-1">{itineraries.length}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <p className="text-xs font-semibold text-slate-400 uppercase">Active Explore Days</p>
            <p className="text-3xl font-black text-white mt-1">
              {itineraries.reduce((sum, item) => sum + (Number(item.duration) || 0), 0)} Days
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <p className="text-xs font-semibold text-slate-400 uppercase">Status</p>
            <p className="text-sm font-bold text-emerald-400 mt-2 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span> Ready for Takeoff
            </p>
          </div>
        </div>

        {/* Main Content Area */}
        {loading ? (
          <div className="text-center py-20 text-slate-400 text-sm font-medium animate-pulse">
            🗺️ Fetching your routes from the radar...
          </div>
        ) : itineraries.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-3xl bg-slate-900/20">
            <p className="text-slate-400 text-lg">No itineraries found on your radar!</p>
            <p className="text-xs text-slate-500 mt-1">Start by mapping your very first dream destination.</p>
            <Link href="/create-itinerary" className="mt-4 inline-block bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold px-5 py-2 rounded-xl text-xs border border-amber-500/20 transition-all">
              Launch Trip Planner 🚀
            </Link>
          </div>
        ) : (
          /* Cards Grid Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itineraries.map((trip) => (
              <div key={trip._id} className="group bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between">
                
                {/* Visual Top Decorative Block */}
                <div className="h-3 bg-gradient-to-r from-amber-500 to-orange-500"></div>

                <div className="p-6 space-y-4 flex-1">
                  {/* Title & Badge */}
                  <div>
                    <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                      📍 {trip.city}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1.5 group-hover:text-amber-400 transition-colors">
                      {trip.title}
                    </h3>
                  </div>

                  {/* Trip Features Details */}
                  <div className="grid grid-cols-2 gap-3 text-xs text-slate-400 pt-1">
                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800/60">
                      <span className="text-[10px] block text-slate-500 uppercase font-semibold">Weather Vibe</span>
                      <span className="text-white font-medium mt-0.5 block truncate">{trip.weather}</span>
                    </div>
                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800/60">
                      <span className="text-[10px] block text-slate-500 uppercase font-semibold">Trip Duration</span>
                      <span className="text-white font-medium mt-0.5 block">{trip.duration} Days</span>
                    </div>
                  </div>

                  {/* Budget Badge */}
                  <div className="inline-flex items-center text-xs bg-amber-500/10 text-amber-400 font-semibold px-3 py-1.5 rounded-xl border border-amber-500/10">
                    💰 Budget Tier: <span className="text-white ml-1 font-bold">{trip.budget}</span>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 bg-slate-950 border-t border-slate-800/60 flex justify-end gap-2">
                  <button 
                    onClick={() => deleteItinerary(trip._id)}
                    className="text-xs bg-red-950/40 hover:bg-red-900 text-red-400 font-bold px-3 py-1.5 rounded-xl border border-red-900/30 transition-all cursor-pointer"
                  >
                    Cancel Plan 🗑️
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;