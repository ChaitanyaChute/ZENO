"use client";

import { memo } from "react";
import { NodeProps } from "@xyflow/react";
import { BaseExecutionNode } from "../base-execution-node";

export const TelegramNode = memo((props: NodeProps) => {
  return (
    <BaseExecutionNode
      {...props}
      id={props.id}
      icon="/logos/telegram.svg"
      name="Telegram"
      status="initial"
      description="Send Telegram messages"
    />
  );
});

TelegramNode.displayName = "TelegramNode";