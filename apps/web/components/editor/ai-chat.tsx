"use client";

import { useState, useRef, useEffect } from "react";
import { Panel } from "@xyflow/react";
import { Send, Sparkles, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/hooks/workflow/use-workflows";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
}

interface AiChatProps {
  workflowId: string;
}

export const AiChat = ({ workflowId: initialWorkflowId }: AiChatProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [workflowId, setWorkflowId] = useState(initialWorkflowId);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "ai",
      content:
        "Hi! I'm your AI architect. Describe what you want to automate, and I'll build the workflow for you.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const addAiMessage = (content: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "ai", content },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", content: userMsg },
    ]);
    setIsLoading(true);

    try {
      let activeWorkflowId = workflowId;
      if (activeWorkflowId === "new") {
        const createRes = await apiClient.post("");
        activeWorkflowId = createRes.data.id;
        setWorkflowId(activeWorkflowId);
        router.replace(`/workflows/${activeWorkflowId}`);
      }

      // Call the API directly using the proxy with the apiClient (handles refresh interceptors)
      const response = await apiClient.post(`/${activeWorkflowId}/generate`, { prompt: userMsg });
      const result = response.data;

      if (result.error && result.status >= 400) {
        addAiMessage(`❌ Error: ${result.error}`);
        return;
      }

      // Handle clarification responses
      if (result.clarification_needed && result.clarification_needed.length > 0) {
        const questions = result.clarification_needed
          .map((q: string) => `• ${q}`)
          .join("\n");

        if (result.id) {
          addAiMessage(
            `I've generated a partial workflow, but I have some questions:\n${questions}`
          );
          queryClient.invalidateQueries({ queryKey: ['workflow', activeWorkflowId] });
        } else {
          addAiMessage(
            `I need a bit more information before I can build this:\n${questions}`
          );
        }
        return;
      }

      // Full success
      addAiMessage("✅ Workflow generated successfully! The canvas has been updated.");
      queryClient.invalidateQueries({ queryKey: ['workflow', activeWorkflowId] });
    } catch (error: any) {
      console.error("[AiChat] Error:", error);
      
      if (error.response?.status === 401) {
        addAiMessage("⚠️ Your session has expired. Please refresh the page and log in again.");
      } else {
        addAiMessage(`❌ Something went wrong: ${error.response?.data?.error || error?.message || "Unknown error"}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <Panel position="top-left" className="m-4">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full shadow-lg gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <Sparkles className="size-4" />
          AI Architect
        </Button>
      </Panel>
    );
  }

  return (
    <Panel position="top-left" className="m-4">
      <div className="flex flex-col w-80 md:w-96 bg-background border border-border rounded-xl shadow-2xl overflow-hidden h-[500px]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-indigo-500" />
            <span className="font-semibold text-sm">AI Architect</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-6 rounded-full"
            onClick={() => setIsOpen(false)}
          >
            <X className="size-4" />
          </Button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[85%] ${
                msg.role === "user"
                  ? "self-end items-end"
                  : "self-start items-start"
              }`}
            >
              <div
                className={`px-3 py-2 rounded-2xl text-sm ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                    : "bg-muted text-foreground rounded-tl-sm"
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="self-start px-3 py-2 bg-muted text-foreground rounded-2xl rounded-tl-sm">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-border bg-background">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Store form responses in Postgres..."
              className="flex-1 rounded-full bg-muted/50 border-transparent focus-visible:ring-1 focus-visible:ring-indigo-500"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isLoading}
              className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shrink-0"
            >
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      </div>
    </Panel>
  );
};
