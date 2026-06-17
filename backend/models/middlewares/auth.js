const jwt = require('jsonwebtoken');
require('dotenv').config();

const authorise = (req, res, next) => {

   const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      res.status(403).json({message : 'Not Authorized'});
    }else{
      jwt.verify(token, process.env.JWT_SECRET,(err,payload)=>
      {
        if(err){
          res.status(500).json(err);
        }else{
          req.user = payload;
          next();
        }
      })
    }
  }

  module.exports = authorise;