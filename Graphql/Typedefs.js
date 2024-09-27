const { gql } = require('graphql-tag');


const Typedefs = gql `
 
 enum AdminStatus {
    YES
    NO
  }

  type SuperAdmin {
    _id: ID!
    name: String!
    email: String!
    password: String!
    isAdmin: String!
  }
     type Query {
    getSuperAdmins: [SuperAdmin]  
    getSuperAdminByEmail(email: String!, password: String!): SuperAdmin
  }

  input SuperAdminInput {
    name: String!
    email: String!
    password: String!
    isAdmin: AdminStatus!
  }

  type Mutation {
    createSuperAdmin(superAdminInput: SuperAdminInput): SuperAdmin
  }
   
`;

module.exports = Typedefs;
