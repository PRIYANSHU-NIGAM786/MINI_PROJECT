const express = require('express');
const mongoose = require('mongoose'); // 🌟 FIXED: Mongoose require karna zaroori tha
const Model = require('../models/productModel'); 

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

// 3. Get Products By City (Useful for Travel Destination search!)
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

// 5. Update Product By ID (🌟 FIXED: Cleaned and single route kept)
router.put('/update/:id', (req, res) => {
   Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
   .then((result) => {
      if (result) {
          res.status(200).json(result);
      } else {
          res.status(404).json({ message: "Trip not found" });
      }
   })
   .catch((err) => {
      console.error("Error updating product:", err);
      res.status(500).json(err);
   });
});

// 6. Delete Product By ID
router.delete('/delete/:id', (req, res) => {
   Model.findByIdAndDelete(req.params.id)
   .then((result) => {
      res.status(200).json({ message: "Product/Itinerary successfully deleted", data: result }); 
   })
   .catch((err) => {
      console.error("Error deleting product:", err);
      res.status(500).json(err);
   });
});

// 7. 🌟 GET BY USER (Dashboard filtering route - FIXED with correct model)
router.get('/getbyuser/:userid', (req, res) => {
   Model.find({ createdBy: req.params.userid })
   .then((result) => {
       res.status(200).json(result);
   })
   .catch((err) => {
       console.error("Fetch by user error:", err);
       res.status(500).json(err);
   });
});

module.exports = router;