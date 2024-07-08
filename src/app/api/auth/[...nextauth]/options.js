import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const options = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        CredentialsProvider({
            type: "credentials",
            credentials:{
                email:{
                    label: "Email", type: "email" , placeholder: "@email.com"
                },
                password:{
                     label: "Password", type: "password"
                }
            },
            async authorize(credentials, req){
                const user ={
                    id: "2",
                    name: "gautam",
                    email: "gtm@gmail.com",
                    password: "12345"
                }
                const {email , password} = credentials;
                if(email == user.email && password == user.password){
                    return user;
                } else {
                    return null
                }
            }
        })
    ],
    session:{
        strategy: "jwt"
    }
};
