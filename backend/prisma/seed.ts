import bcrypt from "bcrypt";
import prisma from "../src/config/prisma.js";
import { UserRole } from "../generated/prisma/enums.js";

async function main() {
  const existingAdmin = await prisma.user.findUnique({
    where: { email: "admin@fleettracker.com" },
  });

  if (existingAdmin) {
    console.log("Admin user already exists");
    return;
  }

  const password = await bcrypt.hash("Admin123*", 10);

  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@fleettracker.com",
      password,
      role: UserRole.ADMIN,
    },
  });

  console.log("Admin user created successfully");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
