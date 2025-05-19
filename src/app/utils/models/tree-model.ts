export interface TreeNode {
    id: string;
    label: string;
    children?: TreeNode[];
    parent?: TreeNode;
    level?: number;
}
