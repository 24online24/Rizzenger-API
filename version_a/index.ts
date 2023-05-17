import {Application} from "https://deno.land/x/oak@v12.4.0/mod.ts";
import { setupRoutes } from "./routes/setup.routes.ts";
import { userRoutes } from "./routes/user.routes.ts";

const app = new Application();

app.use(setupRoutes.routes());
app.use(setupRoutes.allowedMethods());

app.use(userRoutes.routes());
app.use(userRoutes.allowedMethods());

await app.listen({port: 8000});