"use client";

import { SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export function WorkflowGenerator() {
  const [prompt, setPrompt] = useState("");

  const examples = [
    "When Stripe payment succeeds, send Gmail and create Notion page",
    "Summarize AI news with Gemini and send to Telegram",
    "Store Google Form responses in PostgreSQL and MongoDB",
  ];

  const handleGenerate = () => {
    toast.info("Coming in v2");
    console.log(prompt);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-lime-500/20 bg-neutral-900/50 backdrop-blur-xl p-8 mb-10">
      <div className="absolute inset-0 bg-gradient-to-r from-lime-500/5 via-transparent to-transparent" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <SparklesIcon className="w-5 h-5 text-lime-500" />
          <h2 className="text-xl font-semibold text-white">
            Generate Workflow with AI
          </h2>
        </div>

        <p className="text-neutral-400 mb-6">
          Describe your automation in plain English and let AI build the workflow.
        </p>

        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="When a Stripe payment succeeds, save customer in PostgreSQL, generate welcome email with OpenAI, send via Gmail and notify Telegram."
          className="min-h-[140px] bg-neutral-950/60 border-neutral-800 resize-none"
        />

        <div className="flex flex-wrap gap-2 mt-4 mb-6">
          {examples.map((example) => (
            <button
              key={example}
              onClick={() => setPrompt(example)}
              className="text-xs rounded-full px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
            >
              {example}
            </button>
          ))}
        </div>

        <Button
          onClick={handleGenerate}
          className="bg-lime-500 hover:bg-lime-600 text-black font-semibold"
        >
          Generate Workflow
        </Button>
      </div>
    </div>
  );
}