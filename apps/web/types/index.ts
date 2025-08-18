import { Node } from "reactflow";

export interface CustomNodeData {
  label: string;
  status?: string;
  meta?: string;
  title: string;
}

export type CustomNode = Node<CustomNodeData> & {
  data: CustomNodeData;
  type: string;
};
