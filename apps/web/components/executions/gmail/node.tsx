"use client";

import { memo } from "react";
import { NodeProps } from "@xyflow/react";
import { BaseExecutionNode } from "../base-execution-node";

export const GmailNode = memo((props: NodeProps) => {
  return (
    <BaseExecutionNode
      {...props}
      id={props.id}
      icon="/logos/gmail.svg"
      name="Gmail"
      description="Send an email"
    />
  );
});

GmailNode.displayName = "GmailNode";