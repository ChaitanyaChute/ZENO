import { prismaClient } from "@repo/database/client";
import type { PrismaClient } from "@repo/database/client";

const prisma: PrismaClient = prismaClient;

export default prisma;