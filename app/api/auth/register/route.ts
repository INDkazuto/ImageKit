import { connectionToDatabase } from "@/lib/db";
import User from "@/models/User";
import { error } from "console";
import NextAuth from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
      try {
            const { email, password } = await request.json()
            if (!email || !password) {
                  return NextResponse.json(
                        { error: "email and password is required " },
                        { status: 400 }

                  )
            }

            await connectionToDatabase()

            const existingUser = await User.findOne({ email })
            {
                  if (existingUser) {
                        return NextResponse.json(
                              { error: "User is alredy register" },
                              { status: 404 }
                        )
                  }
            }

      } catch (error) {

      }
}