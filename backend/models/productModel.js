const { model, Schema } = require('mongoose');

const mySchema = new Schema({
  title: { type: String, required: true },
  city: { type: String, required: true },
  weather: { type: String, required: true },
  duration: { type: Number, required: true },
  budget: { type: String, required: true },
  daysSchedule: { type: [String], default: [] },
  
  // 🌟 User authentication segregation ke liye unique key
  createdBy: { type: String, required: true } 

}, { timestamps: true });

module.exports = model('product', mySchema);