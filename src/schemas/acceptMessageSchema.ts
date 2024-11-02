import { z } from "zod";

export const AcceptingMessageSchema = z.object({
  acceptingMessage: z.boolean(),
});
