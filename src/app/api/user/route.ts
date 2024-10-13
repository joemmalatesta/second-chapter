import { mongoConnect } from "@/lib/mongodb";
import User from "@/models/user";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    console.log('smacking the backend')
    const {name, email} = await request.json();
    console.log(name, email + 'connecting to mongo')
    await mongoConnect()
    console.log('connected to that junt')
    await User.create({name, email})

    return NextResponse.json({message: 'added user successfully'}, {status: 200})
}