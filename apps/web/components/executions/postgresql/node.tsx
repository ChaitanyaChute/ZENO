"use client";

import { memo } from "react";
import { NodeProps } from "@xyflow/react";
import { BaseExecutionNode } from "../base-execution-node";

export const PostgreSQLNode = memo((props: NodeProps) => {
  return (
    <BaseExecutionNode
      {...props}
      id={props.id}
      icon="/logos/postgresql.svg"
      name="PostgreSQL"
      status="initial"
      description="Execute PostgreSQL queries"
    />
  );
});

PostgreSQLNode.displayName = "PostgreSQLNode";