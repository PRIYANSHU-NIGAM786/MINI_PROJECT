const express = require('express');
// FIXED: ProductModel ki jagah userModel import kiya hai
const UserModel = require('../models/userModel'); 

const router = express.Router();

// 1. Create / Add New User (Sign Up Route)
router.post('/add', (req, res) => {
   console.log("Signup Data Received:", req.body);

   // Password secure hashing (bcrypt) real projects mein yahan lagayi jati hai
   new UserModel(req.body).save()
   .then(result => {
      res.status(200).json(result);
   })
   .catch(err => {
      console.error("Error creating user:", err);
      res.status(500).json({ error: 'Failed to create user', details: err });
   });
});

// 2. Get All Users
router.get('/getall', (req, res) => {
   UserModel.find()
   .then((result) => {
      res.status(200).json(result);
   })
   .catch((err) => {
      console.error(err);
      res.status(500).json(err);
   });
});

// 3. Get User By City (Travel Feature ke liye mast hai)
router.get('/getbycity/:city', (req, res) => {
   UserModel.find({ city: req.params.city })
   .then((result) => {
      res.status(200).json(result);
   })
   .catch((err) => {
      console.error(err);
      res.status(500).json(err);
   });
});

// 4. Get User By ID
router.get('/getbyid/:id', (req, res) => {
   // FIXED: findById mein direct id string jati hai, object nahi
   UserModel.findById(req.params.id)
   .then((result) => {
      if(!result) return res.status(404).json({ message: "User not found!" });
      res.status(200).json(result);
   })
   .catch((err) => {
      console.error(err);
      res.status(500).json(err);
   });
});

// 5. Update User By ID
router.put('/update/:id', (req, res) => {
   UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
   .then((result) => {
      res.status(200).json(result);
   })
   .catch((err) => {
      console.error(err);
      res.status(500).json(err);
   });
});

// 6. Delete User By ID
router.delete('/delete/:id', (req, res) => {
   UserModel.findByIdAndDelete(req.params.id)
   .then((result) => {
      res.status(200).json({ message: "User Deleted Successfully", data: result }); 
   })
   .catch((err) => {
      console.error(err);
      res.status(500).json(err);
   });
});




// 7. User Login / Authentication Route
router.post('/authenticate', (req, res) => {
   const { email, password } = req.body;

   // Database mein check karo ki is email ka koi user hai ya nahi
   UserModel.findOne({ email: email })
   .then((result) => {
      if (result) {
         // Agar user mil gaya, toh check karo password match ho raha hai ya nahi
         if (result.password === password) {
            // Success: Email aur password dono sahi hain!
            res.status(200).json(result);
         } else {
            // Error: Password galat hai
            res.status(401).json({ message: "Password galat hai! Please check again." });
         }
      } else {
         // Error: Email hi database mein nahi hai
         res.status(404).json({ message: "Yeh email registered nahi hai!" });
      }
   })
   .catch((err) => {
      console.error("Login server error:", err);
      res.status(500).json(err);
   });
});





module.exports = router;