const{model,Schema} = require('mongoose');

const mySchema = new Schema ({
  name : {type: String , required: true}, 
  email: {type: String, required : true , unique :true},
  password : {type : String},
  city : {type : String, default : 'unknown'}

}, {timestamps : true}); 

module.exports= model('user',mySchema);

