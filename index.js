const express= require ('express')
const {ApolloServer}= require ('@apollo/server')
const {expressMiddleware}= require ('@apollo/server/express4')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Typedefs=require('./Graphql/Typedefs');
const Resolvers =require('./Graphql/Resolvers');
const cors=require('cors')

async function startServer() {

    await mongoose.connect('mongodb://localhost:27017/super_admin',{
       
        
    }).then(()=>console.log("Connected to MongoDB"))
    .catch(err=>console.log(err));

        const app= express();
    const server= new ApolloServer({ 
       typeDefs: Typedefs,
        resolvers:Resolvers,    
    });

    app.use(bodyParser.json());
    app.use(cors({
        origin: 'http://localhost:3001', 
        credentials: true
    }));

    await server.start();

    app.use("/graphql" , expressMiddleware(server));
    app.listen(4001 , ()=> console.log("Server started at port 4001"));
}

startServer();