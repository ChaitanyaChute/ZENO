import type { Request, Response } from "express";
import { sendWorkflowExecution } from "@repo/queue";

export const webhookController = {
  stripe: async (request: Request, response: Response) => {
    const workflowId = request.query.workflowId;

    if (typeof workflowId !== "string" || !workflowId) {
      response.status(400).json({
        success: false,
        error: "Missing required query parameter: workflowId",
      });
      return;
    }

    const body = request.body;
    const stripeData = {
      eventId: body.id,
      eventType: body.type,
      timestamp: body.created,
      livemode: body.livemode,
      raw: body.data?.object,
    };

    await sendWorkflowExecution({
      workflowId,
      initialData: {
        stripe: stripeData,
      },
    });

    response.json({ success: true });
  },

  googleForm: async (request: Request, response: Response) => {
    const workflowId = request.query.workflowId;

    if (typeof workflowId !== "string" || !workflowId) {
      response.status(400).json({
        success: false,
        error: "Missing required query parameter: workflowId",
      });
      return;
    }

    const body = request.body;
    const formData = {
      formId: body.formId,
      formTitle: body.formTitle,
      responseId: body.responseId,
      timestamp: body.timestamp,
      respondentEmail: body.respondentEmail,
      responses: body.responses,
      raw: body,
    };

    await sendWorkflowExecution({
      workflowId,
      initialData: {
        googleForm: formData,
      },
    });

    response.json({ success: true });
  },
};
