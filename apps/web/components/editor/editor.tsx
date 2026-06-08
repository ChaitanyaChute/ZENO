"use client";

import { useState, useCallback } from "react";
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
        nodeTypes={nodeComponents}
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