const express = require('express');
const Model = require('../models/productModel'); // Ensure case-sensitivity matches your file system

const router = express.Router();

// 1. Add New Product / Travel Itinerary Package
router.post('/add', (req, res) => {
   console.log("New Itinerary/Product Data Received:", req.body);

   new Model(req.body).save()
   .then(result => {
      res.status(200).json(result);
   })
   .catch(err => {
      console.error("Error adding product:", err);
      res.status(500).json({ error: 'Failed to add product', details: err });
   });
});

// 2. Get All Products / Itineraries
router.get('/getall', (req, res) => {
   Model.find()
   .then((result) => {
      res.status(200).json(result);
   })
   .catch((err) => {
      console.error("Error fetching all products:", err);
      res.status(500).json(err);
   });
});

// 3. Get Products By City (Very useful for Travel Destination search!)
router.get('/getbycity/:city', (req, res) => {
   Model.find({ city: req.params.city })
   .then((result) => {
      res.status(200).json(result);
   })
   .catch((err) => {
      console.error("Error fetching products by city:", err);
      res.status(500).json(err);
   });
});

// 4. Get Product By ID
router.get('/getbyid/:id', (req, res) => {
   // FIXED: findById mein direct id string jati hai, object nahi
   Model.findById(req.params.id)
   .then((result) => {
      if (!result) return res.status(404).json({ message: "Product/Itinerary not found!" });
      res.status(200).json(result);
   })
   .catch((err) => {
      console.error("Error fetching product by ID:", err);
      res.status(500).json(err);
   });
});

// 5. Update Product By ID
router.put('/update/:id', (req, res) => {
   Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
   .then((result) => {
      res.status(200).json(result);
   })
   .catch((err) => {
      console.error("Error updating product:", err);
      res.status(500).json(err);
   });
});

// 6. Delete Product By ID
router.delete('/delete/:id', (req, res) => {
   // FIXED: findByIdAndDelete mein direct id string jati hai, object nahi
   Model.findByIdAndDelete(req.params.id)
   .then((result) => {
      res.status(200).json({ message: "Product/Itinerary successfully deleted", data: result }); 
   })
   .catch((err) => {
      console.error("Error deleting product:", err);
      res.status(500).json(err);
   });
});

module.exports = router;