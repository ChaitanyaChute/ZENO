"use client";

import { memo } from "react";
import { NodeProps } from "@xyflow/react";
import { BaseExecutionNode } from "../base-execution-node";

export const MongoDBNode = memo((props: NodeProps) => {
  return (
    <BaseExecutionNode
      {...props}
      id={props.id}
      icon="/logos/mongodb.svg"
      name="MongoDB"
      status="initial"
      description="Read and write MongoDB documents"
    />
  );
});

MongoDBNode.displayName = "MongoDBNode";