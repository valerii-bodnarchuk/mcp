import { Node, Edge, NodeChange, EdgeChange } from 'reactflow';

declare global {
  interface Window {
    applyNodeChanges: (changes: NodeChange[], nodes: Node[]) => Node[];
    applyEdgeChanges: (changes: EdgeChange[], edges: Edge[]) => Edge[];
  }
}
