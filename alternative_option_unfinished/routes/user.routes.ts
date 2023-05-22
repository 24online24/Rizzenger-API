import { Context, Router } from "https://deno.land/x/oak@v12.4.0/mod.ts";

function search(ctx: Context) {
}

function get(ctx: Context) {
}

function list(ctx: Context) {
}

function create(ctx: Context) {
}

function update(ctx: Context) {
}

function remove(ctx: Context) {
}

export const userRoutes = new Router()
  .get("/user/search", search)
  .get("/user/:id", get)
  .get("/user", list)
  .post("/user", create)
  .put("/user/:id", update)
  .delete("/user/:id", remove);
