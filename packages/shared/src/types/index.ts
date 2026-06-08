export enum CredentialType {
  OPENAI = "OPENAI",
  ANTHROPIC = "ANTHROPIC",
  GEMINI = "GEMINI",
}

export enum ExecutionStatus {
  RUNNING = "RUNNING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export enum NodeType {
  INITIAL = "INITIAL",
  MANUAL_TRIGGER = "MANUAL_TRIGGER",
  HTTP_REQUEST = "HTTP_REQUEST",
  GOOGLE_FORM_TRIGGER = "GOOGLE_FORM_TRIGGER",
  STRIPE_TRIGGER = "STRIPE_TRIGGER",
  ANTHROPIC = "ANTHROPIC",
  GEMINI = "GEMINI",
  OPENAI = "OPENAI",
  DISCORD = "DISCORD",
  SLACK = "SLACK",
}

export type Workflow = {
  id: string;
  name: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  userId: string;
};

export type Credential = {
  id: string;
  name: string;
  value: string;
  type: CredentialType;
  createdAt: string | Date;
  updatedAt: string | Date;
  userId: string;
};

export type Execution = {
  id: string;
  workflowId: string;
  status: ExecutionStatus;
  error: string | null;
  errorStack: string | null;
  startedAt: string | Date;
  completedAt: string | Date | null;
  inngestEventId: string;
  output: unknown;
};

export type PaginatedResponse<T> = {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};
