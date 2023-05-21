import { Application } from "../deps.ts";
import userRouter from "./user.routes.ts";

function init(app: Application) {
  app.use(userRouter.prefix("/api/users/").routes());
}

export default {
  init,
};
