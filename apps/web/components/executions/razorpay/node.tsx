"use client";

import { memo } from "react";
import { NodeProps } from "@xyflow/react";
import { BaseExecutionNode } from "../base-execution-node";

export const RazorpayNode = memo((props: NodeProps) => {
  return (
    <BaseExecutionNode
      {...props}
      id={props.id}
      icon="/logos/razorpay.svg"
      name="Razorpay"
      status="initial"
      description="Create and manage payments"
    />
  );
});

RazorpayNode.displayName = "RazorpayNode";