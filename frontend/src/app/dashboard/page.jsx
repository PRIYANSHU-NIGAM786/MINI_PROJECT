'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Dashboard = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    _id: '', title: '', city: '', weather: '', duration: '', budget: '', daysSchedule: []
  });

  useEffect(() => {
    const checkAndFetch = async () => {
      try {
        if (typeof window !== 'undefined') {
          const storedUser = localStorage.getItem('user');
          if (!storedUser || storedUser === "undefined") {
            window.location.replace('/login');
            return;
          }
          const loggedInUser = JSON.parse(storedUser);
          setCurrentUser(loggedInUser);

          if (loggedInUser && loggedInUser._id) {
            const res = await axios.get(`http://localhost:5000/product/getbyuser/${loggedInUser._id}`);
            setItineraries(Array.isArray(res.data) ? res.data : []);
          }
        }
      } catch (error) {
        console.error("Dashboard Loading Error:", error);
      } finally {
        setLoading(false);
      }
    };
    checkAndFetch();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.replace('/login');
  };

  const deleteItinerary = async (id, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to cancel this trip plan? 🎒")) {
      try {
        const res = await axios.delete(`http://localhost:5000/product/delete/${id}`);
        if (res.status === 200) {
          alert("Trip successfully deleted!");
          setItineraries(itineraries.filter(item => item._id !== id));
          if(expandedCardId === id) setExpandedCardId(null);
        }
      } catch (error) { alert("Failed to delete trip."); }
    }
  };

  const openEditModal = (trip, e) => {
    e.stopPropagation(); 
    setEditData({ ...trip });
    setShowEditModal(true);
  };

  const handleEditChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  const handleDayScheduleChange = (index, value) => {
    const updatedDays = [...editData.daysSchedule];
    updatedDays[index] = value;
    setEditData({ ...editData, daysSchedule: updatedDays });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/product/update/${editData._id}`, editData);
      if (res.status === 200) {
        alert("✏️ Itinerary updated successfully!");
        setShowEditModal(false);
        setItineraries(itineraries.map(item => item._id === editData._id ? res.data : item));
      }
    } catch (error) { alert("Failed to update schedule."); }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-black tracking-wider text-amber-400">🌐 ROAMIFY</h1>
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-400">Explorer: <b className="text-white">{currentUser?.name || 'Loading...'}</b></span>
          <Link href="/create-itinerary" className="bg-amber-500 text-slate-900 px-3 py-1.5 rounded-xl text-xs font-bold">+ Plan New Trip</Link>
          <button onClick={handleLogout} className="text-xs bg-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-xl cursor-pointer">Logout 🚪</button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-extrabold text-white">Travel Dashboard</h2>
        <p className="text-slate-400 text-sm mt-1">Manage, modify, or explore your custom destination tracks.</p>

        {loading ? (
          <div className="text-center py-20 text-slate-400">🗺️ Loading radar routes...</div>
        ) : itineraries.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-3xl bg-slate-900/20 mt-6">
            <p className="text-slate-400">No itineraries found for your account! 🏖️</p>
            <Link href="/create-itinerary" className="mt-4 inline-block bg-slate-800 text-amber-400 text-xs font-semibold px-4 py-2 rounded-xl">Create One Now</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 mt-6">
            {itineraries.map((trip) => {
              const isExpanded = expandedCardId === trip._id;
              return (
                <div key={trip._id} onClick={() => setExpandedCardId(isExpanded ? null : trip._id)} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden cursor-pointer">
                  <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <span className="bg-amber-500/10 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">📍 {trip.city}</span>
                      <h3 className="text-xl font-bold text-white mt-1">{trip.title}</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">📅 {trip.duration} Days</div>
                      <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-amber-400 font-bold">{trip.budget}</div>
                      <button onClick={(e) => openEditModal(trip, e)} className="p-2 text-xs font-bold bg-slate-800 text-white rounded-xl border border-slate-700">Edit ✏️</button>
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-3 border-t border-slate-800 bg-slate-950/40">
                      <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">📋 Day-by-Day Plan</h4>
                      <div className="pl-4 border-l border-slate-800 space-y-4">
                        {trip.daysSchedule?.map((text, idx) => (
                          <div key={idx} className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                            <span className="text-[9px] font-bold text-amber-500 block">DAY {idx + 1}</span>
                            <p className="text-xs text-slate-300 mt-0.5">{text || "Rest Day"}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
                        <button onClick={(e) => deleteItinerary(trip._id, e)} className="text-xs bg-red-950/40 text-red-400 font-bold px-3 py-1.5 rounded-xl border border-red-900/30">Cancel Trip 🗑️</button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* EDIT MODAL BLOCK */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl max-h-[85vh] overflow-y-auto p-6 text-white space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-xl font-bold text-amber-400">Modify Plan ✏️</h3>
              <button onClick={() => setShowEditModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>
            <form onSubmit={handleUpdateSubmit} className="space-y-4 text-sm">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Trip Plan Title</label>
                <input type="text" value={editData.title} onChange={(e) => handleEditChange('title', e.target.value)} className="w-full py-2 px-3 bg-slate-950 border border-slate-800 rounded-xl text-white" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Destination City</label>
                  <input type="text" value={editData.city} onChange={(e) => handleEditChange('city', e.target.value)} className="w-full py-2 px-3 bg-slate-950 border border-slate-800 rounded-xl text-white" required />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Budget Tier</label>
                  <select value={editData.budget} onChange={(e) => handleEditChange('budget', e.target.value)} className="w-full py-2 px-3 bg-slate-950 border border-slate-800 rounded-xl text-white">
                    <option value="Budget (Backpacker)">🎒 Budget (Backpacker)</option>
                    <option value="Moderate (Mid-range)">💼 Moderate (Mid-range)</option>
                    <option value="Luxury (Premium)">👑 Luxury (Premium)</option>
                  </select>
                </div>
              </div>
              {editData.daysSchedule?.length > 0 && (
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                  <span className="text-xs font-bold text-amber-500 block">Modify Daily Micro Plans</span>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {editData.daysSchedule.map((text, idx) => (
                      <div key={idx} className="flex flex-col gap-1">
                        <span className="text-[10px] text-slate-500 font-bold">DAY {idx + 1} Activity</span>
                        <input type="text" value={text} onChange={(e) => handleDayScheduleChange(idx, e.target.value)} className="w-full py-1.5 px-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200" required />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex gap-2 pt-2 justify-end">
                <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 bg-slate-800 rounded-xl text-xs font-bold">Discard</button>
                <button type="submit" className="px-5 py-2 bg-amber-500 text-slate-900 font-bold rounded-xl text-xs">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;