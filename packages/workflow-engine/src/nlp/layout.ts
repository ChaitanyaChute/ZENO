// @ts-ignore
import dagre from "dagre";
import type { GeneratedNode, GeneratedConnection } from "./generator.js";

export interface LayoutedNode extends GeneratedNode {
  position: { x: number; y: number };
}

export function generateLayout(nodes: GeneratedNode[], edges: GeneratedConnection[]): LayoutedNode[] {
  const g = new dagre.graphlib.Graph();
  
  // Set an object for the graph label
  g.setGraph({ rankdir: "LR", ranksep: 100, nodesep: 100 });
  
  // Default to assigning a new object as a label for each new edge.
  g.setDefaultEdgeLabel(() => ({}));

  // Add nodes to the graph
  nodes.forEach((node) => {
    // Assuming a standard node size in React Flow (e.g., width 250, height 100)
    g.setNode(node.id, { width: 250, height: 100 });
  });

  // Add edges to the graph
  edges.forEach((edge) => {
    g.setEdge(edge.sourceNodeId, edge.targetNodeId);
  });

  // Calculate the layout
  dagre.layout(g);

  // Return the nodes with their calculated x/y coordinates
  return nodes.map((node) => {
    const nodeWithPosition = g.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - 125, // Center offset
        y: nodeWithPosition.y - 50,  // Center offset
      },
    };
  });
}

export function validateGraph(nodes: GeneratedNode[], edges: GeneratedConnection[]) {
  // 1. Ensure at least one trigger node exists
  const hasTrigger = nodes.some(n => n.type.includes("TRIGGER") || n.type === "INITIAL");
  if (!hasTrigger) {
    throw new Error("Workflow must contain at least one Trigger node.");
  }

  // 2. Ensure no orphaned nodes (unless it's a single trigger node workflow)
  if (nodes.length > 1) {
    const connectedNodeIds = new Set<string>();
    edges.forEach(e => {
      connectedNodeIds.add(e.sourceNodeId);
      connectedNodeIds.add(e.targetNodeId);
    });

    const orphans = nodes.filter(n => !connectedNodeIds.has(n.id));
    if (orphans.length > 0) {
      throw new Error(`Workflow contains orphaned nodes: ${orphans.map(o => o.name).join(", ")}`);
    }
  }

  // Cycles are validated by dagre or during topological sort.
}
