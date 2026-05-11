import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

const prismaSingletonClient = () => {
  return new PrismaClient({ adapter });
};

type PrismaSingletonClient = ReturnType<typeof prismaSingletonClient>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaSingletonClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaSingletonClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
