import type { Request, Response } from "express";
import { z } from "zod";
import { PAGINATION } from "@repo/shared/constants";
import { CredentialType } from "@repo/shared/types";
import { requireSession } from "../lib/auth.js";
import { requiredParam, toNumber } from "../lib/http.js";
import {
  createCredential,
  getCredential,
  listCredentials,
  listCredentialsByType,
  removeCredential,
  updateCredential,
} from "../services/credential.service.js";

const credentialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.nativeEnum(CredentialType),
  value: z.string().min(1, "Value is required"),
});

export const credentialController = {
  list: async (request: Request, response: Response) => {
    const session = await requireSession(request);
    const data = await listCredentials(session.user.id, {
      page: toNumber(request.query.page, PAGINATION.DEFAULT_PAGE),
      pageSize: toNumber(request.query.pageSize, PAGINATION.DEFAULT_PAGE_SIZE),
      search: typeof request.query.search === "string" ? request.query.search : "",
    });

    response.json(data);
  },

  create: async (request: Request, response: Response) => {
    const session = await requireSession(request);
    const input = credentialSchema.parse(request.body);
    const data = await createCredential(session.user.id, input);

    response.status(201).json(data);
  },

  get: async (request: Request, response: Response) => {
    const session = await requireSession(request);
    const data = await getCredential(
      session.user.id,
      requiredParam(request.params.id, "id"),
    );

    response.json(data);
  },

  remove: async (request: Request, response: Response) => {
    const session = await requireSession(request);
    const data = await removeCredential(
      session.user.id,
      requiredParam(request.params.id, "id"),
    );

    response.json(data);
  },

  update: async (request: Request, response: Response) => {
    const session = await requireSession(request);
    const input = credentialSchema.parse(request.body);
    const data = await updateCredential(
      session.user.id,
      requiredParam(request.params.id, "id"),
      input,
    );

    response.json(data);
  },

  byType: async (request: Request, response: Response) => {
    const session = await requireSession(request);
    const input = z.object({ type: z.nativeEnum(CredentialType) }).parse(request.query);
    const data = await listCredentialsByType(session.user.id, input.type);

    response.json(data);
  },
};
