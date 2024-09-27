
const SuperAdmin=require ('../DB_Connection/SuperAdminSchema');
const bcrypt=require('bcrypt')


const Resolvers = {

  Query:{
    getSuperAdmins:async ()=>{
      return await SuperAdmin.find();
    },

    getSuperAdminByEmail:async (_,{email,password})=>{
      
      const superAdmin = await SuperAdmin.findOne({ email }).select('+password');
      
      console.log('superAdmin', superAdmin);
      

      if(!superAdmin){
        throw new Error("Invalid Email")
      }
      if (!superAdmin.password) {
        throw new Error("Password is missing for this SuperAdmin");
      }
      

      const chkPassword= await bcrypt.compare(password,superAdmin.password);
      if(!chkPassword){
        throw new Error("Invalid Credentials");
      } 


      return  superAdmin;
    },

  },
    
    Mutation: {
      createSuperAdmin: async (_, { superAdminInput }) => {
        const { name, email, password, isAdmin } = superAdminInput;
  
        // Check if the email already exists (optional validation)
        const existingAdmin = await SuperAdmin.findOne({ email });
        if (existingAdmin) {
          throw new Error('User with this email already exists.');
        }
  
        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 12);
  
        // Create the new Admin (SuperAdmin if isAdmin is true)
        const newAdmin = new SuperAdmin({
          name,
          email,
          password: hashedPassword,
          isAdmin: isAdmin || "YES",  // Default to false if not provided or set to false
        });
  
        // Save the new admin to the database
        const result = await newAdmin.save();
  
        return result;
      },
    },
  };
  
  module.exports = Resolvers;
  