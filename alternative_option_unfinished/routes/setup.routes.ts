import { Context, Router } from "https://deno.land/x/oak@v12.4.0/mod.ts";

import { uniqueId } from "../services/uniqueId.ts";

function init({request, response}: Context) {
    const id = request.headers.get("X-MID") ?? uniqueId();

    response.body = { id };
}

export const setupRoutes = new Router()
  .get("/init", init);
