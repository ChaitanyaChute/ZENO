"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/hooks/workflow/use-workflows";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type Connection,
  Background,
  Controls,
  MiniMap,
  Panel,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { useSetAtom } from "jotai";
import { editorAtom } from "@/lib/atoms";
import { nodeComponents } from "@/config/node-components";
import { AddNodeButton } from "./add-node-button";
import { AiChat } from "./ai-chat";
import { Button } from "@/components/ui/button";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "INITIAL",
    position: { x: 250, y: 100 },
    data: {
      label: "Start",
    },
  },
];

const initialEdges: Edge[] = [];

export const EditorLoading = () => {
  return <div>Loading editor...</div>;
};

export const EditorError = () => {
  return <div>Error loading editor</div>;
};

export const Editor = ({
  workflowId,
}: {
  workflowId: string;
}) => {
  const setEditor = useSetAtom(editorAtom);

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const memoizedNodeTypes = useMemo(() => nodeComponents, []);

  const { data: workflow, isLoading } = useQuery({
    queryKey: ['workflow', workflowId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/${workflowId}`);
      return data;
    },
    enabled: workflowId !== "new"
  });

  useEffect(() => {
    if (workflow) {
      if (workflow.nodes?.length > 0) {
        setNodes(workflow.nodes);
      } else {
        setNodes(initialNodes);
      }
      if (workflow.edges?.length >= 0) {
        setEdges(workflow.edges);
      }
    }
  }, [workflow]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nodesSnapshot) =>
        applyNodeChanges(changes, nodesSnapshot)
      ),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((edgesSnapshot) =>
        applyEdgeChanges(changes, edgesSnapshot)
      ),
    []
  );

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((edgesSnapshot) =>
        addEdge(params, edgesSnapshot)
      ),
    []
  );

  const hasManualTrigger = nodes.some(
    (node) => node.type === "MANUAL_TRIGGER"
  );

  return (
    <div className="size-full bg-black">
      <ReactFlow
        colorMode="dark"
        className="bg-black"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={memoizedNodeTypes}
        onInit={setEditor}
        fitView
        fitViewOptions={{ maxZoom: 1.5 }}
        snapGrid={[10, 10]}
        snapToGrid
        panOnScroll
        selectionOnDrag
      >
        <Background color="#333" />
        <Controls style={{ backgroundColor: '#000', borderColor: '#333' }} />
        <MiniMap nodeColor="#333" style={{ backgroundColor: '#000', maskType: 'alpha' }} />

        {/* AI Chat Panel */}
        <AiChat workflowId={workflowId} />

        {/* Top Right Buttons */}
        <Panel position="top-right">
          <div className="flex gap-2">
            <AddNodeButton />

            <Button
              variant="outline"
              onClick={() => {
                console.log("Save clicked");
              }}
            >
              Save
            </Button>
          </div>
        </Panel>

        {/* Execute Button */}
        {hasManualTrigger && (
          <Panel position="bottom-center">
            <Button
              onClick={() => {
                console.log("Execute clicked");
              }}
            >
              Execute Workflow
            </Button>
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
};