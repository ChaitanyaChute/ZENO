import { NodeType } from "@repo/shared/types";

export const registeredNodeTypes = Object.values(NodeType);

export type RegisteredNodeType = (typeof registeredNodeTypes)[number];
