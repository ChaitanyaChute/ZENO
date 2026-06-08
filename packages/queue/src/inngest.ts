import { createId } from "@paralleldrive/cuid2";
import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "zeno",
});

export const sendWorkflowExecution = async (data: {
  workflowId: string;
  [key: string]: unknown;
}) => {
  return inngest.send({
    name: "workflows/execute.workflow",
    data,
    id: createId(),
  });
};
