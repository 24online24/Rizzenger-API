import { z } from "../deps.ts";

export const createConvSchema = z.object({
  body: z.object({
    participants: z.array(z.string({
      required_error: "Participants required",
    })),
  }),
});

const params = {
  params: z.object({
    ConvID: z.string(),
  }),
};

export const getConvSchema = z.object({
  ...params,
});

export const updateUserSchema = z.object({
  ...params,
  body: z
    .object({
      name: z.string(),
      participants: z.array(z.string()),
      avatar: z.string(),
    }),
});

export const deleteConvSchema = z.object({
  ...params,
});

export type CreateConvInput = z.TypeOf<typeof createConvSchema>["body"];
export type GetConvInput = z.TypeOf<typeof getConvSchema>["params"];
export type UpdateConvInput = z.TypeOf<typeof updateUserSchema>;
export type DeleteConvInput = z.TypeOf<typeof deleteConvSchema>["params"];
