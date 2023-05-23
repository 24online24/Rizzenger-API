import { string } from "https://deno.land/x/zod@v3.16.1/types.ts";
import type { RouterContext } from "../deps.ts";
import { Bson } from "../deps.ts";
import { ConvCollection, ConvSchema } from "../models/conv.model.ts";
import type {
  CreateConvInput,
  UpdateConvInput,
} from "../schema/conv.schema.ts";

const createConvController = async ({
    request,
    response,
}: RouterContext<string>) => {
    try {
        const { participants }: CreateConvInput = await request
            .body()
            .value;
    const convExists = await ConvCollection.findOne({ participants });
    
}
}
