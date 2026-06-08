"use client";

import { memo } from "react";
import { NodeProps } from "@xyflow/react";
import { BaseExecutionNode } from "../base-execution-node";

export const GoogleDocsNode = memo((props: NodeProps) => {
  return (
    <BaseExecutionNode
      {...props}
      id={props.id}
      icon="/logos/google-docs.svg"
      name="Google Docs"
      status="initial"
      description="Create and update Google Docs"
    />
  );
});

GoogleDocsNode.displayName = "GoogleDocsNode";