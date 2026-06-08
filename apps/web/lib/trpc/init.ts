import { initTRPC, TRPCError } from "@trpc/server";
import { headers } from "next/headers";
import { cache } from "react";
import superjson from "superjson";

export const createTRPCContext = cache(async (opts?: { req?: Request }) => {
  const reqHeaders = opts?.req ? opts.req.headers : await headers();
  const cookieStr = reqHeaders.get("cookie") || "";
  
  let user = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/auth/me`, {
      headers: { cookie: cookieStr },
      cache: "no-store",
    });
    if (res.ok) {
      user = await res.json();
    }
  } catch (e) {}

  return {
    user,
  };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  const session = await auth.api.getSession({
    headers: ctx.headers,
  });

  console.log("TRPC Auth check:", {
    hasReq: !!ctx.req,
    hasHeaders: !!ctx.headers,
    cookie: ctx.req
      ? ctx.req.headers.get("cookie")
      : ctx.headers?.get("cookie") || "none",
    sessionFound: !!session,
  });

  if (!session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unathorized",
    });
  }

  return next({ ctx: { ...ctx, auth: session } });
});
export const premiumProcedure = protectedProcedure;
