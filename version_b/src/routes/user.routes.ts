import { Router } from "../deps.ts";
import userController from "../controllers/user.controller.ts";
import { createUserSchema, updateUserSchema } from "../schema/user.schema.ts";
import validate from "../middleware/validate.ts";

const router = new Router();

router.get<string>("/", userController.findAllUsersController);
router.post<string>(
  "/",
  validate(createUserSchema),
  userController.createUserController,
);
router.patch<string>(
  "/:userId",
  validate(updateUserSchema),
  userController.updateUserController,
);
router.get<string>("/:userId", userController.findUserController);
router.delete<string>("/userId", userController.deleteUserController);

export default router;
