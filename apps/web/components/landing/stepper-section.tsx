"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { AnimatedStepper, Step } from "@/components/ui/animated-stepper";
import { Container } from "@/components/ui/container";
import { motion, AnimatePresence } from "framer-motion";
import { Target, CheckCircle2, Loader2, Play, RotateCcw, X } from "lucide-react";
import { ReactFlow, Background, type Node, type Edge, Handle, Position, ReactFlowProvider, applyNodeChanges, applyEdgeChanges, type NodeChange, type EdgeChange } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Step 1 Content
const Step1Content = () => {
  const fullText = "When a Stripe payment succeeds:\n1. Store customer information in PostgreSQL.\n2. Store transaction details in MongoDB.\n3. Generate a welcome email using OpenAI.\n4. Send the email through Gmail.\n5. Create a customer onboarding page in Notion.\n6. Create a welcome document in Google Docs.\n7. Notify the sales team in Telegram.\n8. Notify the finance team in Slack.\n9. Notify support in Discord.";
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    setText("");
    setIsTyping(true);
    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-64 w-full rounded-2xl bg-neutral-900 border border-neutral-800 flex items-start p-6 shadow-inner overflow-hidden">
      <div className="flex gap-4 items-start w-full">
        <Target size={24} className="text-blue-400 shrink-0 mt-1" />
        <div className="text-sm md:text-base font-medium text-white font-mono whitespace-pre-line leading-relaxed">
          {text}
          {isTyping && <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-2 h-5 bg-blue-400 ml-1 translate-y-1" />}
        </div>
      </div>
    </div>
  );
};

// Step 2 Content - Advanced Interactive React Flow
type NodeStatus = "waiting" | "running" | "success";

interface CustomNodeData {
  title: string;
  icon: React.ReactNode;
  status: NodeStatus;
}

const WorkflowNode = ({ data }: { data: CustomNodeData }) => {
  const isWaiting = data.status === "waiting";
  const isRunning = data.status === "running";
  const isSuccess = data.status === "success";

  return (
    <div className="flex flex-col items-center group relative w-24">
      <div className={cn(
        "w-16 h-16 rounded-2xl border bg-neutral-900 flex items-center justify-center relative transition-all duration-300 shadow-xl",
        isWaiting && "border-neutral-700",
        isRunning && "border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]",
        isSuccess && "border-lime-500 shadow-[0_0_20px_rgba(163,230,53,0.2)]"
      )}>
        {isWaiting && (
          <div className="absolute -inset-0.5 rounded-2xl border border-yellow-500/20 animate-pulse pointer-events-none" />
        )}
        
        <Handle 
          type="target" 
          position={Position.Left} 
          className="w-2.5 h-2.5 bg-neutral-500 border-2 border-neutral-900 -ml-1.5 rounded-full" 
        />
        
        <div className="flex items-center justify-center w-full h-full">
          {data.icon}
        </div>

        {isRunning && (
          <div className="absolute -right-2 -top-2 bg-neutral-900 rounded-full p-0.5 shadow-sm border border-neutral-800">
            <Loader2 className="animate-spin text-blue-400" size={14} />
          </div>
        )}
        {isSuccess && (
          <div className="absolute -right-2 -top-2 bg-neutral-900 rounded-full p-0.5 shadow-sm border border-neutral-800">
            <CheckCircle2 className="text-lime-500 bg-neutral-900 rounded-full" size={14} />
          </div>
        )}

        <Handle 
          type="source" 
          position={Position.Right} 
          className="w-2.5 h-2.5 bg-neutral-500 border-2 border-neutral-900 -mr-1.5 rounded-full" 
        />
      </div>

      <div className="text-center mt-3">
        <div className="font-medium text-[13px] text-neutral-200 whitespace-nowrap">{data.title}</div>
      </div>
    </div>
  );
};

const initialNodes: Node<CustomNodeData>[] = [
  { id: "stripe", type: "workflow", position: { x: 50, y: 250 }, data: { title: "Stripe", icon: <Image src="/logos/stripe.svg" alt="Stripe" width={32} height={32} className="object-contain" />, status: "waiting" } },
  { id: "pg", type: "workflow", position: { x: 300, y: 50 }, data: { title: "PostgreSQL", icon: <Image src="/logos/postgresql.svg" alt="PostgreSQL" width={32} height={32} className="object-contain" />, status: "waiting" } },
  { id: "mongo", type: "workflow", position: { x: 300, y: 250 }, data: { title: "MongoDB", icon: <Image src="/logos/mongodb.svg" alt="MongoDB" width={32} height={32} className="object-contain" />, status: "waiting" } },
  { id: "openai", type: "workflow", position: { x: 300, y: 450 }, data: { title: "OpenAI", icon: <Image src="/logos/openai.svg" alt="OpenAI" width={32} height={32} className="object-contain" />, status: "waiting" } },
  { id: "docs", type: "workflow", position: { x: 550, y: 50 }, data: { title: "Google Docs", icon: <Image src="/logos/google-docs.svg" alt="Google Docs" width={32} height={32} className="object-contain" />, status: "waiting" } },
  { id: "notion", type: "workflow", position: { x: 550, y: 250 }, data: { title: "Notion", icon: <Image src="/logos/notion.svg" alt="Notion" width={32} height={32} className="object-contain" />, status: "waiting" } },
  { id: "gmail", type: "workflow", position: { x: 550, y: 450 }, data: { title: "Gmail", icon: <Image src="/logos/gmail.svg" alt="Gmail" width={32} height={32} className="object-contain" />, status: "waiting" } },
  { id: "telegram", type: "workflow", position: { x: 800, y: 150 }, data: { title: "Telegram", icon: <Image src="/logos/telegram.svg" alt="Telegram" width={32} height={32} className="object-contain" />, status: "waiting" } },
  { id: "discord", type: "workflow", position: { x: 800, y: 350 }, data: { title: "Discord", icon: <Image src="/logos/discord.svg" alt="Discord" width={32} height={32} className="object-contain" />, status: "waiting" } },
];

const edgeLabelStyle = { fill: '#d4d4d8', fontSize: 13, fontWeight: 600 };
const edgeLabelBgStyle = { fill: '#171717', rx: 4, ry: 4,  };

const initialEdges: Edge[] = [
  { id: "e-stripe-pg", source: "stripe", target: "pg", type: "default", label: "Store Customer Info", labelStyle: edgeLabelStyle, labelBgStyle: edgeLabelBgStyle, labelBgPadding: [6, 4] },
  { id: "e-stripe-mongo", source: "stripe", target: "mongo", type: "default", label: "Store Transaction Data", labelStyle: edgeLabelStyle, labelBgStyle: edgeLabelBgStyle, labelBgPadding: [6, 4] },
  { id: "e-stripe-openai", source: "stripe", target: "openai", type: "default", label: "Generate Welcome Email", labelStyle: edgeLabelStyle, labelBgStyle: edgeLabelBgStyle, labelBgPadding: [6, 4] },
  { id: "e-pg-docs", source: "pg", target: "docs", type: "default", label: "Create Doc", labelStyle: edgeLabelStyle, labelBgStyle: edgeLabelBgStyle, labelBgPadding: [6, 4] },
  { id: "e-docs-telegram", source: "docs", target: "telegram", type: "default", label: "Notify Sales", labelStyle: edgeLabelStyle, labelBgStyle: edgeLabelBgStyle, labelBgPadding: [6, 4] },
  { id: "e-mongo-notion", source: "mongo", target: "notion", type: "default", label: "Onboarding Page", labelStyle: edgeLabelStyle, labelBgStyle: edgeLabelBgStyle, labelBgPadding: [6, 4] },
  { id: "e-notion-discord", source: "notion", target: "discord", type: "default", label: "Notify Support", labelStyle: edgeLabelStyle, labelBgStyle: edgeLabelBgStyle, labelBgPadding: [6, 4] },
  { id: "e-openai-gmail", source: "openai", target: "gmail", type: "default", label: "Send Email", labelStyle: edgeLabelStyle, labelBgStyle: edgeLabelBgStyle, labelBgPadding: [6, 4] },
  { id: "e-gmail-discord", source: "gmail", target: "discord", type: "default", label: "Log Event", labelStyle: edgeLabelStyle, labelBgStyle: edgeLabelBgStyle, labelBgPadding: [6, 4] },
];

const FlowCanvas = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const resetCanvas = useCallback(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setIsExecuting(false);
    setIsComplete(false);
  }, []);

  const nodeTypes = useMemo(() => ({ workflow: WorkflowNode }), []);

  const executeNode = useCallback((id: string, duration: number) => {
    return new Promise<void>(resolve => {
      setNodes(nds => nds.map(n => n.id === id ? { ...n, data: { ...n.data, status: "running" } } : n));
      setTimeout(() => {
        setNodes(nds => nds.map(n => n.id === id ? { ...n, data: { ...n.data, status: "success" } } : n));
        resolve();
      }, duration);
    });
  }, []);

  const runWorkflow = useCallback(async () => {
    if (isExecuting) return;
    setIsExecuting(true);
    setIsComplete(false);
    
    setNodes(initialNodes);
    
    // 1. Stripe
    await executeNode("stripe", 1000);
    
    // 2. PG, Mongo, OpenAI parallel
    await Promise.all([
      executeNode("pg", 1200),
      executeNode("mongo", 1400),
      executeNode("openai", 1600)
    ]);
    
    // 3. Docs, Notion, Gmail parallel
    await Promise.all([
      executeNode("docs", 1200),
      executeNode("notion", 1000),
      executeNode("gmail", 1400)
    ]);
    
    // 4. Telegram, Discord
    await Promise.all([
      executeNode("telegram", 1000),
      executeNode("discord", 1200)
    ]);

    setIsExecuting(false);
    setIsComplete(true);
  }, [executeNode, isExecuting]);

  // Compute dynamic edge styles
  const animatedEdges = edges.map(e => {
    const sourceNode = nodes.find(n => n.id === e.source);
    const targetNode = nodes.find(n => n.id === e.target);
    
    const isSourceSuccess = sourceNode?.data.status === "success";
    const isTargetRunning = targetNode?.data.status === "running";
    const isTargetSuccess = targetNode?.data.status === "success";
    
    const isActive = isSourceSuccess && isTargetRunning;
    const isDone = isSourceSuccess && isTargetSuccess;
    
    return {
      ...e,
      animated: isActive || isDone,
      style: isActive 
        ? { stroke: '#3b82f6', strokeWidth: 2, filter: 'drop-shadow(0 0 4px rgba(59,130,246,0.8))' } 
        : isDone 
          ? { stroke: '#a3e635', strokeWidth: 2, filter: 'drop-shadow(0 0 4px rgba(163,230,53,0.4))' } 
          : { stroke: '#3f3f46', strokeWidth: 1.5 }
    };
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="h-[400px] w-full rounded-2xl bg-[#0a0a0a] border border-neutral-800 overflow-hidden relative shadow-2xl">
        <ReactFlow
          nodes={nodes}
          edges={animatedEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={24} color="#262626" size={2} />
        </ReactFlow>

        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 20, x: "-50%" }}
              className="absolute bottom-6 left-1/2 bg-neutral-900/90 backdrop-blur border border-neutral-700 rounded-xl p-5 shadow-2xl z-50 flex items-center gap-8 w-max"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-lime-500/20 flex items-center justify-center border border-lime-500/30">
                  <CheckCircle2 className="text-lime-500" size={28} />
                </div>
                <div>
                  <div className="font-bold text-white text-lg">Workflow Completed</div>
                  <div className="text-sm text-neutral-400">9 Actions Executed</div>
                </div>
              </div>
              <div className="h-12 w-px bg-neutral-800" />
              <div className="text-sm space-y-1">
                <div className="text-neutral-400 flex justify-between gap-4">Runtime: <span className="text-white font-mono">2.3s</span></div>
                <div className="text-neutral-400 flex justify-between gap-4">Status: <span className="text-lime-400 font-medium">Success</span></div>
              </div>
              <button 
                onClick={() => setIsComplete(false)} 
                className="absolute top-3 right-3 text-neutral-500 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={resetCanvas}
          disabled={isExecuting}
          className={cn(
            "px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all border",
            isExecuting ? "border-neutral-800 text-neutral-600 cursor-not-allowed" : "border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white"
          )}
        >
          <RotateCcw size={18} />
          Reset
        </button>
        <button
          onClick={runWorkflow}
          disabled={isExecuting}
          className={cn(
            "px-2 py-3 rounded-full font-semibold text-white flex items-center gap-2 transition-all shadow-xl",
            isExecuting ? "bg-neutral-800 cursor-not-allowed text-neutral-500" : "bg-white text-black hover:bg-neutral-200 hover:scale-105 active:scale-95"
          )}
        >
          {isExecuting ? <Loader2 className="animate-spin" size={20} /> : <Play size={20} fill="currentColor" />}
          {isExecuting ? "Executing..." : "Execute Workflow"}
        </button>
      </div>
    </div>
  );
};

export const StepperSection = () => {
  return (
    <section className="pt-8 pb-12 relative overflow-hidden">
      <Container>
        <div className="text-center mb-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight text-white"
          >
            How Zeno Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-neutral-400 max-w-xl mx-auto"
          >
            From idea to execution in just two simple steps.
          </motion.p>
        </div>

        <AnimatedStepper
          onFinalStepCompleted={() => {
            console.log("Stepper completed");
          }}
          backButtonText="Back"
          nextButtonText="Next"
          stepCircleContainerClassName="max-w-4xl"
        >
          <Step title="Step 1: Describe goal">
            <p className="mb-6">
              Start by simply describing what you want to achieve in plain English. No technical jargon required.
            </p>
            <Step1Content />
          </Step>

          <Step title="Step 2: Zeno executes workflow">
            <p className="mb-6">
              Zeno's AI understands your goal and automatically generates and executes the complete visual workflow with the right triggers and actions.
            </p>
            <ReactFlowProvider>
              <FlowCanvas />
            </ReactFlowProvider>
          </Step>

        </AnimatedStepper>
      </Container>
    </section>
  );
};
