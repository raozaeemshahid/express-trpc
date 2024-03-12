import { initTRPC } from "@trpc/server";
import { z } from "zod";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import cors from "cors"

// created for each request
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context

type Context = Awaited<ReturnType<typeof createContext>>;

export const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  getUser: t.procedure.query((opts) => {
    return { id: opts.input, name: "Bilbo" };
  }),
  myProcedure: t.procedure.query(() => {
    return {
      data: { myName: "my procedure", userEmail: "email@gmail.com" },
    };
  }),
  user: t.router({
    mydata: t.procedure.query(() => {
      return { name: "Rao Zaeem" }
    })
  }),
  createUser: t.procedure
    .input(z.object({ name: z.string().min(5) }))
    .mutation(async (opts) => {
      // use your ORM of choice
      return {
        hello: "world",
      };
    }),
});

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000", "http://localhost:5175"],
  }),
);

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);
app.listen("8000", () => {
  console.log("Server is listing 8000");
});

// export type definition of API
export type AppRouter = typeof appRouter;
