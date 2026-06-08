import { useQueryStates, parseAsInteger, parseAsString } from "nuqs";

export const workflowsParams = {
  page: parseAsInteger.withDefault(1),
  search: parseAsString.withDefault(""),
};

export const useWorkflowsParams = () => {
  return useQueryStates(workflowsParams);
};
