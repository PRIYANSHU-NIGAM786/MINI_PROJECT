const { model, Schema } = require('mongoose');

const mySchema = new Schema({
  title: { type: String, required: true },
  city: { type: String, required: true },
  weather: { type: String, required: true },
  duration: { type: Number, required: true }, // FIXED: String se Number kiya days store karne ke liye
  budget: { type: String, required: true }    // FIXED: Number se String kiya text tiers store karne ke liye
}, { timestamps: true });

module.exports = model('product', mySchema);