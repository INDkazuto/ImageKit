import NextAuth from "next-auth"
import credentialsProvider from "next-auth/providers/credentials"
import { connectionToDatabase } from "./db"
import User from "@/models/User"
import bcrypt from "bcrypt";
export const authOptions = {
      providers: [
            credentialsProvider({
                  name: 'Credentials',
                  credentials: {
                        email: { label: "Email", type: "email" },
                        password: { label: "Password", type: "password" }
                  },
                  async authorize(credentials) {
                        if (!credentials?.email || !credentials.password) {
                              throw new Error("Email and Password is incorrect")
                        }
                        try {
                              await connectionToDatabase()

                              const user = await User.findOne({ email: credentials.email })
                              if (!user) {
                                    throw new Error("user not found ")
                              }
                              const isValid = await bcrypt.compare(credentials.password, user.password)

                              if (!isValid) {
                                    throw new Error("invalid password")
                              }
                              return {
                                    id: user._id.toSting(),
                                    email: user.email
                              }
                        } catch (error) {
                              console.error("auth Error", error);

                              throw Error
                        }

                  }
            })
      ],
      callbacks:{
            async jwt({ token, user }) {
                  if (user) {
                        token.id = user.id
                  }
                  return token
            }
      }
}