import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../app";

const APIClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:8000/trpc",
    }),
  ],
});

export default APIClient;
