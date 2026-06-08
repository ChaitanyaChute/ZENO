import type { Request, Response } from "express";
import { PAGINATION } from "@repo/shared/constants";
import { requireSession } from "../lib/auth.js";
import { requiredParam, toNumber } from "../lib/http.js";
import { getExecution, listExecutions } from "../services/execution.service.js";

export const executionController = {
  list: async (request: Request, response: Response) => {
    const session = await requireSession(request);
    const data = await listExecutions(session.user.id, {
      page: toNumber(request.query.page, PAGINATION.DEFAULT_PAGE),
      pageSize: toNumber(request.query.pageSize, PAGINATION.DEFAULT_PAGE_SIZE),
    });

    response.json(data);
  },

  get: async (request: Request, response: Response) => {
    const session = await requireSession(request);
    const data = await getExecution(
      session.user.id,
      requiredParam(request.params.id, "id"),
    );

    response.json(data);
  },
};
