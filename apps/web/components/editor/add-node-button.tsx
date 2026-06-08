"use client";

import { PlusIcon } from "lucide-react";
import { memo, useState } from "react";
import { Button } from "@/components/ui/button";
import { NodeSelector } from "@/components/node-selector";

export const AddNodeButton = memo(() => {
  const [selectorOpen, setSelectorOpen] = useState(false);

  return (
    <NodeSelector open={selectorOpen} onOpenChange={setSelectorOpen}>
      <Button
        onClick={() => setSelectorOpen(true)}
        size="icon"
        variant="outline"
        className="bg-neutral-900 border-neutral-800 hover:bg-neutral-800 hover:text-white text-white"
      >
        <PlusIcon />
      </Button>
    </NodeSelector>
  )
});

AddNodeButton.displayName = "AddNodeButton";
