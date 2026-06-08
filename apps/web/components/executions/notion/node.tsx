"use client";

import { memo } from "react";
import { NodeProps } from "@xyflow/react";
import { BaseExecutionNode } from "../base-execution-node";

export const NotionNode = memo((props: NodeProps) => {
  return (
    <BaseExecutionNode
      {...props}
      id={props.id}
      icon="/logos/notion.svg"
      name="Notion"
      status="initial"
      description="Create and update Notion pages"
    />
  );
});

NotionNode.displayName = "NotionNode";