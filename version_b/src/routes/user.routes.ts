import { Router } from "../deps.ts";
import userController from "../controllers/user.controller.ts";
import { createUserSchema, updateUserSchema } from "../schema/user.schema.ts";
import validate from "../middleware/validate.ts";

const router = new Router();

router.post<string>(
  "/user",
  validate(createUserSchema),
  userController.createUserController,
);
router.get<string>("/users", userController.findAllUsersController);
router.get<string>("/user/:userId", userController.findUserController);
router.patch<string>(
  "/user/:userId",
  validate(updateUserSchema),
  userController.updateUserController,
);
router.delete<string>("/user/:userId", userController.deleteUserController);

console.log(router.routes());
export default router;
