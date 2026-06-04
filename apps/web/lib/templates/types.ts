export interface WorkflowTemplate {
  id: string;
  name: string;
  description?: string;
  setupMode?: "auto" | "needs_input";
  nodes: Array<{
    id: string;
    type?: string;
    data?: Record<string, unknown>;
    position?: { x: number; y: number };
  }>;
  edges?: Array<{
    id: string;
    source: string;
    target: string;
  }>;
  requiredBindings: Array<{
    platform: string;
    nodeIds: string[];
    description?: string;
  }>;
  fieldRequirements?: Array<{
    nodeId: string;
    field: string;
    label: string;
    type: "text" | "select" | "number" | "url" | "email";
    placeholder: string;
    required: boolean;
    defaultValue?: string;
    options?: Array<{ label: string; value: string }>;
  }>;
  inputRequirements?: Array<{
    label: string;
    description: string;
  }>;
}
