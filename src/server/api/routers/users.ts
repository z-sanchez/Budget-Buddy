import dayjs from "dayjs";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getAllAccountUsers: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.users.findMany();
  }),
});
