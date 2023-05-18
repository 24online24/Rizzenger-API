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
