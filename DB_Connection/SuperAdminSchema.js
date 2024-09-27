const mongoose = require('mongoose');

const SuperAdminSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true,
        select: false  // Exclude password by default
      },
      isAdmin: {
        type: String,
        enum: ['YES', 'NO'],
        required: true
      }                                                                                                                                 
});



module.exports=mongoose.model('SuperAdmin',SuperAdminSchema);


