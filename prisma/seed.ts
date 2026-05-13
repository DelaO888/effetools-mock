import "dotenv/config"
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";


const adapter = new PrismaPg({connectionString: process.env.DATABASE_URL!})
const prisma = new PrismaClient({adapter})

async function main(){
    const hashed = await bcrypt.hash("admin123", 10)
    await prisma.user.upsert({
        where: {email: "admin@effetools.com"},
        update: {},
        create: {
            email: "admin@effetools.com",
            password: hashed,
            name: "Admin",
        }
    })

    console.log("Seeded user: admin@effetools / admin123")
}

main().then(() => prisma.$disconnect())