import { z } from "../deps.ts";

export const createUserSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z.string({
      required_error: "Email is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
    avatar: z.string({
      required_error: "Avatar is required",
    }),
    online: z.boolean({
      required_error: "Online is required",
    }),
  }),
});

const params = {
  params: z.object({
    userId: z.string(),
  }),
};

export const getUserSchema = z.object({
  ...params,
});

export const updateUserSchema = z.object({
  ...params,
  body: z
    .object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    })
    .partial(),
});

export const deleteUserSchema = z.object({
  ...params,
});

export type CreateUserInput = z.TypeOf<typeof createUserSchema>["body"];
export type GetUserInput = z.TypeOf<typeof getUserSchema>["params"];
export type UpdateUserInput = z.TypeOf<typeof updateUserSchema>;
export type DeleteUserInput = z.TypeOf<typeof deleteUserSchema>["params"];
