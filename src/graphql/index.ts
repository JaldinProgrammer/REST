import db from "@/config/database";
import { UserModel } from "../models/user.model"
import { gql } from "apollo-server"

const USERS = [
    {
        id: "1",
        name: "John Doe",
        telephone: "+1234567890",
        street: "123 Main St",
        city: "Anytown",
    },
    {
        id: "2",
        name: "Jane Smith",
        telephone: "+0987654321",
        street: "456 Elm St",
        city: "Othertown",
    },
    {
        id: "3",
        name: "Alice Johnson",
        telephone: "+1122334455",
        street: "789 Oak St",
        city: "Sometown",
    },
    {
        id: "4",
        name: "Bob Brown",
        telephone: "+5566778899",
        street: "321 Pine St",
        city: "Anycity",
    },
]

export const typeDefinitions = gql`

    type Location {
        street: String!
        city: String!
    }
    input LocationInput {
        street: String!
        city: String!
    }

    type User {
        id: ID!
        name: String!
        telephone: String
        location: Location
    }
    
    input createUserInput {
        name: String!
        telephone: String!
        location: LocationInput
    }

    input fetchDBUserInput {
        id: ID!
    }

    type DBUser {
        id: ID!
        name: String!
        email: String!
    }

    type Query {
        users: [User!]!
        getDBUser(inputsillo: fetchDBUserInput!): DBUser  
    }
    type Mutation {
        addUser(input: createUserInput!): User!
        createDBUser(name: String!, email: String!): DBUser!
    }
`

const userModel = new UserModel();

export const resolvers = {
    Query: {
        getDBUser: async (
            parent: unknown,
            args: any,
            context: any,
            info: any
          ) => {
            console.log(`+++ args received: ${JSON.stringify(args)}`)
            const fetcheableId = args.inputsillo.id;
            const dbUser = await userModel.findById(fetcheableId);
            console.log(`--- DB User fetched: ${JSON.stringify(dbUser)}`)
            if (!dbUser) {
                return null;
            }
            return {
                id: dbUser?.id,
                name: dbUser?.username,
                email: dbUser?.email,
            }
        },
        users: (
            parent: unknown,
            args: any,
            context: any,
            info: any
          ) => {
            console.log(`--- Parent received: ${JSON.stringify(parent)}`)
            return USERS.map(user => ({
                ...user,
                location: {
                    street: user.street || "",
                    city: user.city || "",
                },
            }))
        },
    },
    Mutation: {
        addUser: (
            parent: unknown,
            args: any,
            context: any,
            info: any
          ) => {

            const input = args.input
            console.log(`+++ Parent received: ${JSON.stringify(parent)}`)
            console.log(`Arguments received: ${JSON.stringify(args)}`)
            console.log(`Context received: ${JSON.stringify(context)}`)
            console.log(`Info received: ${JSON.stringify(info)}`)
            console.log(`Input received: ${JSON.stringify(input)}`)
            const newUser = {
                id: String(USERS.length + 1),
                ...input,
            }
            USERS.push(newUser)
            return newUser
        },
    },
}
