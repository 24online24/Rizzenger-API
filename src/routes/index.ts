import { Application } from "../deps.ts";
import userRouter from "./user.routes.ts";

function init(app: Application) {
  app.use(userRouter.prefix("").routes());
}

export default {
  init,
};
