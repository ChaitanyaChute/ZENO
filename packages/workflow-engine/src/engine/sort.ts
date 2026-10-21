// Topological sort for DAG nodes
// Returns an array of node IDs in execution order, or throws if there's a cycle.

export function topologicalSort(
  nodes: { id: string }[],
  connections: { fromNodeId: string; toNodeId: string }[]
): string[] {
  const adjacencyList = new Map<string, string[]>();
  const inDegree = new Map<string, number>();

  // Initialize maps
  for (const node of nodes) {
    adjacencyList.set(node.id, []);
    inDegree.set(node.id, 0);
  }

  // Populate maps
  for (const conn of connections) {
    const from = conn.fromNodeId;
    const to = conn.toNodeId;

    if (!adjacencyList.has(from) || !inDegree.has(to)) {
      continue; // Skip invalid connections
    }

    adjacencyList.get(from)!.push(to);
    inDegree.set(to, inDegree.get(to)! + 1);
  }

  const queue: string[] = [];
  
  // Find all start nodes (in-degree 0)
  for (const [nodeId, degree] of inDegree.entries()) {
    if (degree === 0) {
      queue.push(nodeId);
    }
  }

  const sorted: string[] = [];

  while (queue.length > 0) {
    const current = queue.shift()!;
    sorted.push(current);

    const neighbors = adjacencyList.get(current) || [];
    for (const neighbor of neighbors) {
      const newDegree = inDegree.get(neighbor)! - 1;
      inDegree.set(neighbor, newDegree);
      if (newDegree === 0) {
        queue.push(neighbor);
      }
    }
  }

  if (sorted.length !== nodes.length) {
    throw new Error("Cycle detected in the workflow graph, or disconnected components missing a trigger.");
  }

  return sorted;
}
